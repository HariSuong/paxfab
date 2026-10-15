import { NextResponse } from "next/server";
import { getSession, resolveTargetClientId } from "@/lib/auth";
import { getPresignedDownloadUrl, listClientFiles } from "@/lib/r2";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const requestedClientId = searchParams.get("targetClientId");
  const targetClientId = resolveTargetClientId(session, requestedClientId);

  if (!targetClientId) {
    return NextResponse.json(
      {
        error:
          session.role === "admin"
            ? "Select a client workspace (targetClientId) to list files."
            : "Forbidden: cannot access another client's folder.",
      },
      { status: session.role === "admin" ? 400 : 403 },
    );
  }

  try {
    const files = await listClientFiles(targetClientId);

    // Client Isolation: only sign URLs for keys under the target client's prefix
    const prefix = `clients/${targetClientId}/`;
    const withUrls = await Promise.all(
      files
        .filter((f) => f.key.startsWith(prefix))
        .map(async (file) => ({
          name: file.name,
          size: file.size,
          lastModified: file.lastModified,
          key: file.key,
          downloadUrl: await getPresignedDownloadUrl(file.key),
        })),
    );

    return NextResponse.json({
      files: withUrls,
      targetClientId,
      user: {
        client_id: session.clientId,
        company_name: session.companyName,
        project_name: session.projectName,
        email: session.email,
        role: session.role,
      },
    });
  } catch (error) {
    console.error("[portal/files]", error);
    return NextResponse.json(
      { error: "Failed to list project documents." },
      { status: 500 },
    );
  }
}
