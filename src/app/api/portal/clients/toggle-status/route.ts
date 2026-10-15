import { NextResponse } from "next/server";
import { getSession, setClientActiveStatus } from "@/lib/auth";

/**
 * Admin-only soft delete / reactivate.
 * Updates portal_clients.is_active — R2 project files are never deleted.
 */
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = (await request.json()) as {
      clientId?: string;
      isActive?: boolean;
    };

    const clientId = body.clientId?.trim() ?? "";
    if (!clientId) {
      return NextResponse.json(
        { error: "clientId is required." },
        { status: 400 },
      );
    }

    if (typeof body.isActive !== "boolean") {
      return NextResponse.json(
        { error: "isActive (boolean) is required." },
        { status: 400 },
      );
    }

    const updated = await setClientActiveStatus(clientId, body.isActive);

    return NextResponse.json({
      ok: true,
      client: {
        client_id: updated.client_id,
        company_name: updated.company_name,
        project_name: updated.project_name,
        email: updated.email,
        role: updated.role,
        is_active: updated.is_active,
      },
    });
  } catch (error) {
    console.error("[portal/clients/toggle-status]", error);
    const message =
      error instanceof Error ? error.message : "Failed to update status.";
    const status = /not found/i.test(message) ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function PATCH(request: Request) {
  return POST(request);
}
