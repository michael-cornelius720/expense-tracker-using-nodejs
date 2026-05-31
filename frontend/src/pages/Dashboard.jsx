import { useEffect, useState } from "react";
import API from "../services/api";
function Dashboard() {
  const token = localStorage.getItem("token");
  const [expenses, setExpenses] = useState([]);
//fetch expense
  const fetchExpenses = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.get("/api/expenses", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setExpenses(response.data.expenses);

  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  fetchExpenses();
}, []);

  return (
    <div>
      <h1>Dashboard</h1>

      <p>Logged In Successfully</p>

      {
  expenses.map((expense) => (
    <div key={expense._id}>
      <h3>{expense.category}</h3>
      <p>{expense.amount}</p>
      <p>{expense.description}</p>
      <hr />
    </div>
  ))
}
    </div>
  );
}

export default Dashboard;