/**
 * Seed public.portal_clients with demo admin + EPC partner accounts.
 *
 * Usage (from project root):
 *   npm run db:seed
 *
 * Requires env vars (from .env.local or shell):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  const text = readFileSync(filePath, "utf8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(resolve(rootDir, ".env.local"));
loadEnvFile(resolve(rootDir, ".env"));

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Check .env.local.",
  );
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const SEED_ROWS = [
  {
    client_id: "admin_paxfab",
    company_name: "Paxfab Internal",
    project_name: "Admin Control Plane",
    email: "admin@paxfab.com",
    password: "admin123",
    role: "admin",
    is_active: true,
  },
  {
    client_id: "client_bechtel",
    company_name: "Bechtel Corporation",
    project_name: "Shell Upgrader & Major EPC Works",
    email: "bechtel@paxfab.com",
    password: "demo123",
    role: "client",
    is_active: true,
  },
  {
    client_id: "client_cheniere",
    company_name: "Cheniere Energy",
    project_name: "Sabine Pass LNG Expansion",
    email: "cheniere@paxfab.com",
    password: "demo123",
    role: "client",
    is_active: true,
  },
];

async function main() {
  console.log("Seeding portal_clients…");

  const { data, error } = await supabase
    .from("portal_clients")
    .upsert(SEED_ROWS, { onConflict: "client_id" })
    .select("client_id, email, role, company_name");

  if (error) {
    console.error("Seed failed:", error.message);
    console.error(
      "\nHint: ensure table public.portal_clients exists with columns:\n" +
        "  client_id (unique), company_name, project_name, email, password, role, is_active\n",
    );
    process.exit(1);
  }

  console.log("Seeded rows:");
  for (const row of data ?? []) {
    console.log(
      `  ✓ ${row.email} (${row.role}) — ${row.company_name} [${row.client_id}]`,
    );
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
