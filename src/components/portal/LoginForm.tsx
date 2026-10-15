"use client";

import { FormEvent, useState } from "react";
import { AlertCircle, Lock, Loader2 } from "lucide-react";

const DEMO_ACCOUNTS = {
  admin: {
    email: "admin@paxfab.com",
    password: "admin123",
    label: "Fill Admin Demo",
  },
  bechtel: {
    email: "bechtel@paxfab.com",
    password: "demo123",
    label: "Fill Bechtel Demo",
  },
  cheniere: {
    email: "cheniere@paxfab.com",
    password: "demo123",
    label: "Fill Cheniere Demo",
  },
} as const;

const demoButtonClass =
  "bg-white border border-slate-200 text-slate-700 hover:text-[#6535b1] hover:border-[#6535b1] hover:bg-purple-50/40 text-xs font-medium py-2 px-3 rounded-lg transition-all";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ErrorField = "email" | "password" | "all" | null;

const inputBaseClass =
  "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2";
const inputOkClass =
  "border-slate-300 focus:border-[#6535b1] focus:ring-[#6535b1]";
const inputErrorClass =
  "border-red-400 focus:border-red-400 focus:ring-red-300";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorField, setErrorField] = useState<ErrorField>(null);
  const [loading, setLoading] = useState(false);

  function clearFieldError(field: "email" | "password") {
    if (!errorField) return;
    if (errorField === field || errorField === "all") {
      setErrorMessage(null);
      setErrorField(null);
    }
  }

  function validate(): boolean {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setErrorMessage("Please enter your corporate email address.");
      setErrorField("email");
      return false;
    }

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setErrorMessage(
        "Please provide a valid email address (e.g., name@company.com).",
      );
      setErrorField("email");
      return false;
    }

    if (!password) {
      setErrorMessage("Please enter your security access password.");
      setErrorField("password");
      return false;
    }

    setErrorMessage(null);
    setErrorField(null);
    return true;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/portal/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        if (res.status === 401) {
          setErrorMessage(
            "Invalid credentials. Please contact Paxfab administration if you need access.",
          );
          setErrorField("all");
        } else if (res.status === 403 && data.error) {
          setErrorMessage(data.error);
          setErrorField("all");
        } else {
          setErrorMessage(
            data.error ??
              "Invalid credentials. Please contact Paxfab administration if you need access.",
          );
          setErrorField("all");
        }
        setLoading(false);
        return;
      }

      // Hard navigate so the new session cookie is applied cleanly
      window.location.assign("/client-portal/dashboard");
    } catch {
      setErrorMessage("Network error. Please try again.");
      setErrorField("all");
      setLoading(false);
    }
  }

  function fillDemo(key: keyof typeof DEMO_ACCOUNTS) {
    const account = DEMO_ACCOUNTS[key];
    setEmail(account.email);
    setPassword(account.password);
    setErrorMessage(null);
    setErrorField(null);
  }

  const emailHasError = errorField === "email" || errorField === "all";
  const passwordHasError = errorField === "password" || errorField === "all";

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-50 text-[#6535b1] ring-8 ring-purple-50/50">
          <Lock className="h-7 w-7" aria-hidden />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Client &amp; Contractor Secure Document Portal
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          Authenticated access for EPC partners. Files are isolated per client
          project in Paxfab secure storage.
        </p>
      </div>

      <form noValidate onSubmit={handleSubmit} className="space-y-4">
        {errorMessage && (
          <div
            role="alert"
            className="portal-alert-in flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700"
          >
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
            <span>{errorMessage}</span>
          </div>
        )}

        <div>
          <label
            htmlFor="portal-email"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700"
          >
            Email
          </label>
          <input
            id="portal-email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearFieldError("email");
            }}
            className={`${inputBaseClass} ${emailHasError ? inputErrorClass : inputOkClass}`}
            placeholder="partner@company.com"
            aria-invalid={emailHasError}
          />
        </div>

        <div>
          <label
            htmlFor="portal-password"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700"
          >
            Password
          </label>
          <input
            id="portal-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              clearFieldError("password");
            }}
            className={`${inputBaseClass} ${passwordHasError ? inputErrorClass : inputOkClass}`}
            placeholder="••••••••"
            aria-invalid={passwordHasError}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#6535b1] py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#522992] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Signing in…
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" aria-hidden />
              Sign In to Portal
            </>
          )}
        </button>
      </form>

      <div className="mt-6 space-y-2 border-t border-slate-200 pt-5">
        <p className="text-center text-xs uppercase tracking-wider text-slate-400">
          Quick demo fill
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => fillDemo("admin")}
            className={demoButtonClass}
          >
            Fill Admin Demo
          </button>
          <button
            type="button"
            onClick={() => fillDemo("bechtel")}
            className={demoButtonClass}
          >
            Fill Bechtel Demo
          </button>
          <button
            type="button"
            onClick={() => fillDemo("cheniere")}
            className={demoButtonClass}
          >
            Fill Cheniere Demo
          </button>
        </div>
      </div>

      <p className="mt-6 text-center text-xs leading-relaxed text-slate-400">
        Need project access? Contact your Paxfab Project Coordinator.
      </p>
    </div>
  );
}
