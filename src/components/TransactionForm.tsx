// "use client";

// import { useState } from "react";
// import axios from "axios";

// const categories = [
//   "Food",
//   "Transport",
//   "utilities",
//   "Entertainmnet",
//   "Health",
//   "Other",
// ];

// export default function TransactionForm() {
//   const [formData, setFormData] = useState({
//     amount: "",
//     date: "",

//     description: "",
//     category: categories[0],
//   });
//   const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     e.preventDefault();
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const { amount, date, description, category } = formData;

//     if (!amount || !date || !description) {
//       return alert("missing required fields");
//     }
//     try {
//       const response = await axios.post("/api/create-transaction", {
//         amount: Number(amount),
//         date,
//         description,
//         category,
//       });

//       console.log(response.data);
//       alert("Transaction created successfully");
//     } catch (error) {
//       console.error("Error creating transaction:", error);
//       alert("Error creating transaction");
//     }
//   };

//   return (
//     <div>
//       <h1>Create Transaction</h1>
//       <p>Fill in the form below to create a new transaction</p>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="amount"
//           name="amount"
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           placeholder="date"
//           name="date"
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           placeholder="description"
//           name="description"
//           onChange={handleChange}
//         />
//         <select name="category" id="category">
//           {categories.map((category) => (
//             <option key={category} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import axios from "axios";

const categories = [
  "Food",
  "Transport",
  "Utilities",
  "Entertainment",
  "Health",
  "Other",
];

export default function TransactionForm({ onAdd }: { onAdd?: () => void }) {
  const [form, setForm] = useState({
    amount: "",
    date: "",
    description: "",
    category: "Other",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.amount || !form.date || !form.description)
      return alert("Please fill all fields");

    setLoading(true);
    try {
      await axios.post("/api/create-transaction", {
        ...form,
        amount: Number(form.amount),
        date: new Date(form.date),
      });
      if (onAdd) onAdd();
      setForm({ amount: "", date: "", description: "", category: "Other" });
    } catch (_err) {
      console.error("Error adding transaction:", _err);
      alert("Error adding transaction");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-screen-lg mx-auto p-4 bg-white rounded shadow"
    >
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4"
      >
        {loading ? "Saving..." : "Add Transaction"}
      </button>
    </form>
  );
}
