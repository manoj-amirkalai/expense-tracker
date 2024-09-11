import connectMongoDB from "@/libs/mongodb";
import Budget from "@/models/budget";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { id, paidby, amount, paidfor, paidusing, date, time, type } =
    await request.json();
  try {
    await connectMongoDB();
    await Budget.create({
      id: id,
      paidfor: paidfor,
      amount: amount,
      paidby: paidby,
      paidusing: paidusing,
      date: date,
      time: time,
      type: type,
    });

    return NextResponse.json({ message: "success" }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
export async function GET(request) {
  try {
    await connectMongoDB();
    const response = await Budget.find();

    return NextResponse.json({ response: response }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
