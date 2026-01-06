"use client";

import { useState } from "react";

interface TaskFormProps {
  userId: string;
  onTaskCreated?: () => void;
}

export default function TaskForm({ userId, onTaskCreated }: TaskFormProps) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/tasks/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, userId }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Task created successfully!");
      setForm({ title: "", description: "", date: "", startTime: "", endTime: "" });
      if (onTaskCreated) onTaskCreated();
    } else {
      alert(data.error || "Failed to create task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 border rounded-lg bg-white shadow-md text-black">
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required className="p-2 border rounded"/>
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="p-2 border rounded"/>
      <input type="date" name="date" value={form.date} onChange={handleChange} required className="p-2 border rounded"/>
      <input type="time" name="startTime" value={form.startTime} onChange={handleChange} required className="p-2 border rounded"/>
      <input type="time" name="endTime" value={form.endTime} onChange={handleChange} required className="p-2 border rounded"/>
      <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded font-semibold">Create Task</button>
    </form>
  );
}
