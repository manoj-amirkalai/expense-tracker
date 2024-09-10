"use client";
import styles from "./page.module.css";
import { transactions } from "./data";
import { FaWallet } from "react-icons/fa6";
import { BsGraphDownArrow } from "react-icons/bs";
import { BsGraphUpArrow } from "react-icons/bs";
import ApexCharts from "react-apexcharts";
import { useEffect, useState } from "react";

export default function Home() {
  // console.log("height:", window.innerHeight);
  // console.log("width:", window.innerWidth);
  const [getyear, setgetyear] = useState(2024);
  const [year, setYear] = useState(2023);
  const [janExp, setJanExp] = useState(0);
  const [febEXP, setfebEXP] = useState(0);
  const [marExp, setmarExp] = useState(0);
  const [aprExp, setaprExp] = useState(0);
  const [mayExp, setmayExp] = useState(0);
  const [junExp, setjunExp] = useState(0);
  const [julExp, setjulExp] = useState(0);
  const [augExp, setaugExp] = useState(0);
  const [sepExp, setsepExp] = useState(0);
  const [octExp, setoctExp] = useState(0);
  const [novExp, setnovExp] = useState(0);
  const [decExp, setdecExp] = useState(0);
  const [janInc, setjanInc] = useState(0);
  const [febInc, setfebInc] = useState(0);
  const [marInc, setmarInc] = useState(0);
  const [aprInc, setaprInc] = useState(0);
  const [mayInc, setmayInc] = useState(0);
  const [junInc, setjunInc] = useState(0);
  const [julInc, setjulInc] = useState(0);
  const [augInc, setaugInc] = useState(0);
  const [sepInc, setsepInc] = useState(0);
  const [octInc, setoctInc] = useState(0);
  const [novInc, setnovInc] = useState(0);
  const [decInc, setdecInc] = useState(0);

  const [transactionsFiltered, setTransactionsFiltered] = useState([
    ...transactions,
  ]);

  useEffect(() => {
    const filteredyear = transactionsFiltered.filter((transaction) => {
      const yearFilter = new Date(transaction.date).getFullYear();

      return yearFilter === year;
    });
    setTransactionsFiltered(filteredyear);
  }, [year]);

  const calculateJan = () => {
    const income = transactionsFiltered
      .filter((tx) => tx.type === "Income")
      .filter((tx) => {
        const month = new Date(tx.date).getMonth() + 1;
        return month === 1;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setjanInc(income);

    const expense = transactionsFiltered
      .filter((tx) => tx.type === "Expense")
      .filter((tx) => {
        const month = new Date(tx.date).getMonth() + 1;
        return month === 1;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setJanExp(expense);
  };

  const calculateFeb = () => {
    const income = transactionsFiltered
      .filter((tx) => tx.type === "Income")
      .filter((tx) => {
        const month = new Date(tx.date).getMonth() + 1;
        return month === 2;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setfebInc(income);

    const expense = transactionsFiltered
      .filter((tx) => tx.type === "Expense")
      .filter((tx) => {
        const month = new Date(tx.date).getMonth() + 1;
        return month === 2;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setfebEXP(expense);
  };

  const calculatemar = () => {
    const income = transactionsFiltered
      .filter((tx) => tx.type === "Income")
      .filter((tx) => {
        const month = new Date(tx.date).getMonth() + 1;
        return month === 3;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setmarInc(income);

    const expense = transactionsFiltered
      .filter((tx) => tx.type === "Expense")
      .filter((tx) => {
        const month = new Date(tx.date).getMonth() + 1;
        return month === 3;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setmarExp(expense);
  };

  const calculateapr = () => {
    const income = transactionsFiltered
      .filter((tx) => tx.type === "Income")
      .filter((tx) => {
        const month = new Date(tx.date).getMonth() + 1;
        return month === 4;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setaprInc(income);

    const expense = transactionsFiltered
      .filter((tx) => tx.type === "Expense")
      .filter((tx) => {
        const month = new Date(tx.date).getMonth() + 1;
        return month === 4;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setaprExp(expense);
  };
  const calculatemay = () => {
    const income = transactionsFiltered
      .filter((tx) => tx.type === "Income")
      .filter((tx) => {
        const month = new Date(tx.date).getMonth() + 1;
        return month === 5;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setmayInc(income);

    const expense = transactionsFiltered
      .filter((tx) => tx.type === "Expense")
      .filter((tx) => {
        const month = new Date(tx.date).getMonth() + 1;
        return month === 5;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setmayExp(expense);
  };
  const calculatejun = () => {
    const income = transactionsFiltered
      .filter((tx) => tx.type === "Income")
      .filter((tx) => {
        const month = new Date(tx.date).getMonth() + 1;
        return month === 6;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setjunInc(income);

    const expense = transactionsFiltered
      .filter((tx) => tx.type === "Expense")
      .filter((tx) => {
        const month = new Date(tx.date).getMonth() + 1;
        return month === 6;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setjunExp(expense);
  };
  const calculatejul = () => {
    const income = transactionsFiltered
      .filter((tx) => tx.type === "Income")
      .filter((tx) => {
        const month = new Date(tx.date).getMonth() + 1;
        return month === 7;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setjulInc(income);

    const expense = transactionsFiltered
      .filter((tx) => tx.type === "Expense")
      .filter((tx) => {
        const month = new Date(tx.date).getMonth() + 1;
        return month === 7;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setjulExp(expense);
  };
  const calculateaug = () => {
    const income = transactionsFiltered
      .filter((tx) => tx.type === "Income")
      .filter((tx) => {
        const month = new Date(tx.date).getMonth() + 1;
        return month === 8;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setaugInc(income);

    const expense = transactionsFiltered
      .filter((tx) => tx.type === "Expense")
      .filter((tx) => {
        const month = new Date(tx.date).getMonth() + 1;
        return month === 8;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setaugExp(expense);
  };
  const calculatesep = () => {
    const income = transactionsFiltered
      .filter((tx) => tx.type === "Income")
      .filter((tx) => {
        const month = new Date(tx.date).getMonth() + 1;
        return month === 9;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setsepInc(income);

    const expense = transactionsFiltered
      .filter((tx) => tx.type === "Expense")
      .filter((tx) => {
        const month = new Date(tx.date).getMonth() + 1;
        return month === 9;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setsepExp(expense);
  };
  const calculateoct = () => {
    const income = transactionsFiltered
      .filter((tx) => tx.type === "Income")
      .filter((tx) => {
        const month = new Date(tx.date).getMonth() + 1;
        return month === 10;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setoctInc(income);

    const expense = transactionsFiltered
      .filter((tx) => tx.type === "Expense")
      .filter((tx) => {
        const month = new Date(tx.date).getMonth() + 1;
        return month === 10;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setoctExp(expense);
  };
  const calculatenov = () => {
    const income = transactionsFiltered
      .filter((tx) => tx.type === "Income")
      .filter((tx) => {
        const month = new Date(tx.date).getMonth() + 1;
        return month === 11;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setnovInc(income);

    const expense = transactionsFiltered
      .filter((tx) => tx.type === "Expense")
      .filter((tx) => {
        const month = new Date(tx.date).getMonth() + 1;
        return month === 11;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setnovExp(expense);
  };
  const calculatedec = () => {
    const income = transactionsFiltered
      .filter((tx) => tx.type === "Income")
      .filter((tx) => {
        const month = new Date(tx.date).getMonth() + 1;
        return month === 12;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setdecInc(income);

    const expense = transactionsFiltered
      .filter((tx) => tx.type === "Expense")
      .filter((tx) => {
        const month = new Date(tx.date).getMonth() + 1;
        return month === 12;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setdecExp(expense);
  };

  useEffect(() => {
    calculateJan();
    calculateFeb();
    calculatemar();
    calculateapr();
    calculatemay();
    calculatejun();
    calculatejul();
    calculateaug();
    calculatesep();
    calculateoct();
    calculatenov();
    calculatedec();
  }, [transactionsFiltered]);
  const data = {
    series: [
      {
        name: "Expense",
        data: [
          janExp / 1000,
          febEXP / 1000,
          marExp / 1000,
          aprExp / 1000,
          mayExp / 1000,
          junExp / 1000,
          julExp / 1000,
          augExp / 1000,
          sepExp / 1000,
          octExp / 1000,
          novExp / 1000,
          decExp / 1000,
        ],
      },
      {
        name: "Income",
        data: [
          janInc / 1000,
          febInc / 1000,
          marInc / 1000,
          aprInc / 1000,
          mayInc / 1000,
          junInc / 1000,
          julInc / 1000,
          augInc / 1000,
          sepInc / 1000,
          octInc / 1000,
          novInc / 1000,
          decInc / 1000,
        ],
      },
    ],
    options: {
      chart: {
        type: "bar",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "85%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        colors: ["#9A4BFF", "#FF489B", "#FF489B", "#FF489B"],
      },
      yaxis: {
        title: {
          text: "",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "Rs." + val + "k";
          },
        },
      },
    },
  };
  const expenseTotal = transactionsFiltered
    .filter(
      (transactionsFiltered) =>
        transactionsFiltered.type.toLowerCase() === "expense"
    )
    .map((transactionsFiltered) => parseFloat(transactionsFiltered.amount))
    .reduce((total, amount) => total + amount, 0);

  const incomeTotal = transactionsFiltered
    .filter(
      (transactionsFiltered) =>
        transactionsFiltered.type.toLowerCase() === "income"
    )
    .map((transactionsFiltered) => parseFloat(transactionsFiltered.amount))
    .reduce((total, amount) => total + amount, 0);
  const balance = incomeTotal - expenseTotal;

  return (
    <div className={styles.page}>
      <div className={styles.dashboard}>
        <div className={styles.dashboard_chart}>
          <ApexCharts
            className={styles.chart}
            options={data.options}
            series={data.series}
            type="bar"
            height={800}
          />
        </div>
        <div className={styles.dashboard_expinc}>
        <input type="number" onChange={(e)=>setgetyear(e.target.value)} />
        <button onClick={()=>{setYear(parseFloat(getyear))}}>submit</button>
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
