"use client";

import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";

type FormState = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  projectDetails: string;
  message: string;
};

const initialForm: FormState = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  projectDetails: "",
  message: "",
};

const fieldClass =
  "mt-1.5 w-full rounded border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-body/40 focus:border-brand focus:ring-1 focus:ring-brand";

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setSuccess(false);

    await new Promise((resolve) => setTimeout(resolve, 900));

    setLoading(false);
    setSuccess(true);
    setForm(initialForm);
  }

  return (
    <div className="rounded border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
        Send Us a Message / Request for Quote
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-body">
        Share project scope, drawings, or capacity questions. We typically
        respond within one business day.
      </p>

      {success ? (
        <div
          className="mt-6 flex gap-3 rounded border border-brand/30 bg-brand/5 px-4 py-3 text-sm text-body"
          role="status"
        >
          <CheckCircle2
            className="mt-0.5 h-5 w-5 shrink-0 text-brand"
            aria-hidden
          />
          <p>
            Thank you! Your message has been received. Our team will review and
            respond shortly.
          </p>
        </div>
      ) : null}

      <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <label
            htmlFor="fullName"
            className="text-xs font-semibold uppercase tracking-[0.14em] text-body/70"
          >
            Full Name <span className="text-brand">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            className={fieldClass}
            placeholder="Jane Smith"
          />
        </div>

        <div>
          <label
            htmlFor="company"
            className="text-xs font-semibold uppercase tracking-[0.14em] text-body/70"
          >
            Company / General Contractor <span className="text-brand">*</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            className={fieldClass}
            placeholder="Bechtel, Fluor, Owner, etc."
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="email"
              className="text-xs font-semibold uppercase tracking-[0.14em] text-body/70"
            >
              Work Email <span className="text-brand">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className={fieldClass}
              placeholder="name@company.com"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="text-xs font-semibold uppercase tracking-[0.14em] text-body/70"
            >
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={fieldClass}
              placeholder="(713) 555-0100"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="projectDetails"
            className="text-xs font-semibold uppercase tracking-[0.14em] text-body/70"
          >
            Project Location / Estimated Tonnage{" "}
            <span className="normal-case tracking-normal text-body/40">
              (optional)
            </span>
          </label>
          <input
            id="projectDetails"
            name="projectDetails"
            type="text"
            value={form.projectDetails}
            onChange={(e) => update("projectDetails", e.target.value)}
            className={fieldClass}
            placeholder="e.g. Geismar, LA · ~4,000 tons"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="text-xs font-semibold uppercase tracking-[0.14em] text-body/70"
          >
            Message / Scope of Work <span className="text-brand">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            className={`${fieldClass} min-h-[120px] resize-y`}
            placeholder="Describe fabrication scope, drawing package status, and target milestones…"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded bg-brand px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Submitting…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden />
              Submit Inquiry
            </>
          )}
        </button>
      </form>
    </div>
  );
}
