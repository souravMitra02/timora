"use client";

import { useEffect, useState } from "react";

interface Task {
  _id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
}

interface TaskListProps {
  userId: string;
}

export default function TaskList({ userId }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`/api/tasks/list?userId=${userId}`);
      const data = await res.json();
      if (res.ok) setTasks(data.tasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const updateStatus = async (taskId: string, status: string) => {
    try {
      setLoading(true);
      await fetch("/api/tasks/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, status }),
      });

      fetchTasks();
    } catch (error) {
      console.error("Status update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [userId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="p-4 border rounded-xl shadow-md bg-white text-black"
        >
          <h3 className="font-semibold text-lg">{task.title}</h3>
          <p className="text-gray-700">{task.description}</p>

          <p className="text-sm text-gray-600 mt-1">
            {task.date} | {task.startTime} - {task.endTime}
          </p>

          <p className="mt-2 text-sm">
            Status:{" "}
            <span
              className={
                task.status === "completed"
                  ? "text-green-600 font-semibold"
                  : task.status === "missed"
                  ? "text-red-600 font-semibold"
                  : "text-yellow-600 font-semibold"
              }
            >
              {task.status}
            </span>
          </p>

          {task.status === "pending" && (
            <div className="flex gap-3 mt-3">
              <button
                disabled={loading}
                onClick={() => updateStatus(task._id, "completed")}
                className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
              >
                Complete
              </button>

              <button
                disabled={loading}
                onClick={() => updateStatus(task._id, "missed")}
                className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Missed
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
