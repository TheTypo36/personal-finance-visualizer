"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Transaction } from "../models/Transaction"; // Adjust the import path as necessary
export const TransactionList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("/api/get-transactions");
        if (!response.data.success) {
          throw new Error("Failed to fetch transactions");
        }
        console.log(response.data.transactions);
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Transaction List</h1>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              {transaction.description} - ${transaction.amount} on{" "}
              {transaction.date} - Category: {transaction.category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
