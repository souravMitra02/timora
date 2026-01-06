"use client";

import { useState } from "react";
import TaskForm from "@/components/forms/TaskForm";
import TaskList from "@/components/TaskList";

export default function DashboardPage() {
  const [refresh, setRefresh] = useState(false);

  // Replace with actual logged-in userId
  const userId = "USER_ID_HERE";

  return (
    <div className="p-8 bg-[#0f172a] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Welcome to Timora Dashboard</h1>

      <TaskForm userId={userId} onTaskCreated={() => setRefresh(!refresh)} />
      <TaskList key={refresh ? "refresh" : "default"} userId={userId} />
    </div>
  );
}
