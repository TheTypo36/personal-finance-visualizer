import { z } from "zod";

export const createTransactionSchema = z.object({
  amount: z.number().min(1, { message: "Amount must be greater than 0" }),
  category: z.enum([
    "Food",
    "Transport",
    "utilities",
    "Entertainmnet",
    "Health",
    "Other",
  ]),
  date: z
    .string()
    .refine((value) => !isNaN(Date.parse(value)), {
      message: "Invalid date format",
    }),
  description: z.string().min(1, { message: "Description is required" }),
});
