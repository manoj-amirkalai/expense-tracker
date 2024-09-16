import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { id } = await request.json();
  try {
    await connectMongoDB();
    const response = await User.findById({ _id: id });

    return NextResponse.json({ message: response }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
