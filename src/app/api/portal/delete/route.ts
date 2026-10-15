import { NextResponse } from "next/server";
import { getSession, resolveTargetClientId } from "@/lib/auth";
import { deleteFileFromR2 } from "@/lib/r2";

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      key?: string;
      targetClientId?: string;
    };
    const fileKey = body.key?.trim() ?? "";
    const targetClientId = resolveTargetClientId(
      session,
      body.targetClientId ?? null,
    );

    if (!targetClientId) {
      return NextResponse.json(
        {
          error:
            session.role === "admin"
              ? "Select a client workspace (targetClientId) before deleting."
              : "Forbidden: cannot delete files outside your project folder.",
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

    // Client Isolation: only allow deletes under the target client's prefix
    const prefix = `clients/${targetClientId}/`;
    if (!fileKey.startsWith(prefix) || fileKey.includes("..")) {
      return NextResponse.json(
        {
          error:
            "Forbidden: cannot delete files outside the selected project folder.",
        },
        { status: 403 },
      );
    }

    await deleteFileFromR2(targetClientId, fileKey);

    return NextResponse.json({ success: true, targetClientId });
  } catch (error) {
    console.error("[portal/delete]", error);
    const message =
      error instanceof Error && error.message.startsWith("Forbidden")
        ? error.message
        : "Failed to delete file.";
    const status = message.startsWith("Forbidden") ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
