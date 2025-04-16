import dbConnect from "@/lib/dbConnect";
import TransactionModel from "@/models/Transaction";

export async function DELETE(request: Request) {
  try {
    await dbConnect();

    const { id } = await request.json();

    if (!id) {
      return new Response("Missing required fields", { status: 400 });
    }

    const transaction = await TransactionModel.findByIdAndDelete(id);
    if (!transaction) {
      return new Response("Transaction not found", { status: 404 });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Successfully deleted transaction",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal Server Error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
