import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request) {
  let id = "";
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Access the ID from the decoded token
    id = decoded.id;
  } catch (error) {
    res.json({ success: false, message: "error" });
  }
  console.log(id);
  
  try {
    await connectMongoDB();
    const response = await User.findById({ _id: id });

    return NextResponse.json({ message: response }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
