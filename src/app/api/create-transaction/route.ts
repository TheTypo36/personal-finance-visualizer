import dbConnect from "@/lib/dbConnect";

import TransactionModel from "@/models/Transaction";

export async function POST(_request: Request) {
  try {
    await dbConnect();

    const { amount, date, description, category } = await _request.json();
    if (!amount || !date || !description) {
      return new Response("missing required fields", { status: 400 });
    }

    const transaction = new TransactionModel({
      amount,
      date,
      description,
      category,
    });
    await transaction.save();
    return Response.json(
      {
        success: true,
        transaction,
        message: "successfully created transaction",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating transaction:", error);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
