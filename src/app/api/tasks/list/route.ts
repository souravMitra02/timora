import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/db";
import Task from "@/models/Task";

export async function GET(req: NextRequest) {
  try {
     await client.connect();
    const db = client.db("timora");

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

