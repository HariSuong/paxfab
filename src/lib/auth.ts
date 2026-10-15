import { cookies } from "next/headers";
import { getSupabaseServer } from "@/lib/supabaseServer";

export const SESSION_COOKIE = "pax_client_session";

export type PortalRole = "admin" | "client";

export type PortalClientRow = {
  client_id: string;
  company_name: string;
  project_name: string;
  email: string;
  password: string;
  role: PortalRole;
  is_active: boolean;
};

export type SessionPayload = {
  clientId: string;
  companyName: string;
  projectName: string;
  email: string;
  role: PortalRole;
  /** @deprecated Use companyName — kept for older cookie payloads */
  name?: string;
  /** @deprecated Use projectName — kept for older cookie payloads */
  project?: string;
};

export type AuthLookupResult =
  | { status: "ok"; client: PortalClientRow }
  | { status: "invalid" }
  | { status: "deactivated" };

function isPortalRole(value: unknown): value is PortalRole {
  return value === "admin" || value === "client";
}

function normalizeActive(value: unknown): boolean {
  return value !== false;
}

export function toSessionPayload(row: PortalClientRow): SessionPayload {
  return {
    clientId: row.client_id,
    companyName: row.company_name,
    projectName: row.project_name,
    email: row.email,
    role: row.role,
    name: row.company_name,
    project: row.project_name,
  };
}

/** Authenticate against public.portal_clients by email + password. */
export async function authenticatePortalUser(
  email: string,
  password: string,
): Promise<AuthLookupResult> {
  const normalized = email.trim().toLowerCase();
  const supabase = getSupabaseServer();

  const { data, error } = await supabase
    .from("portal_clients")
    .select(
      "client_id, company_name, project_name, email, password, role, is_active",
    )
    .eq("email", normalized)
    .eq("password", password)
    .maybeSingle();

  if (error) {
    console.error("[auth] portal_clients lookup failed:", error.message);
    return { status: "invalid" };
  }

  if (!data || !isPortalRole(data.role)) {
    return { status: "invalid" };
  }

  const row: PortalClientRow = {
    ...(data as Omit<PortalClientRow, "is_active">),
    is_active: normalizeActive(data.is_active),
  };

  // Soft-delete: clients with is_active === false cannot sign in
  if (row.role === "client" && row.is_active === false) {
    return { status: "deactivated" };
  }

  return { status: "ok", client: row };
}

/** List client-role workspaces for admin UI. */
export async function listClientWorkspaces(opts?: {
  activeOnly?: boolean;
}): Promise<Omit<PortalClientRow, "password">[]> {
  const supabase = getSupabaseServer();

  let query = supabase
    .from("portal_clients")
    .select("client_id, company_name, project_name, email, role, is_active")
    .eq("role", "client")
    .order("company_name", { ascending: true });

  if (opts?.activeOnly) {
    query = query.eq("is_active", true);
  }

  const { data, error } = await query;

  if (error) {
    console.error("[auth] listClientWorkspaces failed:", error.message);
    throw new Error("Failed to list client workspaces.");
  }

  return (data ?? []).map((row) => ({
    ...(row as Omit<PortalClientRow, "password" | "is_active">),
    is_active: normalizeActive(row.is_active),
  }));
}

export type CreatePortalClientInput = {
  clientId: string;
  companyName: string;
  projectName: string;
  email: string;
  password: string;
  role?: PortalRole;
};

/** Insert a new partner row into portal_clients. */
export async function createPortalClient(
  input: CreatePortalClientInput,
): Promise<Omit<PortalClientRow, "password">> {
  const supabase = getSupabaseServer();

  const row = {
    client_id: input.clientId.trim(),
    company_name: input.companyName.trim(),
    project_name: input.projectName.trim(),
    email: input.email.trim().toLowerCase(),
    password: input.password,
    role: input.role ?? "client",
    is_active: true,
  };

  const { data, error } = await supabase
    .from("portal_clients")
    .insert(row)
    .select("client_id, company_name, project_name, email, role, is_active")
    .single();

  if (error) {
    console.error("[auth] createPortalClient failed:", error.message);
    throw new Error(error.message || "Failed to create client.");
  }

  return {
    ...(data as Omit<PortalClientRow, "password" | "is_active">),
    is_active: normalizeActive(data.is_active),
  };
}

/** Soft-delete / reactivate a client account (files on R2 are untouched). */
export async function setClientActiveStatus(
  clientId: string,
  isActive: boolean,
): Promise<Omit<PortalClientRow, "password">> {
  const supabase = getSupabaseServer();

  const { data, error } = await supabase
    .from("portal_clients")
    .update({ is_active: isActive })
    .eq("client_id", clientId)
    .eq("role", "client")
    .select("client_id, company_name, project_name, email, role, is_active")
    .maybeSingle();

  if (error) {
    console.error("[auth] setClientActiveStatus failed:", error.message);
    throw new Error(error.message || "Failed to update client status.");
  }

  if (!data) {
    throw new Error("Client not found.");
  }

  return {
    ...(data as Omit<PortalClientRow, "password" | "is_active">),
    is_active: normalizeActive(data.is_active),
  };
}

/** Look up a client-role row (no password). */
export async function getPortalClientById(
  clientId: string,
): Promise<Omit<PortalClientRow, "password"> | null> {
  const supabase = getSupabaseServer();

  const { data, error } = await supabase
    .from("portal_clients")
    .select("client_id, company_name, project_name, email, role, is_active")
    .eq("client_id", clientId)
    .eq("role", "client")
    .maybeSingle();

  if (error) {
    console.error("[auth] getPortalClientById failed:", error.message);
    throw new Error(error.message || "Failed to look up client.");
  }

  if (!data) return null;

  return {
    ...(data as Omit<PortalClientRow, "password" | "is_active">),
    is_active: normalizeActive(data.is_active),
  };
}

/** Permanently remove a client-role row from portal_clients. */
export async function deletePortalClient(
  clientId: string,
): Promise<{ client_id: string; company_name: string }> {
  const supabase = getSupabaseServer();

  const { data, error } = await supabase
    .from("portal_clients")
    .delete()
    .eq("client_id", clientId)
    .eq("role", "client")
    .select("client_id, company_name")
    .maybeSingle();

  if (error) {
    console.error("[auth] deletePortalClient failed:", error.message);
    throw new Error(error.message || "Failed to delete client.");
  }

  if (!data) {
    throw new Error("Client not found.");
  }

  return data;
}

export function encodeSession(payload: SessionPayload): string {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

export function decodeSession(value: string): SessionPayload | null {
  try {
    const json = Buffer.from(value, "base64url").toString("utf8");
    const data = JSON.parse(json) as SessionPayload;

    const companyName = data.companyName || data.name;
    const projectName = data.projectName || data.project;

    if (
      !data?.clientId ||
      !data?.email ||
      !companyName ||
      !projectName ||
      !isPortalRole(data.role)
    ) {
      return null;
    }

    return {
      clientId: data.clientId,
      companyName,
      projectName,
      email: data.email,
      role: data.role,
      name: companyName,
      project: projectName,
    };
  } catch {
    return null;
  }
}

/** Resolve which R2 client folder the request may operate on. */
export function resolveTargetClientId(
  session: SessionPayload,
  requestedClientId?: string | null,
): string | null {
  if (session.role === "admin") {
    const target = requestedClientId?.trim();
    return target || null;
  }

  // Clients may only operate on their own folder
  if (requestedClientId && requestedClientId.trim() !== session.clientId) {
    return null;
  }

  return session.clientId;
}

/** Read and validate the portal session cookie (Route Handlers / Server Components). */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  return decodeSession(raw);
}

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 8, // 8 hours
};
