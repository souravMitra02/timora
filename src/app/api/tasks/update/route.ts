import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/db";
import Task from "@/models/Task";

export async function PATCH(req: NextRequest) {
  try {
   await client.connect();
    const db = client.db("timora");

    const { taskId, status } = await req.json();

    const task = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );

    return NextResponse.json({ message: "Task updated", task });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

