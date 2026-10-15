"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type DragEvent,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useRouter } from "next/navigation";
import {
  Archive,
  Download,
  File,
  FileCode,
  FileText,
  Folder,
  FolderOpen,
  Loader2,
  Lock,
  LogOut,
  Plus,
  RotateCcw,
  Shield,
  Trash2,
  Upload,
  Users,
  X,
} from "lucide-react";
import type { SessionPayload } from "@/lib/auth";

type PortalFile = {
  name: string;
  size: number;
  lastModified: string | null;
  key: string;
  downloadUrl: string;
};

type ClientWorkspace = {
  client_id: string;
  company_name: string;
  project_name: string;
  email: string;
  role: string;
  is_active: boolean;
};

type AdminTab = "files" | "accounts";
type UploadStatus = "idle" | "queued" | "uploading" | "complete" | "error";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  const value = bytes / 1024 ** i;
  return `${value < 10 && i > 0 ? value.toFixed(1) : Math.round(value)} ${units[i]}`;
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return "—";
  }
}

function FileTypeIcon({ name }: { name: string }) {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  const className = "h-5 w-5 shrink-0 text-[#6535b1]";

  if (ext === "dwg" || ext === "dxf" || ext === "ifc") {
    return <FileCode className={className} aria-hidden />;
  }
  if (ext === "pdf") {
    return <FileText className={className} aria-hidden />;
  }
  if (ext === "zip" || ext === "rar" || ext === "7z") {
    return <Archive className={className} aria-hidden />;
  }
  return <File className={className} aria-hidden />;
}

export default function PortalDashboard({ user }: { user: SessionPayload }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const isAdmin = user.role === "admin";

  const [activeTab, setActiveTab] = useState<AdminTab>("files");

  const [files, setFiles] = useState<PortalFile[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(true);
  const [listError, setListError] = useState<string | null>(null);

  const [activeWorkspaces, setActiveWorkspaces] = useState<ClientWorkspace[]>(
    [],
  );
  const [allClients, setAllClients] = useState<ClientWorkspace[]>([]);
  const [loadingWorkspaces, setLoadingWorkspaces] = useState(isAdmin);
  const [loadingDirectory, setLoadingDirectory] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(
    isAdmin ? "" : user.clientId,
  );
  const [togglingClientId, setTogglingClientId] = useState<string | null>(null);
  const [clientPendingDelete, setClientPendingDelete] =
    useState<ClientWorkspace | null>(null);
  const [deletingClientId, setDeletingClientId] = useState<string | null>(null);

  const [dragOver, setDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [signingOut, setSigningOut] = useState(false);
  const [filePendingDelete, setFilePendingDelete] = useState<PortalFile | null>(
    null,
  );
  const [deletingKey, setDeletingKey] = useState<string | null>(null);
  const [downloadingKey, setDownloadingKey] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [creatingClient, setCreatingClient] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [newClient, setNewClient] = useState({
    companyName: "",
    projectName: "",
    clientId: "",
    email: "",
    password: "",
  });

  const activeWorkspace = isAdmin
    ? activeWorkspaces.find((w) => w.client_id === selectedClientId)
    : null;

  const displayCompany = isAdmin
    ? (activeWorkspace?.company_name ?? user.companyName)
    : user.companyName;
  const displayProject = isAdmin
    ? (activeWorkspace?.project_name ?? user.projectName)
    : user.projectName;

  function showToast(message: string) {
    setToast(message);
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => setToast(null), 3200);
  }

  const loadActiveWorkspaces = useCallback(async () => {
    if (!isAdmin) return;
    setLoadingWorkspaces(true);
    try {
      const res = await fetch("/api/portal/clients?activeOnly=true");
      if (res.status === 401) {
        router.replace("/client-portal");
        return;
      }
      const data = (await res.json()) as {
        clients?: ClientWorkspace[];
        error?: string;
      };
      if (!res.ok) {
        showToast(data.error ?? "Failed to load active workspaces.");
        return;
      }
      const list = data.clients ?? [];
      setActiveWorkspaces(list);
      setSelectedClientId((prev) => {
        if (prev && list.some((c) => c.client_id === prev)) return prev;
        return list[0]?.client_id ?? "";
      });
    } catch {
      showToast("Network error while loading clients.");
    } finally {
      setLoadingWorkspaces(false);
    }
  }, [isAdmin, router]);

  const loadDirectory = useCallback(async () => {
    if (!isAdmin) return;
    setLoadingDirectory(true);
    try {
      const res = await fetch("/api/portal/clients");
      if (res.status === 401) {
        router.replace("/client-portal");
        return;
      }
      const data = (await res.json()) as {
        clients?: ClientWorkspace[];
        error?: string;
      };
      if (!res.ok) {
        showToast(data.error ?? "Failed to load client directory.");
        return;
      }
      setAllClients(data.clients ?? []);
    } catch {
      showToast("Network error while loading directory.");
    } finally {
      setLoadingDirectory(false);
    }
  }, [isAdmin, router]);

  const loadFiles = useCallback(
    async (opts?: { silent?: boolean }) => {
      if (isAdmin && !selectedClientId) {
        setFiles([]);
        setLoadingFiles(false);
        setListError(null);
        return;
      }

      if (!opts?.silent) setLoadingFiles(true);
      setListError(null);
      try {
        const qs =
          isAdmin && selectedClientId
            ? `?targetClientId=${encodeURIComponent(selectedClientId)}`
            : "";
        const res = await fetch(`/api/portal/files${qs}`);
        if (res.status === 401) {
          router.replace("/client-portal");
          return;
        }
        const data = (await res.json()) as {
          files?: PortalFile[];
          error?: string;
        };
        if (!res.ok) {
          setListError(data.error ?? "Failed to load documents.");
          return;
        }
        setFiles(data.files ?? []);
      } catch {
        setListError("Network error while loading documents.");
      } finally {
        if (!opts?.silent) setLoadingFiles(false);
      }
    },
    [isAdmin, router, selectedClientId],
  );

  useEffect(() => {
    void loadActiveWorkspaces();
  }, [loadActiveWorkspaces]);

  useEffect(() => {
    if (isAdmin && activeTab === "accounts") {
      void loadDirectory();
    }
  }, [activeTab, isAdmin, loadDirectory]);

  useEffect(() => {
    if (!isAdmin || activeTab === "files") {
      void loadFiles();
    }
  }, [activeTab, isAdmin, loadFiles]);

  async function handleToggleStatus(client: ClientWorkspace, nextActive: boolean) {
    const action = nextActive ? "reactivate" : "revoke access for";
    const confirmed = window.confirm(
      nextActive
        ? `Reactivate portal access for "${client.company_name}"?`
        : `Revoke access for "${client.company_name}"?\n\nProject files on R2 will be preserved for technical records.`,
    );
    if (!confirmed) return;

    setTogglingClientId(client.client_id);
    try {
      const res = await fetch("/api/portal/clients/toggle-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: client.client_id,
          isActive: nextActive,
        }),
      });
      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        showToast(data.error ?? `Failed to ${action} client.`);
        return;
      }

      showToast(
        nextActive
          ? `Reactivated "${client.company_name}"`
          : `Revoked access for "${client.company_name}"`,
      );
      await Promise.all([loadDirectory(), loadActiveWorkspaces()]);
    } catch {
      showToast("Network error while updating client status.");
    } finally {
      setTogglingClientId(null);
    }
  }

  async function handleConfirmPermanentDelete() {
    if (!clientPendingDelete) return;
    const client = clientPendingDelete;
    setDeletingClientId(client.client_id);

    try {
      const res = await fetch("/api/portal/clients", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId: client.client_id }),
      });
      const data = (await res.json()) as {
        error?: string;
        deletedFiles?: number;
      };

      if (!res.ok) {
        showToast(data.error ?? "Failed to permanently delete client.");
        return;
      }

      // Optimistic remove so the row disappears immediately
      setAllClients((prev) =>
        prev.filter((c) => c.client_id !== client.client_id),
      );
      setActiveWorkspaces((prev) =>
        prev.filter((c) => c.client_id !== client.client_id),
      );
      setSelectedClientId((prev) =>
        prev === client.client_id ? "" : prev,
      );
      setClientPendingDelete(null);

      const fileNote =
        typeof data.deletedFiles === "number"
          ? ` (${data.deletedFiles} file${data.deletedFiles === 1 ? "" : "s"} removed from R2)`
          : "";
      showToast(`Permanently deleted "${client.company_name}"${fileNote}`);
      await Promise.all([loadDirectory(), loadActiveWorkspaces()]);
    } catch {
      showToast("Network error while deleting client.");
    } finally {
      setDeletingClientId(null);
    }
  }

  async function handleDownload(file: PortalFile) {
    setDownloadingKey(file.key);
    try {
      const qs = new URLSearchParams({ key: file.key });
      if (isAdmin && selectedClientId) {
        qs.set("targetClientId", selectedClientId);
      }
      const res = await fetch(`/api/portal/download?${qs.toString()}`);
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        showToast(data?.error ?? "Download failed.");
        return;
      }

      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.setAttribute("download", file.name);
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);
    } catch {
      showToast("Network error during download.");
    } finally {
      setDownloadingKey(null);
    }
  }

  async function handleConfirmFileDelete() {
    if (!filePendingDelete) return;
    const file = filePendingDelete;

    setDeletingKey(file.key);
    try {
      const res = await fetch("/api/portal/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: file.key,
          ...(isAdmin && selectedClientId
            ? { targetClientId: selectedClientId }
            : {}),
        }),
      });
      const data = (await res.json()) as { error?: string; success?: boolean };

      if (!res.ok) {
        showToast(data.error ?? "Failed to delete file.");
        return;
      }

      setFilePendingDelete(null);
      showToast(`Deleted "${file.name}"`);
      await loadFiles({ silent: true });
    } catch {
      showToast("Network error while deleting file.");
    } finally {
      setDeletingKey(null);
    }
  }

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await fetch("/api/portal/logout", { method: "POST" });
      window.location.assign("/client-portal");
    } catch {
      setSigningOut(false);
    }
  }

  async function uploadFile(file: File) {
    if (isAdmin && !selectedClientId) {
      setUploadError("Select a client workspace before uploading.");
      return;
    }

    setUploadError(null);
    setUploadStatus("queued");
    setUploadProgress(5);

    await new Promise((r) => setTimeout(r, 150));
    setUploadStatus("uploading");
    setUploadProgress(25);

    const formData = new FormData();
    formData.append("file", file);
    if (isAdmin && selectedClientId) {
      formData.append("targetClientId", selectedClientId);
    }

    try {
      const progressTimer = window.setInterval(() => {
        setUploadProgress((p) => (p < 85 ? p + 8 : p));
      }, 200);

      const res = await fetch("/api/portal/upload", {
        method: "POST",
        body: formData,
      });

      window.clearInterval(progressTimer);

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setUploadStatus("error");
        setUploadProgress(0);
        setUploadError(data.error ?? "Upload failed.");
        return;
      }

      setUploadProgress(100);
      setUploadStatus("complete");
      await loadFiles();

      window.setTimeout(() => {
        setUploadStatus("idle");
        setUploadProgress(0);
      }, 1800);
    } catch {
      setUploadStatus("error");
      setUploadProgress(0);
      setUploadError("Network error during upload.");
    }
  }

  function onFileSelected(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) void uploadFile(file);
    e.target.value = "";
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) void uploadFile(file);
  }

  async function handleCreateClient(e: FormEvent) {
    e.preventDefault();
    setCreateError(null);
    setCreatingClient(true);

    try {
      const res = await fetch("/api/portal/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClient),
      });
      const data = (await res.json()) as {
        error?: string;
        client?: ClientWorkspace;
      };

      if (!res.ok) {
        setCreateError(data.error ?? "Failed to create client.");
        return;
      }

      showToast(`Created workspace for ${data.client?.company_name ?? "client"}`);
      setShowAddModal(false);
      setNewClient({
        companyName: "",
        projectName: "",
        clientId: "",
        email: "",
        password: "",
      });

      if (data.client?.client_id) {
        setSelectedClientId(data.client.client_id);
      }
      await Promise.all([loadActiveWorkspaces(), loadDirectory()]);
      setActiveTab("files");
    } catch {
      setCreateError("Network error while creating client.");
    } finally {
      setCreatingClient(false);
    }
  }

  const isUploading =
    uploadStatus === "queued" || uploadStatus === "uploading";
  const canOperateFiles = !isAdmin || Boolean(selectedClientId);
  const showFilesTab = !isAdmin || activeTab === "files";

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 max-w-sm rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-lg"
        >
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6535b1]">
            Secure Document Portal
          </p>
          {isAdmin && (
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#6535b1] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              <Shield className="h-3 w-3" aria-hidden />
              Internal Admin Access
            </span>
          )}
          <h1 className="mt-2 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            {isAdmin && activeTab === "accounts"
              ? "Client Accounts Directory"
              : `${displayCompany} — Project Repository`}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {isAdmin && activeTab === "accounts" ? (
              "Manage partner access without deleting technical archives on R2."
            ) : (
              <>
                Active Project:{" "}
                <span className="font-medium text-slate-900">
                  {displayProject}
                </span>
              </>
            )}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Signed in as {user.email}
            {!(isAdmin && activeTab === "accounts") && (
              <>
                {" "}
                · Isolation ID{" "}
                <code className="text-[#6535b1]">
                  {isAdmin && selectedClientId
                    ? selectedClientId
                    : user.clientId}
                </code>
              </>
            )}
          </p>
        </div>

        <button
          type="button"
          onClick={() => void handleSignOut()}
          disabled={signingOut}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:opacity-60"
        >
          {signingOut ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : (
            <LogOut className="h-4 w-4" aria-hidden />
          )}
          Sign Out
        </button>
      </div>

      {/* Admin tabs */}
      {isAdmin && (
        <div className="mb-8 inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1">
          <button
            type="button"
            onClick={() => setActiveTab("files")}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
              activeTab === "files"
                ? "bg-white text-[#6535b1] shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Folder className="h-4 w-4" aria-hidden />
            Project Files
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("accounts")}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
              activeTab === "accounts"
                ? "bg-white text-[#6535b1] shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Users className="h-4 w-4" aria-hidden />
            Client Accounts
          </button>
        </div>
      )}

      {/* Tab 1: Project Files (also the only view for clients) */}
      {showFilesTab && (
        <>
          {isAdmin && (
            <section className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
              <div className="min-w-0 flex-1">
                <label
                  htmlFor="active-client-workspace"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500"
                >
                  Active Client Workspace
                </label>
                <select
                  id="active-client-workspace"
                  value={selectedClientId}
                  onChange={(e) => setSelectedClientId(e.target.value)}
                  disabled={loadingWorkspaces || activeWorkspaces.length === 0}
                  className="w-full max-w-xl rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#6535b1] focus:ring-2 focus:ring-[#6535b1] disabled:opacity-60"
                >
                  {loadingWorkspaces ? (
                    <option value="">Loading clients…</option>
                  ) : activeWorkspaces.length === 0 ? (
                    <option value="">No active client workspaces</option>
                  ) : (
                    activeWorkspaces.map((c) => (
                      <option key={c.client_id} value={c.client_id}>
                        {c.company_name} — {c.project_name} ({c.client_id})
                      </option>
                    ))
                  )}
                </select>
                {selectedClientId && (
                  <p className="mt-2 text-xs text-slate-500">
                    R2 path:{" "}
                    <code className="text-[#6535b1]">
                      clients/{selectedClientId}/
                    </code>
                  </p>
                )}
              </div>
            </section>
          )}

          <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5 sm:p-6 first:mt-0">
            <h2 className="font-display text-lg font-semibold text-slate-900">
              Upload New Drawings / Files
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Drop revision packages into the isolated project folder. Supported:
              DWG, DXF, PDF, IFC, ZIP.
            </p>

            <div
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (canOperateFiles && !isUploading) inputRef.current?.click();
                }
              }}
              onDragOver={(e) => {
                e.preventDefault();
                if (canOperateFiles) setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              onClick={() =>
                canOperateFiles && !isUploading && inputRef.current?.click()
              }
              className={`mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-12 transition ${
                dragOver
                  ? "border-[#6535b1] bg-[#6535b1]/10"
                  : "border-slate-200 bg-slate-50 hover:border-[#6535b1]/50 hover:bg-[#6535b1]/5"
              } ${isUploading || !canOperateFiles ? "pointer-events-none opacity-70" : ""}`}
            >
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                onChange={onFileSelected}
                disabled={isUploading || !canOperateFiles}
              />

              {!canOperateFiles ? (
                <>
                  <FolderOpen
                    className="mb-3 h-10 w-10 text-slate-300"
                    aria-hidden
                  />
                  <p className="text-sm font-medium text-slate-600">
                    Select a client workspace to upload files
                  </p>
                </>
              ) : isUploading ? (
                <>
                  <Loader2
                    className="mb-3 h-10 w-10 animate-spin text-[#6535b1]"
                    aria-hidden
                  />
                  <p className="text-sm font-medium text-slate-900">
                    {uploadStatus === "queued" ? "Queued…" : "Uploading…"}
                  </p>
                </>
              ) : uploadStatus === "complete" ? (
                <>
                  <Upload
                    className="mb-3 h-10 w-10 text-emerald-500"
                    aria-hidden
                  />
                  <p className="text-sm font-medium text-emerald-600">
                    Upload complete
                  </p>
                </>
              ) : (
                <>
                  <Upload
                    className="mb-3 h-10 w-10 text-[#6535b1]"
                    aria-hidden
                  />
                  <p className="text-sm font-medium text-slate-900">
                    Drag &amp; drop files here, or click to browse
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Max 100 MB per file
                  </p>
                </>
              )}

              {(isUploading || uploadStatus === "complete") && (
                <div className="mt-4 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-[#6535b1] transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
            </div>

            {uploadError && (
              <p
                className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                role="alert"
              >
                {uploadError}
              </p>
            )}
          </section>

          <section className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="font-display text-lg font-semibold text-slate-900">
                Project Documents
              </h2>
              <button
                type="button"
                onClick={() => void loadFiles()}
                disabled={loadingFiles || !canOperateFiles}
                className="text-xs font-semibold uppercase tracking-wider text-[#6535b1] hover:text-[#542a96] disabled:opacity-50"
              >
                Refresh
              </button>
            </div>

            {!canOperateFiles ? (
              <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-white px-6 py-16 text-center">
                <FolderOpen
                  className="mb-3 h-12 w-12 text-slate-300"
                  aria-hidden
                />
                <p className="max-w-md text-sm leading-relaxed text-slate-600">
                  Choose an active client workspace to browse their R2 project
                  folder.
                </p>
              </div>
            ) : loadingFiles ? (
              <div className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-16 text-slate-500">
                <Loader2
                  className="h-5 w-5 animate-spin text-[#6535b1]"
                  aria-hidden
                />
                Loading documents…
              </div>
            ) : listError ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-6 text-sm text-red-700">
                {listError}
              </div>
            ) : files.length === 0 ? (
              <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-white px-6 py-16 text-center">
                <FolderOpen
                  className="mb-3 h-12 w-12 text-slate-300"
                  aria-hidden
                />
                <p className="max-w-md text-sm leading-relaxed text-slate-600">
                  No documents available for this project yet. Upload a file
                  above to get started.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-4 py-3 font-semibold">File Name</th>
                      <th className="px-4 py-3 font-semibold">Size</th>
                      <th className="px-4 py-3 font-semibold">Upload Date</th>
                      <th className="px-4 py-3 font-semibold text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {files.map((file) => (
                      <tr
                        key={file.key}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <FileTypeIcon name={file.name} />
                            <span className="font-medium text-slate-900">
                              {file.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {formatBytes(file.size)}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {formatDate(file.lastModified)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="inline-flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => void handleDownload(file)}
                              disabled={downloadingKey === file.key}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-[#6535b1] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#542a96] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {downloadingKey === file.key ? (
                                <Loader2
                                  className="h-3.5 w-3.5 animate-spin"
                                  aria-hidden
                                />
                              ) : (
                                <Download className="h-3.5 w-3.5" aria-hidden />
                              )}
                              Download
                            </button>
                            <button
                              type="button"
                              onClick={() => setFilePendingDelete(file)}
                              disabled={deletingKey === file.key}
                              aria-label={`Delete ${file.name}`}
                              title="Delete file"
                              className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-1.5 text-slate-400 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {deletingKey === file.key ? (
                                <Loader2
                                  className="h-3.5 w-3.5 animate-spin"
                                  aria-hidden
                                />
                              ) : (
                                <Trash2 className="h-3.5 w-3.5" aria-hidden />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}

      {/* Tab 2: Client Accounts (admin only) */}
      {isAdmin && activeTab === "accounts" && (
        <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold text-slate-900">
                Client Accounts
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Revoke access to hide partners from the workspace dropdown.
                Files remain on R2.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setCreateError(null);
                setShowAddModal(true);
              }}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#6535b1] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#542a96]"
            >
              <Plus className="h-4 w-4" aria-hidden />
              Create New Client
            </button>
          </div>

          {loadingDirectory ? (
            <div className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-16 text-slate-500">
              <Loader2
                className="h-5 w-5 animate-spin text-[#6535b1]"
                aria-hidden
              />
              Loading directory…
            </div>
          ) : allClients.length === 0 ? (
            <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-slate-50 px-6 py-16 text-center">
              <Users className="mb-3 h-12 w-12 text-slate-300" aria-hidden />
              <p className="max-w-md text-sm leading-relaxed text-slate-600">
                No client accounts yet. Create a new partner to get started.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full min-w-[800px] text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Company Name</th>
                    <th className="px-4 py-3 font-semibold">Project Name</th>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">Folder ID</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {allClients.map((client) => {
                    const active = client.is_active !== false;
                    const busy = togglingClientId === client.client_id;
                    const deleting = deletingClientId === client.client_id;
                    return (
                      <tr
                        key={client.client_id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-4 py-3 font-medium text-slate-900">
                          {client.company_name}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {client.project_name}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {client.email}
                        </td>
                        <td className="px-4 py-3">
                          <code className="text-xs text-[#6535b1]">
                            {client.client_id}
                          </code>
                        </td>
                        <td className="px-4 py-3">
                          {active ? (
                            <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500 ring-1 ring-slate-200">
                              Inactive / Revoked
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="inline-flex items-center justify-end gap-2">
                            {active ? (
                              <button
                                type="button"
                                onClick={() =>
                                  void handleToggleStatus(client, false)
                                }
                                disabled={busy || deleting}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800 disabled:opacity-60"
                              >
                                {busy ? (
                                  <Loader2
                                    className="h-3.5 w-3.5 animate-spin"
                                    aria-hidden
                                  />
                                ) : (
                                  <Lock className="h-3.5 w-3.5" aria-hidden />
                                )}
                                Revoke Access
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() =>
                                  void handleToggleStatus(client, true)
                                }
                                disabled={busy || deleting}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-[#6535b1]/30 bg-purple-50 px-3 py-1.5 text-xs font-semibold text-[#6535b1] transition hover:bg-purple-100 disabled:opacity-60"
                              >
                                {busy ? (
                                  <Loader2
                                    className="h-3.5 w-3.5 animate-spin"
                                    aria-hidden
                                  />
                                ) : (
                                  <RotateCcw
                                    className="h-3.5 w-3.5"
                                    aria-hidden
                                  />
                                )}
                                Reactivate
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => setClientPendingDelete(client)}
                              disabled={busy || deleting}
                              aria-label={`Permanently delete ${client.company_name}`}
                              title="Permanently delete client and R2 files"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                            >
                              {deleting ? (
                                <Loader2
                                  className="h-3.5 w-3.5 animate-spin"
                                  aria-hidden
                                />
                              ) : (
                                <Trash2 className="h-3.5 w-3.5" aria-hidden />
                              )}
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* Delete Project Document Confirm Dialog */}
      {filePendingDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-file-title"
        >
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-xl">
            <div className="border-b border-slate-200 px-5 py-4">
              <h3
                id="delete-file-title"
                className="font-display text-lg font-semibold text-slate-900"
              >
                Delete this document?
              </h3>
            </div>
            <div className="space-y-3 px-5 py-5">
              <p className="text-sm leading-relaxed text-slate-600">
                Are you sure you want to delete this project document? This
                action cannot be undone.
              </p>
              <p className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
                <span className="font-semibold">{filePendingDelete.name}</span>
              </p>
            </div>
            <div className="flex justify-end gap-2 border-t border-slate-200 px-5 py-4">
              <button
                type="button"
                onClick={() => setFilePendingDelete(null)}
                disabled={Boolean(deletingKey)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void handleConfirmFileDelete()}
                disabled={Boolean(deletingKey)}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                {deletingKey ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                ) : (
                  <Trash2 className="h-4 w-4" aria-hidden />
                )}
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Permanent Delete Confirm Dialog */}
      {clientPendingDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-client-title"
        >
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-xl">
            <div className="border-b border-slate-200 px-5 py-4">
              <h3
                id="delete-client-title"
                className="font-display text-lg font-semibold text-slate-900"
              >
                Permanently delete client?
              </h3>
            </div>
            <div className="space-y-3 px-5 py-5">
              <p className="text-sm leading-relaxed text-slate-600">
                Are you sure you want to permanently delete this client? All
                associated files in their R2 folder will be erased permanently.
              </p>
              <p className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
                <span className="font-semibold">
                  {clientPendingDelete.company_name}
                </span>
                {" — "}
                <code className="text-xs">
                  clients/{clientPendingDelete.client_id}/
                </code>
              </p>
            </div>
            <div className="flex justify-end gap-2 border-t border-slate-200 px-5 py-4">
              <button
                type="button"
                onClick={() => setClientPendingDelete(null)}
                disabled={Boolean(deletingClientId)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void handleConfirmPermanentDelete()}
                disabled={Boolean(deletingClientId)}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                {deletingClientId ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                ) : (
                  <Trash2 className="h-4 w-4" aria-hidden />
                )}
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Client Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-client-title"
        >
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <h3
                id="add-client-title"
                className="font-display text-lg font-semibold text-slate-900"
              >
                Create New Client
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => void handleCreateClient(e)}
              className="space-y-4 px-5 py-5"
            >
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Company Name
                </label>
                <input
                  required
                  value={newClient.companyName}
                  onChange={(e) =>
                    setNewClient((s) => ({ ...s, companyName: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-[#6535b1] focus:ring-2 focus:ring-[#6535b1]"
                  placeholder="Acme Engineering"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Project Name
                </label>
                <input
                  required
                  value={newClient.projectName}
                  onChange={(e) =>
                    setNewClient((s) => ({ ...s, projectName: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-[#6535b1] focus:ring-2 focus:ring-[#6535b1]"
                  placeholder="LNG Train Expansion"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Client ID / Folder Name
                </label>
                <input
                  required
                  value={newClient.clientId}
                  onChange={(e) =>
                    setNewClient((s) => ({ ...s, clientId: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-[#6535b1] focus:ring-2 focus:ring-[#6535b1]"
                  placeholder="client_acme"
                  pattern="[a-zA-Z0-9_-]+"
                  title="Letters, numbers, hyphens, and underscores only"
                />
                <p className="mt-1 text-xs text-slate-500">
                  R2 folder will be{" "}
                  <code className="text-[#6535b1]">
                    clients/{newClient.clientId || "…"}/
                  </code>
                </p>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={newClient.email}
                  onChange={(e) =>
                    setNewClient((s) => ({ ...s, email: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-[#6535b1] focus:ring-2 focus:ring-[#6535b1]"
                  placeholder="partner@company.com"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Password
                </label>
                <input
                  required
                  type="password"
                  value={newClient.password}
                  onChange={(e) =>
                    setNewClient((s) => ({ ...s, password: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-[#6535b1] focus:ring-2 focus:ring-[#6535b1]"
                  placeholder="••••••••"
                />
              </div>

              {createError && (
                <p
                  className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                  role="alert"
                >
                  {createError}
                </p>
              )}

              <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingClient}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#6535b1] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#542a96] disabled:opacity-60"
                >
                  {creatingClient && (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  )}
                  Save Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
