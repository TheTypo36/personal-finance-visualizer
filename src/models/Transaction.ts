import mongoose, { Document, Schema } from "mongoose";

export interface Transaction extends Document {
  amount: number;
  date: string;
  description: string;
  category: string;
}
const transactionSchema: Schema<Transaction> = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "amount is required"],
    },
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    category: {
      type: String,
    },
  },
  { timestamps: true }
);

const TransactionModel =
  (mongoose.models.Transaction as mongoose.Model<Transaction>) ||
  mongoose.model<Transaction>("Transaction", transactionSchema);

export default TransactionModel;
