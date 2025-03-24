import { FormEvent, useState } from "react";
import { AppDispatch, RootState } from "./store/store";
import { useSelector } from "react-redux";
import { addExpense, editExpense, removeExpense } from "./store/expenseSlice";
import { useDispatch } from "react-redux";
import "./App.css"

const App = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null);

  // Filter state
  const [filterCategory, setFilterCategory] = useState('All');

  const expenses = useSelector((state: RootState) => state.expenses.expenses);
  const dispatch = useDispatch<AppDispatch>();

  const categories = ["Food","Transport","Entertrainment","Bills","Other"]

  // Calculate total (filtered expenses)
  const filteredExpenses =
    filterCategory === 'All'
      ? expenses
      : expenses.filter((exp) => exp.category === filterCategory);
  const total = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const amountNum = parseFloat(amount);
    if(!description.trim()){
      setError('Description is required.');
      return;
    }

    if (!amount || amountNum <= 0) {
      setError('Amount must be a positive number.');
      return;
    }

    if (!category) {
      setError('Please select a category.');
      return;
    }

    if (!date) {
      setError('Please select a date.');
      return;
    }
    
      const expense = {
        id: editingId ||Date.now(),
        description : description.trim(),
        amount: amountNum,
        category,
        date
      };

      if(editingId){
        dispatch(editExpense(expense));
        setEditingId(null); // Exit edit mode
      }else{
        dispatch(addExpense(expense));
      }

      // Clear form
      setDescription("");
      setAmount("");
      setCategory("");
      setDate('')
    
  };

  const handleEdit = (expense: {
    id: number;
    description: string;
    amount: number;
    category: string;
    date: string;
  }) => {
    setEditingId(expense.id);
    setDescription(expense.description);
    setAmount(expense.amount.toString());
    setCategory(expense.category);
    setDate(expense.date);
  };

  const handleRemove = (id: number) => {
    dispatch(removeExpense(id));
    if (editingId === id) {
      setEditingId(null); // Exit edit mode if removing edited expense
      setDescription('');
      setAmount('');
      setCategory('');
      setDate('');
    }
  };
  return (
    <div className="expense-tracker-container">
      <div className="expense-tracker-card">
        <h1 className="expense-tracker-title">Expense Tracker</h1>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="expense-form">
          <div className="form-group">
            <label className="form-label">
              Description
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-input"
                placeholder="What did you spend on?"
              />
            </label>
          </div>
          <div className="form-group">
            <label className="form-label">
              Amount
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="0.01"
                className="form-input"
                placeholder="0.00"
              />
            </label>
          </div>
          <div className="form-group">
            <label className="form-label">
              Category
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-select"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-group">
            <label className="form-label">
              Date
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="form-input date-input"
              />
            </label>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">
            {editingId ? 'Update Expense' : 'Add Expense'}
          </button>
        </form>

        {/* Filter and Total */}
        <div className="filter-container">
          <label className="filter-label">
            Filter by Category
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="filter-select"
            >
              <option value="All">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </label>
          <h2 className="expenses-total">
            Total Expenses: <span className="total-amount">${total.toFixed(2)}</span>
          </h2>
        </div>

        {/* Expenses List */}
        <div className="expenses-container">
          {filteredExpenses.length === 0 ? (
            <p className="no-expenses">No expenses yet.</p>
          ) : (
            <ul className="expenses-list">
              {filteredExpenses.map((expense) => (
                <li key={expense.id} className="expense-item">
                  <div className="expense-details">
                    <span className="expense-description">{expense.description}</span>
                    <div className="expense-meta">
                      <span className="expense-amount">${expense.amount.toFixed(2)}</span>
                      <span className="expense-category">{expense.category}</span>
                      <span className="expense-date">{expense.date}</span>
                    </div>
                  </div>
                  <div className="action-buttons">
                    <button onClick={() => handleEdit(expense)} className="edit-button">Edit</button>
                    <button onClick={() => handleRemove(expense.id)} className="remove-button">Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
export default App;