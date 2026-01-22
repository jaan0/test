"use client";

import { useState } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import ContentEditor from "@/components/admin/ContentEditor";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function AdminContentPage() {
  const { data: session, status } = useSession();
  const { data, error, mutate } = useSWR("/api/content", fetcher);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");

  if (status === "loading") return <p className="text-gray-300">Loading...</p>;
  if (!session) return <p className="text-red-400">Please sign in.</p>;

  const canWrite = ["admin", "editor"].includes(session?.user?.role);

  const handleSave = async (contentData) => {
    setSaveError("");
    setSaveSuccess("");
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contentData),
      });
      if (!res.ok) {
        const msg = await res.json().catch(() => ({}));
        throw new Error(msg.error || "Save failed");
      }
      setSaveSuccess("Saved content successfully!");
      mutate();
      setTimeout(() => setSaveSuccess(""), 3000);
    } catch (err) {
      setSaveError(err.message);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">Content Editor</h1>
        <p className="text-gray-400 text-sm mt-2">
          Edit your site content (hero text, CTAs, testimonials, etc.). Toggle between Visual and Code views.
        </p>
        {!canWrite && (
          <p className="text-yellow-400 text-sm mt-2">Read-only mode (role: {session?.user?.role})</p>
        )}
      </div>

      {error && <p className="text-red-400 text-sm">Failed to load content.</p>}
      {saveError && <p className="text-red-400 text-sm">{saveError}</p>}
      {saveSuccess && <p className="text-green-300 text-sm">{saveSuccess}</p>}

      <ContentEditor
        content={data || {}}
        onSave={handleSave}
        canWrite={canWrite}
        saving={saving}
      />
    </div>
  );
}
