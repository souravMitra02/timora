import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/db";
import Task from "@/models/Task";

export async function POST(req: NextRequest) {
  try {
    await client.connect();
    const db = client.db("timora");

    const { userId, title, description, date, startTime, endTime } =
      await req.json();

    if (!userId || !title || !date || !startTime || !endTime) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    const task = await Task.create({
      userId,
      title,
      description,
      date,
      startTime,
      endTime,
    });

    return NextResponse.json({ message: "Task created", task });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

