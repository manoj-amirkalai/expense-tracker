import connectMongoDB from "@/libs/mongodb";
import Budget from "@/models/budget";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { paidby, amount, paidfor, paidusing, datetime, category } =
    await request.json();
  try {
    await connectMongoDB();
    await Budget.create({
      paidfor: paidfor,
      amount: amount,
      paidby: paidby,
      paidusing: paidusing,
      datetime: datetime,
      category: category,
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
