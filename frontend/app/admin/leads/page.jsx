"use client";

import useSWR from "swr";
import { useSession } from "next-auth/react";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function AdminLeadsPage() {
  const { data: session, status } = useSession();
  const { data, error, isLoading } = useSWR("/api/leads?page=1&pageSize=20", fetcher);

  if (status === "loading") return <p className="text-gray-300">Loading...</p>;
  if (!session) return <p className="text-red-400">Please sign in.</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Leads</h1>
      <p className="text-gray-400 text-sm">Inbox of contact submissions (stored in MongoDB).</p>
      {isLoading && <p className="text-gray-300 text-sm">Loading leads...</p>}
      {error && <p className="text-red-400 text-sm">Failed to load leads.</p>}
      <div className="space-y-3">
        {(data?.items || []).map((lead, idx) => (
          <div key={idx} className="rounded-xl border border-green-500/20 p-4 bg-green-500/5">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>{lead.email}</span>
              <span>{lead.createdAt ? new Date(lead.createdAt).toLocaleString() : ""}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-white font-semibold">{lead.name}</div>
              {lead.read !== undefined && (
                <span className={`text-xs px-2 py-1 rounded ${lead.read ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                  {lead.read ? 'Read' : 'New'}
                </span>
              )}
            </div>
            {lead.service && (
              <div className="text-green-400 text-sm mt-1 font-semibold">📦 Service: {lead.service}</div>
            )}
            <div className="text-gray-200 text-sm whitespace-pre-line mt-2">{lead.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
