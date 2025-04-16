export default function Home() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">
        Personal Finance Visualizer
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        A simple tool to track your spending, set budgets, and visualize
        financial data.
      </p>
      <a
        href="/dashboard"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
      >
        Go to Dashboard
      </a>
    </div>
  );
}
