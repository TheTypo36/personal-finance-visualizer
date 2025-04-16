"use client";

import { useState } from "react";
import axios from "axios";

const categories = [
  "Food",
  "Transport",
  "utilities",
  "Entertainmnet",
  "Health",
  "Other",
];

export default function TransactionForm() {
  const [formData, setFormData] = useState({
    amount: "",
    date: "",

    description: "",
    category: categories[0],
  });
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { amount, date, description, category } = formData;

    if (!amount || !date || !description) {
      return alert("missing required fields");
    }
    try {
      const response = await axios.post("/api/create-transaction", {
        amount: Number(amount),
        date,
        description,
        category,
      });

      console.log(response.data);
      alert("Transaction created successfully");
    } catch (error) {
      console.error("Error creating transaction:", error);
      alert("Error creating transaction");
    }
  };

  return (
    <div>
      <h1>Create Transaction</h1>
      <p>Fill in the form below to create a new transaction</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="amount"
          name="amount"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="date"
          name="date"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="description"
          name="description"
          onChange={handleChange}
        />
        <select name="category" id="category">
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
