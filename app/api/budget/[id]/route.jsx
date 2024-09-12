import connectMongoDB from "@/libs/mongodb";
import Budget from "@/models/budget";
import { NextResponse } from "next/server";
export async function GET(request, { params }) {
  const { id } = params;
  console.log(id);
  connectMongoDB();
  try {
    await connectMongoDB();
    const response = await Budget.findById(id);

    return NextResponse.json({ response: response }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { paidby, amount, paidfor, paidusing, datetime, category } =
    await request.json();
  const { id } = params;
  console.log(id);
  connectMongoDB();
  try {
    await connectMongoDB();
    const response = await Budget.findByIdAndUpdate(
      { _id: id },
      {
        paidfor: paidfor,
        amount: amount,
        paidby: paidby,
        paidusing: paidusing,
        datetime: datetime,
        category: category,
      }
    );

    return NextResponse.json({ response: response }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
