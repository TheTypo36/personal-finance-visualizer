// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Transaction } from "../models/Transaction"; // Adjust the import path as necessary
// export const TransactionList = () => {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const response = await axios.get("/api/get-transactions");
//         if (!response.data.success) {
//           throw new Error("Failed to fetch transactions");
//         }
//         console.log(response.data.transactions);
//         setTransactions(response.data.transactions);
//       } catch (error) {
//         console.error("Error fetching transactions:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransactions();
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>Transaction List</h1>
//       {transactions.length === 0 ? (
//         <p>No transactions found.</p>
//       ) : (
//         <ul>
//           {transactions.map((transaction) => (
//             <li key={transaction.id}>
//               {transaction.description} - ${transaction.amount} on{" "}
//               {transaction.date} - Category: {transaction.category}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Transaction = {
  _id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
};

export default function TransactionList({ refresh }: { refresh?: boolean }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await axios.get("/api/get-transactions");
      setTransactions(res.data.transactions);
    };
    fetchTransactions();
  }, [refresh]);

  return (
    <div className="mt-6 space-y-2 max-w-screen-lg mx-auto w-full p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul className="space-y-2 w-full">
          {transactions.map((txn) => (
            <li key={txn._id} className="p-3 border rounded bg-gray-50 w-full">
              <div className="flex justify-between items-center w-full">
                <div>
                  <div className="font-medium">{txn.description}</div>
                  <div className="text-sm text-gray-600 w-full">
                    {txn.category} | {new Date(txn.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="font-bold text-green-600">₹{txn.amount}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
