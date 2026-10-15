import { NextResponse } from "next/server";
import {
  createPortalClient,
  deletePortalClient,
  getPortalClientById,
  getSession,
  listClientWorkspaces,
} from "@/lib/auth";
import { deleteAllClientFilesFromR2 } from "@/lib/r2";

function mapClient(c: {
  client_id: string;
  company_name: string;
  project_name: string;
  email: string;
  role: string;
  is_active: boolean;
}) {
  return {
    client_id: c.client_id,
    company_name: c.company_name,
    project_name: c.project_name,
    email: c.email,
    role: c.role,
    is_active: c.is_active,
  };
}

/** Admin-only: list client workspaces. Use ?activeOnly=true for Tab 1 dropdown. */
export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get("activeOnly") === "true";
    const clients = await listClientWorkspaces({ activeOnly });

    return NextResponse.json({
      clients: clients.map(mapClient),
    });
  } catch (error) {
    console.error("[portal/clients GET]", error);
    return NextResponse.json(
      { error: "Failed to load client workspaces." },
      { status: 500 },
    );
  }
}

/** Admin-only: create a new partner / project in portal_clients. */
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
      companyName?: string;
      projectName?: string;
      clientId?: string;
      email?: string;
      password?: string;
    };

    const companyName = body.companyName?.trim() ?? "";
    const projectName = body.projectName?.trim() ?? "";
    const clientId = body.clientId?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const password = body.password ?? "";

    if (!companyName || !projectName || !clientId || !email || !password) {
      return NextResponse.json(
        {
          error:
            "Company Name, Project Name, Client ID, Email, and Password are required.",
        },
        { status: 400 },
      );
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(clientId)) {
      return NextResponse.json(
        {
          error:
            "Client ID may only contain letters, numbers, hyphens, and underscores.",
        },
        { status: 400 },
      );
    }

    const created = await createPortalClient({
      clientId,
      companyName,
      projectName,
      email,
      password,
      role: "client",
    });

    return NextResponse.json({
      ok: true,
      client: mapClient(created),
    });
  } catch (error) {
    console.error("[portal/clients POST]", error);
    const message =
      error instanceof Error ? error.message : "Failed to create client.";
    const status =
      /duplicate|unique|already exists/i.test(message) ? 409 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

/**
 * Admin-only permanent delete:
 * 1) Wipe all R2 objects under clients/{clientId}/
 * 2) Remove the portal_clients row from Supabase
 */
export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    let clientId =
      searchParams.get("clientId")?.trim() ||
      searchParams.get("folderId")?.trim() ||
      "";

    if (!clientId) {
      const body = (await request.json().catch(() => null)) as {
        clientId?: string;
        folderId?: string;
      } | null;
      clientId =
        body?.clientId?.trim() || body?.folderId?.trim() || "";
    }

    if (!clientId) {
      return NextResponse.json(
        { error: "clientId (or folderId) is required." },
        { status: 400 },
      );
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(clientId)) {
      return NextResponse.json(
        { error: "Invalid clientId format." },
        { status: 400 },
      );
    }

    const existing = await getPortalClientById(clientId);
    if (!existing) {
      return NextResponse.json(
        { error: "Client not found." },
        { status: 404 },
      );
    }

    // Step 1: purge R2 folder under clients/{folderId}/
    const r2Result = await deleteAllClientFilesFromR2(clientId);

    // Step 2: remove Supabase record
    const deleted = await deletePortalClient(clientId);

    return NextResponse.json({
      ok: true,
      deleted: true,
      client_id: deleted.client_id,
      company_name: deleted.company_name,
      deletedFiles: r2Result.deletedCount,
    });
  } catch (error) {
    console.error("[portal/clients DELETE]", error);
    const message =
      error instanceof Error ? error.message : "Failed to permanently delete client.";
    const status = /not found/i.test(message) ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
