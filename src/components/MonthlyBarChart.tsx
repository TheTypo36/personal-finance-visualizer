"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Transaction = {
  amount: number;
  date: string;
};

export default function MonthlyBarChart() {
  const [monthlyData, setMonthlyData] = useState<
    { month: string; total: number }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/get-transactions");
      const txns: Transaction[] = res.data.transactions;

      // Group by month
      const grouped: Record<string, number> = {};
      txns.forEach((txn) => {
        const date = new Date(txn.date);
        const month = `${date.toLocaleString("default", {
          month: "short",
        })} ${date.getFullYear()}`;
        grouped[month] = (grouped[month] || 0) + txn.amount;
      });

      // Convert to array & sort by date
      const sorted = Object.entries(grouped).map(([month, total]) => ({
        month,
        total,
      }));
      sorted.sort(
        (a, b) => new Date(a.month).getTime() - new Date(b.month).getTime()
      );

      setMonthlyData(sorted);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow mt-8 w-full max-w-screen-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
