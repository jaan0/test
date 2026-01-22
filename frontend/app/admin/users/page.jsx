"use client";

import { useSession } from "next-auth/react";

export default function AdminUsersPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p className="text-gray-300">Loading...</p>;
  if (!session) return <p className="text-red-400">Please sign in.</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Users</h1>
      <p className="text-gray-400 text-sm">
        User and role management UI will be added. Current auth uses credentials with roles stored in MongoDB.
      </p>
    </div>
  );
}
