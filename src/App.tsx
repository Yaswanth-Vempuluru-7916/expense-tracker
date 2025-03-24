import { FormEvent, useState } from "react";
import { AppDispatch, RootState } from "./store/store";
import { useSelector } from "react-redux";
import { addExpense, removeExpense } from "./store/expenseSlice";
import { useDispatch } from "react-redux";

const App = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const expenses = useSelector((state: RootState) => state.expenses.expenses);
  const dispatch = useDispatch<AppDispatch>();

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (description && amount && category) {
      const newExpense = {
        id: Date.now(),
        description,
        amount: parseFloat(amount),
        category,
      };

      dispatch(addExpense(newExpense));
      // Clear form
      setDescription("");
      setAmount("");
      setCategory("");
    }
  };

  const handleRemove = (id: number) => {
    dispatch(removeExpense(id));
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Expense Tracker
      </h1>

      {/* Form to add expenses */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Description
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Amount
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.01"
              className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Category
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          Add Expense
        </button>
      </form>

      {/* Total and Expenses List */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Total Expenses: ${total.toFixed(2)}
        </h2>
        {expenses.length === 0 ? (
          <p className="text-gray-500">No expenses yet.</p>
        ) : (
          <ul className="space-y-3">
            {expenses.map((expense) => (
              <li
                key={expense.id}
                className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm"
              >
                <span>
                  {expense.description} - ${expense.amount.toFixed(2)} -{' '}
                  {expense.category}
                </span>
                <button
                  onClick={() => handleRemove(expense.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;