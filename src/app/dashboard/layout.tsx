import Link from "next/link";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      
      <aside className="w-64 bg-[#111827] p-6 hidden md:flex flex-col">
        <h2 className="text-2xl font-bold mb-8 text-yellow-400">Timora</h2>

        <nav className="flex flex-col gap-4 text-lg">
          <Link href="/dashboard" className="hover:text-yellow-400">
            Dashboard
          </Link>

          <Link href="/dashboard/tasks" className="hover:text-yellow-400">
            Tasks
          </Link>

          <Link href="/dashboard/profile" className="hover:text-yellow-400">
            Profile
          </Link>

          <button className="text-left hover:text-red-400 mt-6">
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
