"use server";

import { connectMongoDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const users = await User.find({});
    return NextResponse.json(users);
  } catch (error: unknown) {
    return NextResponse.json(
      { message: `Error fetching users: ${error}` },
      { status: 500 }
    );
  }
}
