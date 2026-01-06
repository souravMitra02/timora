import React, { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
     
      <aside className="w-64 bg-[#111827] p-6 hidden md:flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-yellow-400">Timora</h2>
        <nav className="flex flex-col gap-3">
          <a href="#" className="hover:text-yellow-400">Dashboard</a>
          <a href="#" className="hover:text-yellow-400">Tasks</a>
          <a href="#" className="hover:text-yellow-400">Profile</a>
          <a href="#" className="hover:text-yellow-400">Logout</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">{children}</main>
    </div>
  );
}

