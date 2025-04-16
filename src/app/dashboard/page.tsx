"use client";
import { useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyBarChart from "@/components/MonthlyBarChart";
export default function Dashboard() {
  const [refresh, setRefresh] = useState(false);
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <TransactionForm onAdd={() => setRefresh(!refresh)} />
      <TransactionList refresh={true} />
      <MonthlyBarChart />
      <div className="mt-6 space-x-4"></div>
    </main>
  );
}
