import dbConnect from "@/lib/dbConnect";
import TransactionModel from "@/models/Transaction";

export async function PUT(request: Request) {
  try {
    await dbConnect();

    const { id, amount, date, description, category } = await request.json();
    if (!id) {
      return new Response("missing required fields", { status: 400 });
    }
    if (!amount && !date && !description && !category) {
      return new Response("missing required fields", { status: 400 });
    }

    const transaction = await TransactionModel.findByIdAndUpdate(
      id,
      { amount, date, description, category },
      { new: true }
    );
    if (!transaction) {
      return new Response("Transaction not found", { status: 404 });
    }

    return Response.json(
      {
        success: true,
        transaction,
        message: "successfully updated transaction",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating transaction:", error);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
