import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {User} from "@/models/User";
import client  from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
      await client.connect();
    const db = client.db("timora");

    const { name, email, password, age, occupation } = await req.json();


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      age,
      occupation,
    });

    return NextResponse.json({ message: "User registered successfully", userId: user._id });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong", err: error }, { status: 500 });
  }
}
