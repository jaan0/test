"use client";

import React, { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminHome() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  const userRole = session?.user?.role || "guest";

  if (status === "loading") {
    return <div className="text-gray-300">Loading...</div>;
  }

  if (!session) {
    return <div className="text-gray-300">Redirecting to login...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">Signed in as</p>
          <p className="text-lg font-semibold">{session.user?.email}</p>
          <p className="text-sm text-green-300">Role: {userRole}</p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/admin" })}
          className="px-4 py-2 rounded bg-green-500/10 border border-green-500/30 text-green-200 hover:bg-green-500/20"
        >
          Sign out
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Services" href="/admin/services" />
        <Card title="Content" href="/admin/content" />
        <Card title="Leads" href="/admin/leads" />
        <Card title="Users" href="/admin/users" />
      </div>
    </div>
  );
}

function Card({ title, href }) {
  return (
    <a
      href={href}
      className="block rounded-2xl border border-green-500/20 bg-green-500/5 p-6 hover:border-green-500/40 transition"
    >
      <div className="text-xl font-semibold mb-2">{title}</div>
      <div className="text-sm text-gray-400">Manage {title.toLowerCase()}.</div>
    </a>
  );
}

