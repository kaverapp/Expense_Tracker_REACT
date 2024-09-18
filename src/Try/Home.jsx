import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./try.css";
import { Line,Bar } from "react-chartjs-2";

import { Chart as ChartJS, CategoryScale, LinearScale,BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the chart components
ChartJS.register(CategoryScale, LinearScale, PointElement,BarElement, LineElement, Title, Tooltip, Legend);



export const Home = () => {
  const [store, setStore] = useState([]);
  const [takeinp, setTakeinp] = useState({
    description: "",
    amount: 0,
    category: "",
    type: "",
    id: "",
    date: "",
  });

  // Load data from localStorage on initial render
  useEffect(() => {
    let storage = JSON.parse(localStorage.getItem("data"));
    if (storage) {
      setStore(storage);
    }
  }, []);

  // Save data to localStorage whenever store changes
  useEffect(() => {
    if (store.length > 0) {
      localStorage.setItem("data", JSON.stringify(store));
    }
  }, [store]);

  const onChangehandler = (e) => {
    let { name, value } = e.target;
    setTakeinp((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setStore((prev) => [
      ...prev,
      { ...takeinp, id: uuidv4(), date: new Date().toLocaleDateString() }
    ]);
    setTakeinp({
      description: "",
      amount: 0,
      category: "",
      type: "",
      id: "",
      date: ""
    });
  };

  const deleteHandler = (transactionId) => {
    let newStore = store.filter((transaction) => transaction.id !== transactionId);
    setStore(newStore);
  };

  const calculateBalance = () => {
    let income = 0;
    let expense = 0;
    store.forEach((transaction) => {
      if (transaction.type === "income") {
        income += parseFloat(transaction.amount);
      } else {
        expense += parseFloat(transaction.amount);
      }
    });
    return { income, expense, balance: income - expense };
  };

  const { income, expense, balance } = calculateBalance();


  const editHandler=(transaction)=>{
    setTakeinp(transaction);
    deleteHandler(transaction.id);
  }


  // Prepare chart data for the Line chart
  const chartData = {
    labels: store.map((transaction) => transaction.date), // Using dates as labels
    datasets: [
      {
        label: "Transactions",
        data: store.map((transaction) => transaction.amount), // Amount as the dataset
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Transaction History',
      },
    },
  };


  return (
    <>
      <div className="dashboard">
        <section className="header">
          <div className="header-container">
            <h1 className="income">INCOME: {income}</h1>
            <h1 className="expenses">EXPENSES: {expense}</h1>
            <h1 className="balance">BALANCE: {balance}</h1>
          </div>
        </section>
        <main>
          <div className="transaction-form">
            <div className="form-container">
              <h2>Add New Transaction</h2>
              <form onSubmit={submitHandler}>
                <input
                  type="text"
                  placeholder="Enter the description"
                  name="description"
                  value={takeinp.description}
                  onChange={onChangehandler}
                />
                <input
                  type="number"
                  placeholder="Amount"
                  name="amount"
                  value={takeinp.amount}
                  onChange={onChangehandler}
                />
                <input
                  type="text"
                  placeholder="Enter the category"
                  name="category"
                  value={takeinp.category}
                  onChange={onChangehandler}
                />
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="type"
                      value="income"
                      checked={takeinp.type === "income"}
                      onChange={onChangehandler}
                    />
                    Income
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="type"
                      value="expense"
                      checked={takeinp.type === "expense"}
                      onChange={onChangehandler}
                    />
                    Expense
                  </label>
                </div>
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
          <div className="transaction-history">
            <h2>Transaction History</h2>
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {store.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.description}</td>
                    <td>{Math.abs(transaction.amount)}</td>
                    <td>{transaction.category}</td>
                    <td>{transaction.type}</td>
                    <td>{transaction.date}</td>
                    <td>
                      <button className="edit"
                      onClick={()=>editHandler(transaction)}
                      >Edit</button>
                      <button
                        className="delete"
                        onClick={() => deleteHandler(transaction.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Bar data={chartData} options={chartOptions} />

        </main>
      </div>

    </>
  );
};
