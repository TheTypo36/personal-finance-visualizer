import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";

export default function Dashboard() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <TransactionForm />
      <TransactionList refresh={true} />
    </main>
  );
}
