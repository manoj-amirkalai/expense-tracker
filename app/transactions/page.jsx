"use client";
import {
  MaterialReactTable,
  useMaterialReactTable,
  createMRTColumnHelper,
} from "material-react-table";
import {
  Button as Buttons,
  InputNumber,
  message,
  Modal,
  Popconfirm,
} from "antd";
import "./page.css";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv"; // or use your library of choice here
import { MdEdit } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "antd";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Radio } from "antd";
import { IoAddCircle } from "react-icons/io5";
import dayjs from "dayjs";
import Navbar from "../Components/Navbar/Navbar";
import { useRouter } from "next/navigation";
import { Provider, useSelector } from "react-redux";
import store from "../Components/store/store";
const Transaction = () => {
  const route = useRouter();

  const tokens = useSelector((state) => state.data.token);

  const [token, settoken] = useState(tokens);
  useEffect(() => {
    if (!token) {
      route.push("/");
    }
  }, [token]);

  const [data, setData] = useState([]);
  const [paidfor, setPaidfor] = useState("");
  const [paidby, setPaidby] = useState("");
  const [paidusing, setPaidusing] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [updateId, setUpdateId] = useState("");
  const [dateTime, setDateTime] = useState(dayjs(new Date()));
  const [updateModel, setUpdateModel] = useState(false);
  const [paidforerror, setPaidforerror] = useState("");
  const [paidbyerror, setPaidbyerror] = useState("");
  const [paidusingerror, setPaidusingerror] = useState("");
  const [categoryerror, setCategoryerror] = useState("");
  const [amounterror, setAmounterror] = useState(0);
  let count = 0;
  const getdata = async () => {
    try {
      const response = await axios.get(
        "https://budget-tracker-manoj.onrender.com/api/budget",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const fetcheddata = response.data.response;
      setData([...fetcheddata]);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getdata();
  }, []);
  const columnHelper = createMRTColumnHelper();
  const errorCheck = () => {
    if (paidfor.trim().length > 0) {
      setPaidforerror("");
    }
    if (paidby.trim().length > 0) {
      setPaidbyerror("");
    }
    if (paidusing.trim().length > 0) {
      setPaidusingerror("");
    }
    if (category) {
      setCategoryerror("");
    }
    if (amount > 0) {
      setAmounterror("");
    }
  };
  const columns = [
    columnHelper.accessor(
      () => {
        count++;
        return count;
      },
      {
        header: "ID",
        size: 15,
      }
    ),
    columnHelper.accessor("paidfor", {
      header: "Paid For",
      size: 15,
    }),
    columnHelper.accessor("paidby", {
      header: "Paid By",
      size: 15,
    }),
    columnHelper.accessor("paidusing", {
      header: "Paid Using",
      size: 15,
    }),

    columnHelper.accessor("category", {
      header: "Category",
      size: 15,
    }),
    columnHelper.accessor(
      (row) => {
        const dateandtime = new Date(row.datetime).toString().slice(0, 25);

        return <p>{dateandtime.slice(4, 15)}</p>;
      },
      {
        header: "Date",
        size: 15,
      }
    ),
    columnHelper.accessor(
      (row) => {
        const dateandtime = new Date(row.datetime).toString().slice(0, 25);

        return <p>{dateandtime.slice(16, 21)}</p>;
      },
      {
        header: " Time",
        size: 15,
      }
    ),

    columnHelper.accessor("amount", {
      header: "Amount",
      size: 15,
    }),
    columnHelper.accessor(
      (row) => {
        return (
          <div className="action">
            {" "}
            {/* <LuEye
              className="action_icons"
              style={{ color: "green", cursor: "pointer", fontSize: "15px" }}
              onClick={() => {
                const { id } = row;
              }}
            /> */}
            <MdEdit
              className="action_icons"
              onClick={async () => {
                setUpdateModel(true);
                const { _id } = row;
                try {
                  const response = await axios.get(
                    `https://budget-tracker-manoj.onrender.com/api/budget/${_id}`
                  );
                  const responsedata = response.data.response;

                  showModal();
                  setUpdateId(_id);
                  setPaidfor(responsedata.paidfor);
                  setPaidby(responsedata.paidby);
                  setPaidusing(responsedata.paidusing);
                  setAmount(responsedata.amount);
                  setCategory(responsedata.category);
                  const timedate = dayjs(responsedata.datetime);
                  setDateTime(timedate);
                } catch (e) {
                  console.log(e);
                }
              }}
            />
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={async () => {
                const { _id } = row;

                try {
                  const res = await fetch(
                    `https://budget-tracker-manoj.onrender.com/api/budget`,

                    {
                      method: "DELETE",
                      headers: {
                        "Content-type": "application/json",
                      },
                      body: JSON.stringify({ id: _id }),
                    }
                  );
                  getdata();
                  message.success("Data deleted");
                } catch (e) {
                  console.log(e);
                  message.error("Failed to deleted");
                }
              }}
              onCancel={() => {
                message.info("Data not deleted");
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button>
                {" "}
                <RiDeleteBin2Fill
                  style={{ color: "red", cursor: "pointer", fontSize: "15px" }}
                  className="action_icons"
                />
              </Button>
            </Popconfirm>
          </div>
        );
      },
      {
        header: "Actions",
        size: 15,
      }
    ),
  ];

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button onClick={handleExportData} startIcon={<FileDownloadIcon />}>
          Export All Data
        </Button>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
        <Button className="add_button" onClick={showModal} variant="outlined">
          {/* <IoAddCircle className="add_icon" /> */}
          <p className="add_icon"> Add Transactions</p>
        </Button>
      </Box>
    ),
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    if (
      !paidfor ||
      paidfor.trim().length === 0 ||
      !paidby ||
      paidby.trim().length === 0 ||
      !paidusing ||
      paidusing.trim().length === 0 ||
      !category ||
      !amount ||
      amount === 0 ||
      !category
    ) {
      if (!paidfor || paidfor.trim().length === 0) {
        setPaidforerror("error");
      }
      if (!paidby || paidby.trim().length === 0) {
        setPaidbyerror("error");
      }
      if (!paidusing || paidusing.trim().length === 0) {
        setPaidusingerror("error");
      }
      if (!category) {
        setCategoryerror("error");
      }
      if (!amount || amount === 0) {
        setAmounterror("error");
      }

      return;
    }
    setLoading(true);

    try {
      const res = await fetch(
        `https://budget-tracker-manoj.onrender.com/api/budget`,

        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            paidfor: paidfor,
            paidby: paidby,
            paidusing: paidusing,
            category: category,
            datetime: dateTime,
            amount: amount,
          }),
        }
      );
      getdata();
      setPaidby("");
      setPaidfor("");
      setPaidusing("");
      setDateTime(dayjs(new Date()));
      setCategory("");
      setAmount(0);
      setLoading(false);
      setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };
  const handleCancel = () => {
    setPaidforerror("");
    setPaidbyerror("");
    setPaidusingerror("");
    setCategoryerror("");
    setAmounterror("");
    setUpdateModel(false);
    setPaidby("");
    setPaidfor("");
    setPaidusing("");
    setDateTime(dayjs(new Date()));
    setCategory("");
    setAmount(0);
    setLoading(false);
    setOpen(false);
  };
  const handleUpdate = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `https://budget-tracker-manoj.onrender.com/api/budget/${updateId}`,

        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            paidfor: paidfor,
            paidby: paidby,
            paidusing: paidusing,
            category: category,
            datetime: dateTime,
            amount: amount,
          }),
        }
      );
      getdata();
      setPaidby("");
      setPaidfor("");
      setPaidusing("");
      setUpdateModel(false);
      setDateTime(dayjs(new Date()));
      setCategory("");
      setAmount(0);
      setLoading(false);
      setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {" "}
      <Navbar />{" "}
      <div className="transaction_data">
        <Modal open={open} onCancel={handleCancel} footer={[]}>
          <h2>Add Transaction</h2>

          <div className="add_inputs">
            <div className="label_input">
              <p>Paid For :</p>
              <Input
                status={paidforerror}
                value={paidfor}
                onChange={(event) => {
                  errorCheck();
                  setPaidfor(event.target.value);
                }}
                placeholder="Paid For"
              />
            </div>{" "}
            <div className="label_input">
              <p>Paid By :</p>
              <Input
                status={paidbyerror}
                value={paidby}
                onChange={(event) => {
                  errorCheck();
                  setPaidby(event.target.value);
                }}
                placeholder="Paid By"
              />
            </div>{" "}
            <div className="label_input">
              <p>Paid Using :</p>
              <Input
                status={paidusingerror}
                value={paidusing}
                onChange={(event) => {
                  errorCheck();
                  setPaidusing(event.target.value);
                }}
                placeholder="Paid Using"
              />
            </div>
            <div className="label_input">
              <p>Category :</p>
              <Radio.Group
                value={category}
                onChange={(event) => {
                  errorCheck();
                  setCategory(event.target.value);
                }}
                buttonStyle="solid"
              >
                <Radio.Button
                  className={categoryerror === "error" ? "category_border" : ""}
                  value="Income"
                >
                  Income
                </Radio.Button>
                <Radio.Button
                  className={categoryerror === "error" ? "category_border" : ""}
                  value="Expense"
                >
                  Expense
                </Radio.Button>
              </Radio.Group>
            </div>
            <div className="label_input">
              <p>Date & Time :</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    value={dateTime}
                    onChange={(newValue) => setDateTime(newValue)}
                    label="Basic date time picker"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>{" "}
            <div className="label_input">
              <p>Amount :</p>
              <InputNumber
                status={amounterror}
                onChange={(event) => {
                  errorCheck();
                  setAmount(event);
                }}
                type="number"
                value={amount}
                placeholder="Amount"
              />
            </div>
          </div>
          <div className="modal_button">
            {updateModel ? (
              <Buttons
                key="submit"
                type="primary"
                loading={loading}
                onClick={handleUpdate}
                className="add_update"
              >
                Update
              </Buttons>
            ) : (
              <Buttons
                key="submit"
                type="primary"
                loading={loading}
                onClick={handleOk}
                className="add_update"
              >
                Add
              </Buttons>
            )}
          </div>
        </Modal>
        <MaterialReactTable table={table} />
      </div>
    </>
  );
};

const page = () => {
  return (
    <Provider store={store}>
      <Transaction />
    </Provider>
  );
};

export default page;
