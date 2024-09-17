import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
export async function POST(request) {
  const { email, password, name } = await request.json();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    await connectMongoDB();
    const usersignup = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "success", token: createToken(usersignup._id) },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function PUT(request) {
  const { email, password } = await request.json();

  try {
    await connectMongoDB();
    const response = await User.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, response.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Password Wrong" }, { status: 404 });
    }
    if (isMatch) {
      return NextResponse.json(
        { message: "Logged In", token: createToken(response._id) },
        { status: 200 }
      );
    }

    return NextResponse.json({ message: response }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function GET(request) {
  let id = "";
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Access the ID from the decoded token
    id = decoded.id;
  } catch (error) {
    res.json({ success: false, message: "error" });
  }
  try {
    await connectMongoDB();
    const response = await User.findById({ _id: id });

    return NextResponse.json({ message: response }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
