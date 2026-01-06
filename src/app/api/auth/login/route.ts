import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {User} from "@/models/User";
import client  from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    await client.connect();
    const db = client.db("timora");

    const { email, password } = await req.json();

    // User check
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
    }

    // Password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
    }

    // Success
    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        occupation: user.occupation,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

