"use client";

import { useState } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import ServiceEditor from "@/components/admin/ServiceEditor";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function AdminServicesPage() {
  const { data: session, status } = useSession();
  const { data, error, mutate } = useSWR("/api/services", fetcher);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");

  if (status === "loading") return <p className="text-gray-300">Loading...</p>;
  if (!session) return <p className="text-red-400">Please sign in.</p>;

  const canWrite = ["admin", "editor"].includes(session?.user?.role);

  const handleSave = async (servicesData) => {
    setSaveError("");
    setSaveSuccess("");
    setSaving(true);
    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(servicesData),
      });
      if (!res.ok) {
        const msg = await res.json().catch(() => ({}));
        throw new Error(msg.error || "Save failed");
      }
      setSaveSuccess("Saved services successfully!");
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
        <h1 className="text-3xl font-bold">Services Editor</h1>
        <p className="text-gray-400 text-sm mt-2">
          Edit your service packages visually or using code. Toggle between Visual and Code views.
        </p>
        {!canWrite && (
          <p className="text-yellow-400 text-sm mt-2">Read-only mode (role: {session?.user?.role})</p>
        )}
      </div>

      {error && <p className="text-red-400 text-sm">Failed to load services.</p>}
      {saveError && <p className="text-red-400 text-sm">{saveError}</p>}
      {saveSuccess && <p className="text-green-300 text-sm">{saveSuccess}</p>}

      <ServiceEditor
        services={data || []}
        onSave={handleSave}
        canWrite={canWrite}
        saving={saving}
      />
    </div>
  );
}
