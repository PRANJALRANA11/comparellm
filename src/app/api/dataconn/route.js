import { NextResponse } from "next/server";
import connectDB from "../lib/connectdb";
import User from "../models/user";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { email } = body;

    const existingUser = await User.findOne({ email });

    let saved;
    if (!existingUser) {
      const newUser = new User({ email });
      saved = await newUser.save();
    } else {
      saved = existingUser;
    }

    return NextResponse.json(saved);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
