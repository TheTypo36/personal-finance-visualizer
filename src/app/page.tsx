import TransactionForm from "@/components/TransactionForm";
import { TransactionList } from "@/components/TransactionList";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <p className="text-2xl">Welcome to the Expense Tracker App</p>
      <Image
        src="/images/expense-tracker.png"
        alt="Expense Tracker"
        width={500}
        height={500}
      />
      <p className="text-xl">Track your expenses easily!</p>
      <p className="text-xl">Get started by creating a transaction</p>
      <TransactionForm />
      <p className="text-xl">View your transactions</p>
      <TransactionList />
    </div>
  );
}
