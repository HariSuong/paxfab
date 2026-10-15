import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

function getBucketName() {
  const bucket = process.env.R2_BUCKET_NAME;
  if (!bucket) {
    throw new Error("R2_BUCKET_NAME is not configured");
  }
  return bucket;
}

export type ClientFileObject = {
  key: string;
  name: string;
  size: number;
  lastModified: string | null;
};

/** List files under clients/{clientId}/ — enforces client isolation by prefix. */
export async function listClientFiles(
  clientId: string,
): Promise<ClientFileObject[]> {
  const prefix = `clients/${clientId}/`;
  const response = await r2.send(
    new ListObjectsV2Command({
      Bucket: getBucketName(),
      Prefix: prefix,
    }),
  );

  const contents = response.Contents ?? [];

  return contents
    .filter((obj) => obj.Key && obj.Key !== prefix && !obj.Key.endsWith("/"))
    .map((obj) => {
      const key = obj.Key!;
      return {
        key,
        name: key.slice(prefix.length),
        size: obj.Size ?? 0,
        lastModified: obj.LastModified
          ? obj.LastModified.toISOString()
          : null,
      };
    })
    .sort((a, b) => {
      const aTime = a.lastModified ? Date.parse(a.lastModified) : 0;
      const bTime = b.lastModified ? Date.parse(b.lastModified) : 0;
      return bTime - aTime;
    });
}

/** Generate a time-limited download URL (default 1 hour). */
export async function getPresignedDownloadUrl(
  fileKey: string,
  expiresInSeconds = 3600,
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: getBucketName(),
    Key: fileKey,
  });

  return getSignedUrl(r2, command, { expiresIn: expiresInSeconds });
}

/** Fetch object bytes from R2 for same-origin proxy download (avoids blank R2 tab). */
export async function getClientFileObject(
  clientId: string,
  fileKey: string,
): Promise<{
  body: Uint8Array;
  contentType: string;
  fileName: string;
}> {
  const prefix = `clients/${clientId}/`;
  if (
    !fileKey.startsWith(prefix) ||
    fileKey.includes("..") ||
    fileKey === prefix
  ) {
    throw new Error("Forbidden: key is outside this client's folder");
  }

  const response = await r2.send(
    new GetObjectCommand({
      Bucket: getBucketName(),
      Key: fileKey,
    }),
  );

  if (!response.Body) {
    throw new Error("File not found");
  }

  const body = await response.Body.transformToByteArray();
  const fileName = fileKey.slice(prefix.length);

  return {
    body,
    contentType: response.ContentType || "application/octet-stream",
    fileName,
  };
}

/** Upload a file into the isolated client folder clients/{clientId}/. */
export async function uploadFileToR2(
  clientId: string,
  fileName: string,
  buffer: Buffer,
  contentType: string,
): Promise<{ key: string }> {
  const safeName = fileName.replace(/^.*[\\/]/, "").replace(/\.\./g, "");
  if (!safeName) {
    throw new Error("Invalid file name");
  }

  const key = `clients/${clientId}/${safeName}`;

  await r2.send(
    new PutObjectCommand({
      Bucket: getBucketName(),
      Key: key,
      Body: buffer,
      ContentType: contentType || "application/octet-stream",
    }),
  );

  return { key };
}

/**
 * Delete a file from R2. Caller must already verify the key belongs to
 * `clients/{clientId}/` — this helper also rejects keys outside that prefix.
 */
export async function deleteFileFromR2(
  clientId: string,
  fileKey: string,
): Promise<void> {
  const prefix = `clients/${clientId}/`;
  if (
    !fileKey.startsWith(prefix) ||
    fileKey.includes("..") ||
    fileKey === prefix
  ) {
    throw new Error("Forbidden: key is outside this client's folder");
  }

  await r2.send(
    new DeleteObjectCommand({
      Bucket: getBucketName(),
      Key: fileKey,
    }),
  );
}

/**
 * Permanently delete every object under clients/{clientId}/.
 * Paginates ListObjectsV2 and batches DeleteObjects (max 1000 per call).
 */
export async function deleteAllClientFilesFromR2(
  clientId: string,
): Promise<{ deletedCount: number }> {
  const safeId = clientId.trim();
  if (!safeId || safeId.includes("..") || safeId.includes("/")) {
    throw new Error("Invalid client folder id");
  }

  const prefix = `clients/${safeId}/`;
  const bucket = getBucketName();
  let deletedCount = 0;
  let continuationToken: string | undefined;

  do {
    const listed = await r2.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
        ContinuationToken: continuationToken,
      }),
    );

    const keys = (listed.Contents ?? [])
      .map((obj) => obj.Key)
      .filter((key): key is string => Boolean(key));

    // DeleteObjects accepts up to 1000 keys per request
    for (let i = 0; i < keys.length; i += 1000) {
      const chunk = keys.slice(i, i + 1000);
      if (chunk.length === 0) continue;

      const result = await r2.send(
        new DeleteObjectsCommand({
          Bucket: bucket,
          Delete: {
            Objects: chunk.map((Key) => ({ Key })),
            Quiet: true,
          },
        }),
      );

      if (result.Errors && result.Errors.length > 0) {
        const first = result.Errors[0];
        throw new Error(
          first.Message ||
            `Failed to delete R2 object: ${first.Key ?? "unknown"}`,
        );
      }

      deletedCount += chunk.length;
    }

    continuationToken = listed.IsTruncated
      ? listed.NextContinuationToken
      : undefined;
  } while (continuationToken);

  return { deletedCount };
}
