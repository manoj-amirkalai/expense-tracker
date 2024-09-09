"use client";
import Navbar from "./Components/Navbar/Navbar";
import styles from "./page.module.css";
import { transactions } from "./data";
import { FaWallet } from "react-icons/fa6";
import { BsGraphDownArrow } from "react-icons/bs";
import { BsGraphUpArrow } from "react-icons/bs";

export default function Home() {
  // console.log("height:", window.innerHeight);
  // console.log("width:", window.innerWidth);
  const expenseTotal = transactions
    .filter((transaction) => transaction.type.toLowerCase() === "expense")
    .map((transaction) => parseFloat(transaction.amount))
    .reduce((total, amount) => total + amount, 0);

  const incomeTotal = transactions
    .filter((transaction) => transaction.type.toLowerCase() === "income")
    .map((transaction) => parseFloat(transaction.amount))
    .reduce((total, amount) => total + amount, 0);
  const balance = incomeTotal - expenseTotal;
  return (
    <div className={styles.page}>
      <div className={styles.dashboard}>
        <div className={styles.dashboard_chart}></div>
        <div className={styles.dashboard_expinc}>
          <div className={styles.dashboard_balance}>
            <span>
              <FaWallet />
            </span>{" "}
            <span>{balance}</span>
          </div>
          <div className={styles.dashboard_income}>
            <span>
              <BsGraphUpArrow />
            </span>{" "}
            <span>{incomeTotal}</span>
          </div>
          <div className={styles.dashboard_expense}>
            <span>
              <BsGraphDownArrow />{" "}
            </span>
            <span>{expenseTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
