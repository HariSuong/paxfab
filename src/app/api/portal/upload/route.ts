import { NextResponse } from "next/server";
import { getSession, resolveTargetClientId } from "@/lib/auth";
import { uploadFileToR2 } from "@/lib/r2";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const requestedClientId =
      (formData.get("targetClientId") as string | null)?.trim() || null;

    const targetClientId = resolveTargetClientId(session, requestedClientId);

    if (!targetClientId) {
      return NextResponse.json(
        {
          error:
            session.role === "admin"
              ? "Select a client workspace (targetClientId) before uploading."
              : "Forbidden: cannot upload outside your project folder.",
        },
        { status: session.role === "admin" ? 400 : 403 },
      );
    }

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No file provided. Use form field 'file'." },
        { status: 400 },
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        { error: "Empty files are not allowed." },
        { status: 400 },
      );
    }

    const maxBytes = 100 * 1024 * 1024; // 100 MB
    if (file.size > maxBytes) {
      return NextResponse.json(
        { error: "File exceeds the 100 MB upload limit." },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadFileToR2(
      targetClientId,
      file.name,
      buffer,
      file.type || "application/octet-stream",
    );

    return NextResponse.json({
      ok: true,
      key: result.key,
      name: file.name,
      size: file.size,
      targetClientId,
    });
  } catch (error) {
    console.error("[portal/upload]", error);
    return NextResponse.json(
      { error: "Failed to upload file to project repository." },
      { status: 500 },
    );
  }
}
