return (
  <div className="dashboard-container">

    <div className="dashboard-header">
      <h1>Expense Tracker</h1>

      <button onClick={logout}>
        Logout
      </button>
    </div>

    <div className="summary-card">
      <h2>Total Expenses</h2>
      <h1>₹{totalExpenses}</h1>
    </div>

    <form onSubmit={addExpense}>

      <h2>
        {editingId ? "Update Expense" : "Add Expense"}
      </h2>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button type="submit">
        {editingId ? "Update Expense" : "Add Expense"}
      </button>

    </form>

    <div className="expenses-list">

      {expenses.map((expense) => (
        <div className="expense-card" key={expense._id}>

          <h3>{expense.category}</h3>

          <p>
            <strong>Amount:</strong> ₹{expense.amount}
          </p>

          <p>
            <strong>Description:</strong> {expense.description}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {new Date(expense.date).toLocaleDateString()}
          </p>

          <div className="expense-actions">

            <button
              onClick={() => {
                setAmount(expense.amount);
                setCategory(expense.category);
                setDescription(expense.description);
                setDate(expense.date.split("T")[0]);
                setEditingId(expense._id);
              }}
            >
              Edit
            </button>

            <button
              onClick={() => deleteExpense(expense._id)}
            >
              Delete
            </button>

          </div>

        </div>
      ))}

    </div>

  </div>
);