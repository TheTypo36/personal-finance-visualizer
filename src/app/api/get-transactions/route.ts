import dbConnect from "@/lib/dbConnect";
import TransactionModel from "@/models/Transaction";

export async function GET(_request: Request) {
  try {
    await dbConnect();
    const body = await _request.json();

    console.log(body, "body");
    const transactions = await TransactionModel.find({}).sort({
      createdAt: -1,
    });
    return Response.json(
      {
        success: true,
        transactions,
        message: "successfully fetched transactions",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
