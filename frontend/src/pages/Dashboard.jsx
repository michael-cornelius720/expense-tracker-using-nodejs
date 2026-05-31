import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [date, setDate] = useState("");

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get("/api/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(response.data.expenses);
    } catch (err) {
      console.log(err);
    }
  };

  const addExpense = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const payload = { amount, category, description, date };

      if (editingId) {
        await API.put(`/api/expenses/${editingId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await API.post("/api/expenses", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      fetchExpenses();
      setAmount("");
      setCategory("");
      setDescription("");
      setDate("");
      setEditingId(null);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteExpense = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchExpenses();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="dashboard-container">

      {/* ── Header ── */}
      <div className="dashboard-header">
        <h1>Expense Tracker</h1>
        <button onClick={logout}>Logout</button>
      </div>

      {/* ── Summary ── */}
      <div className="summary-card">
        <h2>Total Expenses</h2>
        <h1>
          <span className="currency">₹</span>
          {totalExpenses.toLocaleString("en-IN")}
        </h1>
      </div>

      {/* ── Add / Edit Form ── */}
      <form onSubmit={addExpense}>
        <input
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          className="form-full"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="form-full"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit" className="form-full">
          {editingId ? "Update Expense" : "Add Expense"}
        </button>
      </form>

      {/* ── Expense List ── */}
      <p className="section-label">
        {expenses.length > 0 ? `${expenses.length} transaction${expenses.length !== 1 ? "s" : ""}` : ""}
      </p>

      {expenses.length === 0 ? (
        <div className="empty-state">
          <p>No expenses yet. Add your first one above.</p>
        </div>
      ) : (
        expenses.map((expense) => (
          <div className="expense-card" key={expense._id}>
            <h3>{expense.category}</h3>
            <p className="expense-amount">₹{Number(expense.amount).toLocaleString("en-IN")}</p>

            <div className="expense-meta">
              <span>{expense.description || "—"}</span>
              <span className="dot" />
              <span>{new Date(expense.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
            </div>

            <div className="expense-actions">
              <button
                className="btn-edit"
                onClick={() => {
                  setAmount(expense.amount);
                  setCategory(expense.category);
                  setDescription(expense.description);
                  setDate(expense.date.split("T")[0]);
                  setEditingId(expense._id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Edit
              </button>
              <button
                className="btn-delete"
                onClick={() => deleteExpense(expense._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;