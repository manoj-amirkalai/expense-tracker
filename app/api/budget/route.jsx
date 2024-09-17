import connectMongoDB from "@/libs/mongodb";
import Budget from "@/models/budget";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { paidby, amount, paidfor, paidusing, datetime, category } =
    await request.json();
  let id = "";

  const token = request.headers.get("Authorization")?.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Access the ID from the decoded token
    id = decoded.id;
    console.log(id);
  } catch (error) {
    res.json({ success: false, message: "error" });
  }
  try {
    await connectMongoDB();
    const response = await Budget.create({
      paidfor: paidfor,
      amount: amount,
      paidby: paidby,
      paidusing: paidusing,
      datetime: datetime,
      category: category,
      userid: id,
    });
    console.log(response);

    return NextResponse.json({ message: "success" }, { status: 201 });
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
    console.log(id);
  } catch (error) {
    res.json({ success: false, message: "error" });
  }

  try {
    await connectMongoDB();
    const response = await Budget.find({ userid: id });

    console.log(response);

    return NextResponse.json({ response: response }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
export async function DELETE(request) {
  const { id } = await request.json();
  try {
    await connectMongoDB();
    const response = await Budget.findByIdAndDelete(id);

    return NextResponse.json({ response: "Deleted" }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
