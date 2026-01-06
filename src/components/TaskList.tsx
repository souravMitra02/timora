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

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`/api/tasks/list?userId=${userId}`);
        const data = await res.json();
        if (res.ok) {
          setTasks(data.tasks);
        }
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks(); 
  }, [userId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {tasks.map((task) => (
        <div key={task._id} className="p-4 border rounded shadow-md bg-white text-black">
          <h3 className="font-semibold">{task.title}</h3>
          <p>{task.description}</p>
          <p className="text-sm text-gray-600">
            {task.date} | {task.startTime} - {task.endTime} | Status: {task.status}
          </p>
        </div>
      ))}
    </div>
  );
}
