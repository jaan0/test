"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/users", label: "Users" },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  return (
    <SessionProvider>
      <div className="min-h-screen bg-[#050807] text-white">
        <header className="border-b border-green-500/20 bg-[#0a0f0d]/80 backdrop-blur-sm sticky top-0 z-20">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="text-lg font-semibold">Admin</div>
            <nav className="flex gap-4 text-sm">
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded ${
                      active ? "bg-green-500/15 text-green-300" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
      </div>
    </SessionProvider>
  );
}
