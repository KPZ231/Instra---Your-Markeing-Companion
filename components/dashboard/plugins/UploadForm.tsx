"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const inputStyle = {
  background: "var(--color-surface-container-lowest)",
  borderColor: "rgba(255,255,255,0.2)",
  color: "var(--color-primary)",
};

const focusStyle = {
  borderColor: "rgba(255,255,255,1)",
};

/**
 * Form for uploading a plugin bundle and manifest for review.
 * Sends multipart/form-data to POST /api/plugins/upload.
 * Redirects to /dashboard/plugins on success.
 */
export default function UploadForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  /**
   * Handles form submission — sends multipart data to the upload API.
   * @param e - Form submit event
   */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/plugins/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError((data as { error?: string }).error ?? "Upload failed.");
        return;
      }
      router.push("/dashboard/plugins");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function getFieldStyle(fieldName: string) {
    return {
      ...inputStyle,
      ...(focusedField === fieldName ? focusStyle : {}),
    };
  }

  const labelClass = "font-mono text-[11px] tracking-[0.1em] uppercase mb-1.5 block";
  const inputClass =
    "w-full rounded-sm border px-3 py-2.5 text-sm font-sans bg-transparent outline-none transition-colors";

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 max-w-xl">
      {/* Slug */}
      <div>
        <label
          htmlFor="slug"
          className={labelClass}
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          Slug
        </label>
        <input
          id="slug"
          name="slug"
          type="text"
          placeholder="my-plugin"
          required
          pattern="^[a-z0-9-]+$"
          className={inputClass}
          style={getFieldStyle("slug")}
          onFocus={() => setFocusedField("slug")}
          onBlur={() => setFocusedField(null)}
        />
        <p className="font-mono text-[10px] mt-1" style={{ color: "var(--color-outline)" }}>
          lowercase letters, numbers, hyphens only
        </p>
      </div>

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className={labelClass}
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          Nazwa
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="My Plugin"
          required
          className={inputClass}
          style={getFieldStyle("name")}
          onFocus={() => setFocusedField("name")}
          onBlur={() => setFocusedField(null)}
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className={labelClass}
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          Opis
        </label>
        <input
          id="description"
          name="description"
          type="text"
          placeholder="Co robi ten plugin?"
          required
          className={inputClass}
          style={getFieldStyle("description")}
          onFocus={() => setFocusedField("description")}
          onBlur={() => setFocusedField(null)}
        />
      </div>

      {/* Manifest JSON */}
      <div>
        <label
          htmlFor="manifest"
          className={labelClass}
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          Manifest JSON
        </label>
        <textarea
          id="manifest"
          name="manifest"
          rows={6}
          placeholder={`{\n  "name": "my-plugin",\n  "version": "1.0.0",\n  "description": "",\n  "author": "",\n  "permissions": [],\n  "main": "bundle.js"\n}`}
          required
          className={inputClass + " resize-none font-mono text-xs"}
          style={getFieldStyle("manifest")}
          onFocus={() => setFocusedField("manifest")}
          onBlur={() => setFocusedField(null)}
        />
      </div>

      {/* Bundle file */}
      <div>
        <label
          htmlFor="bundle"
          className={labelClass}
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          Bundle (.js)
        </label>
        <input
          id="bundle"
          name="bundle"
          type="file"
          accept=".js"
          required
          className="w-full font-mono text-xs rounded-sm border px-3 py-2.5 transition-colors file:mr-3 file:font-mono file:text-xs file:uppercase file:tracking-[0.08em] file:rounded-sm file:border-0 file:px-3 file:py-1.5 cursor-pointer"
          style={{
            borderColor: "rgba(255,255,255,0.2)",
            color: "var(--color-on-surface-variant)",
          }}
        />
      </div>

      {/* Error */}
      {error && (
        <p
          className="font-mono text-xs px-3 py-2 rounded-sm border"
          style={{
            color: "#ffb4ab",
            borderColor: "rgba(255,75,75,0.3)",
            background: "rgba(255,75,75,0.05)",
          }}
        >
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2.5 rounded-sm font-mono text-xs tracking-[0.08em] uppercase transition-opacity disabled:opacity-50"
        style={{
          background: "var(--color-primary)",
          color: "var(--color-on-primary)",
        }}
      >
        {loading ? "Przesyłanie..." : "Prześlij do recenzji"}
      </button>
    </form>
  );
}
