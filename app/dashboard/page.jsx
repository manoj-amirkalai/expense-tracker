"use client";
import styles from "./page.module.css";
import { FaWallet } from "react-icons/fa6";
import { BsGraphDownArrow } from "react-icons/bs";
import { BsGraphUpArrow } from "react-icons/bs";
// import ApexCharts from "react-apexcharts";

import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useEffect, useState } from "react";
import { Input, message } from "antd";
import axios from "axios";
import Navbar from "../Components/Navbar/Navbar";
import { useRouter } from "next/navigation";
const { Search } = Input;
import React from "react";
import { Provider, useSelector } from "react-redux";
import store from "../Components/store/store";
import CountUp from "react-countup";
const Dashboard = () => {
  const route = useRouter();

  const tokens = useSelector((state) => state.data.token);
  const fetcheddata = useSelector((state) => state.data.fetcheddata);

  const [token, settoken] = useState(tokens);
  useEffect(() => {
    if (!token) {
      route.push("/");
      message.info("Please Login");
    }
  }, [token]);

  const [year, setYear] = useState(2024);
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
  const [transactions, settransactions] = useState([]);

  useEffect(() => {
    if (token) {
      settransactions([...fetcheddata]);
    }
  }, []);

  const [transactionsFiltered, setTransactionsFiltered] = useState([]);

  useEffect(() => {
    if (transactions) {
      const filteredyear = transactions.filter((transaction) => {
        const yearFilter = new Date(transaction.datetime).getFullYear();
        return yearFilter === year;
      });
      setTransactionsFiltered(filteredyear);
    }
  }, [year, transactions]);

  const calculateJan = () => {
    const income = transactionsFiltered
      .filter((tx) => tx.category === "Income")
      .filter((tx) => {
        const month = new Date(tx.datetime).getMonth() + 1;
        return month === 1;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setjanInc(income);

    const expense = transactionsFiltered
      .filter((tx) => tx.category === "Expense")
      .filter((tx) => {
        const month = new Date(tx.datetime).getMonth() + 1;
        return month === 1;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setJanExp(expense);
  };

  const calculateFeb = () => {
    const income = transactionsFiltered
      .filter((tx) => tx.category === "Income")
      .filter((tx) => {
        const month = new Date(tx.datetime).getMonth() + 1;
        return month === 2;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setfebInc(income);

    const expense = transactionsFiltered
      .filter((tx) => tx.category === "Expense")
      .filter((tx) => {
        const month = new Date(tx.datetime).getMonth() + 1;
        return month === 2;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setfebEXP(expense);
  };

  const calculatemar = () => {
    const income = transactionsFiltered
      .filter((tx) => tx.category === "Income")
      .filter((tx) => {
        const month = new Date(tx.datetime).getMonth() + 1;
        return month === 3;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setmarInc(income);

    const expense = transactionsFiltered
      .filter((tx) => tx.category === "Expense")
      .filter((tx) => {
        const month = new Date(tx.datetime).getMonth() + 1;
        return month === 3;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setmarExp(expense);
  };

  const calculateapr = () => {
    const income = transactionsFiltered
      .filter((tx) => tx.category === "Income")
      .filter((tx) => {
        const month = new Date(tx.datetime).getMonth() + 1;
        return month === 4;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setaprInc(income);

    const expense = transactionsFiltered
      .filter((tx) => tx.category === "Expense")
      .filter((tx) => {
        const month = new Date(tx.datetime).getMonth() + 1;
        return month === 4;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setaprExp(expense);
  };
  const calculatemay = () => {
    const income = transactionsFiltered
      .filter((tx) => tx.category === "Income")
      .filter((tx) => {
        const month = new Date(tx.datetime).getMonth() + 1;
        return month === 5;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setmayInc(income);

    const expense = transactionsFiltered
      .filter((tx) => tx.category === "Expense")
      .filter((tx) => {
        const month = new Date(tx.datetime).getMonth() + 1;
        return month === 5;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setmayExp(expense);
  };
  const calculatejun = () => {
    const income = transactionsFiltered
      .filter((tx) => tx.category === "Income")
      .filter((tx) => {
        const month = new Date(tx.datetime).getMonth() + 1;
        return month === 6;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setjunInc(income);

    const expense = transactionsFiltered
      .filter((tx) => tx.category === "Expense")
      .filter((tx) => {
        const month = new Date(tx.datetime).getMonth() + 1;
        return month === 6;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setjunExp(expense);
  };
  const calculatejul = () => {
    const income = transactionsFiltered
      .filter((tx) => tx.category === "Income")
      .filter((tx) => {
        const month = new Date(tx.datetime).getMonth() + 1;
        return month === 7;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setjulInc(income);

    const expense = transactionsFiltered
      .filter((tx) => tx.category === "Expense")
      .filter((tx) => {
        const month = new Date(tx.datetime).getMonth() + 1;
        return month === 7;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setjulExp(expense);
  };
  const calculateaug = () => {
    const income = transactionsFiltered
      .filter((tx) => tx.category === "Income")
      .filter((tx) => {
        const month = new Date(tx.datetime).getMonth() + 1;
        return month === 8;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setaugInc(income);

    const expense = transactionsFiltered
      .filter((tx) => tx.category === "Expense")
      .filter((tx) => {
        const month = new Date(tx.datetime).getMonth() + 1;
        return month === 8;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setaugExp(expense);
  };
  const calculatesep = () => {
    const income = transactionsFiltered
      .filter((tx) => tx.category === "Income")
      .filter((tx) => {
        const month = new Date(tx.datetime).getMonth() + 1;
        return month === 9;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setsepInc(income);

    const expense = transactionsFiltered
      .filter((tx) => tx.category === "Expense")
      .filter((tx) => {
        const month = new Date(tx.datetime).getMonth() + 1;
        return month === 9;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setsepExp(expense);
  };
  const calculateoct = () => {
    const income = transactionsFiltered
      .filter((tx) => tx.category === "Income")
      .filter((tx) => {
        const month = new Date(tx.datetime).getMonth() + 1;
        return month === 10;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setoctInc(income);

    const expense = transactionsFiltered
      .filter((tx) => tx.category === "Expense")
      .filter((tx) => {
        const month = new Date(tx.datetime).getMonth() + 1;
        return month === 10;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setoctExp(expense);
  };
  const calculatenov = () => {
    const income = transactionsFiltered
      .filter((tx) => tx.category === "Income")
      .filter((tx) => {
        const month = new Date(tx.datetime).getMonth() + 1;
        return month === 11;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setnovInc(income);

    const expense = transactionsFiltered
      .filter((tx) => tx.category === "Expense")
      .filter((tx) => {
        const month = new Date(tx.datetime).getMonth() + 1;
        return month === 11;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setnovExp(expense);
  };
  const calculatedec = () => {
    const income = transactionsFiltered
      .filter((tx) => tx.category === "Income")
      .filter((tx) => {
        const month = new Date(tx.datetime).getMonth() + 1;
        return month === 12;
      })
      .reduce((total, tx) => {
        return total + parseFloat(tx.amount);
      }, 0);
    setdecInc(income);

    const expense = transactionsFiltered
      .filter((tx) => tx.category === "Expense")
      .filter((tx) => {
        const month = new Date(tx.datetime).getMonth() + 1;
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
          0,
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
          0,
        ],
      },
      {
        name: "Income",
        data: [
          0,
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
          0,
        ],
      },
    ],
    options: {
      chart: {
        type: "area",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 4,
          columnWidth: "85%",
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
          "",
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
          "",
        ],
      },
      colors: ["#9b0705", "#0c663c"],
      yaxis: {
        title: {
          text: "₹(k)",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "₹" + val * 1000;
          },
        },
      },
      title: {
        text: `${year}`,
        floating: true,
        offsetY: 0,
        align: "bottom",
        style: {
          color: "#444",
        },
      },
    },
  };
  const expenseTotal = transactionsFiltered
    .filter(
      (transactionsFiltered) =>
        transactionsFiltered.category.toLowerCase() === "expense"
    )
    .map((transactionsFiltered) => parseFloat(transactionsFiltered.amount))
    .reduce((total, amount) => total + amount, 0);

  const incomeTotal = transactionsFiltered
    .filter(
      (transactionsFiltered) =>
        transactionsFiltered.category.toLowerCase() === "income"
    )
    .map((transactionsFiltered) => parseFloat(transactionsFiltered.amount))
    .reduce((total, amount) => total + amount, 0);
  const balance = incomeTotal - expenseTotal;
  return (
    <>
      {" "}
      <Navbar />
      <div className={styles.page}>
        <div className={styles.dashboard}>
          <div className={styles.dashboard_chart}>
            <ApexCharts
              className={styles.chart}
              options={data.options}
              series={data.series}
              type="area"
              height={800}
            />
          </div>
          <div className={styles.dashboard_expinc}>
            <Search
              className={styles.yearsearch}
              placeholder="Enter year to show"
              onSearch={(value) => setYear(Number(value))}
              enterButton
            />

            <div className={styles.dashboard_balance}>
              <span>
                <FaWallet />
              </span>{" "}
              <span>
                <CountUp start={0} end={balance} duration={3} delay={0} />
              </span>
            </div>
            <div className={styles.dashboard_income}>
              <span>
                <BsGraphUpArrow />
              </span>{" "}
              <span>
                <CountUp start={0} end={incomeTotal} duration={3} delay={0} />
              </span>
            </div>
            <div className={styles.dashboard_expense}>
              <span>
                <BsGraphDownArrow />{" "}
              </span>
              <span>
                <CountUp start={0} end={expenseTotal} duration={3} delay={0} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const page = () => {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
};

export default page;
