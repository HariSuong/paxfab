import { NextResponse } from "next/server";
import { getSession, resolveTargetClientId } from "@/lib/auth";
import { getClientFileObject } from "@/lib/r2";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const fileKey = searchParams.get("key")?.trim() ?? "";
  const requestedClientId = searchParams.get("targetClientId");
  const targetClientId = resolveTargetClientId(session, requestedClientId);

  if (!targetClientId) {
    return NextResponse.json(
      {
        error:
          session.role === "admin"
            ? "Select a client workspace (targetClientId) before downloading."
            : "Forbidden: cannot download files outside your project folder.",
      },
      { status: session.role === "admin" ? 400 : 403 },
    );
  }

  if (!fileKey) {
    return NextResponse.json(
      { error: "File key is required." },
      { status: 400 },
    );
  }

  // Client Isolation
  const prefix = `clients/${targetClientId}/`;
  if (!fileKey.startsWith(prefix) || fileKey.includes("..")) {
    return NextResponse.json(
      {
        error:
          "Forbidden: cannot download files outside the selected project folder.",
      },
      { status: 403 },
    );
  }

  try {
    const file = await getClientFileObject(targetClientId, fileKey);
    const safeName = file.fileName.replace(/[^\w.\- ()[\]]+/g, "_");

    return new NextResponse(Buffer.from(file.body), {
      status: 200,
      headers: {
        "Content-Type": file.contentType,
        "Content-Disposition": `attachment; filename="${safeName}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[portal/download]", error);
    const message =
      error instanceof Error && error.message.startsWith("Forbidden")
        ? error.message
        : "Failed to download file.";
    const status = message.startsWith("Forbidden") ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
