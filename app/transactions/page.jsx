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
import { LuEye } from "react-icons/lu";
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
import dayjs from "dayjs";
const Page = () => {
  const [data, setData] = useState([]);
  const [paidfor, setPaidfor] = useState("");
  const [paidby, setPaidby] = useState("");
  const [paidusing, setPaidusing] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [dateTime, setDateTime] = useState(dayjs(new Date()));
  let count = 0;
  const getdata = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/budget");
      const fetcheddata = response.data.response;
      setData([...fetcheddata]);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getdata();

    console.log(data);
  }, []);
  const columnHelper = createMRTColumnHelper();

  const columns = [
    columnHelper.accessor(count++, {
      header: "ID",
      size: 15,
    }),
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
        return <p>{dateandtime.slice(0, 15)}</p>;
      },
      {
        header: "Time",
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
                const { _id } = row;
                try {
                  const response = await axios.get(
                    `http://localhost:3000/api/budget/${_id}`
                  );
                  const responsedata = response.data.response;

                  showModal();
                  console.log(responsedata);
                  setPaidfor(responsedata.paidfor);
                  setPaidby(responsedata.paidby);
                  setPaidusing(responsedata.paidusing);
                  setAmount(responsedata.amount);
                  setCategory(responsedata.category);
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
                    `http://localhost:3000/api/budget`,

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
                message.error("Data not deleted");
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button >
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
      </Box>
    ),
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:3000/api/budget`,

        {
          method: "POST",
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
      console.log("response", res);
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
    setPaidby("");
    setPaidfor("");
    setPaidusing("");
    setDateTime(dayjs(new Date()));
    setCategory("");
    setAmount(0);
    setLoading(false);
    setOpen(false);
  };
  const handleUpdate = async (_id) => {
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:3000/api/budget/${_id}`,

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
            // new Date(dateTime).toString().slice(0, 25)
            amount: amount,
          }),
        }
      );
      console.log("response", res);
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
  return (
    <>
      <div className="transaction_data">
        <Modal open={open} onCancel={handleCancel} footer={[]}>
          <h2>Add Transaction</h2>

          <div className="add_inputs">
            <Input
              status=""
              value={paidfor}
              onChange={(event) => {
                setPaidfor(event.target.value);
              }}
              placeholder="Paid For"
            />
            <Input
              status=""
              value={paidby}
              onChange={(event) => {
                setPaidby(event.target.value);
              }}
              placeholder="Paid By"
            />
            <Input
              status=""
              value={paidusing}
              onChange={(event) => {
                setPaidusing(event.target.value);
              }}
              placeholder="Paid Using"
            />
            <Radio.Group
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
              }}
              buttonStyle="solid"
            >
              <Radio.Button value="Income">Income</Radio.Button>
              <Radio.Button value="Expense">Expense</Radio.Button>
            </Radio.Group>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  value={dateTime}
                  onChange={(newValue) => setDateTime(newValue)}
                  label="Basic date time picker"
                />
              </DemoContainer>
            </LocalizationProvider>
            <InputNumber
              status=""
              onChange={(event) => {
                setAmount(event);
              }}
              type="number"
              value={amount}
              placeholder="Amount"
            />
          </div>

          <Buttons
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Add
          </Buttons>
        </Modal>
        <MaterialReactTable table={table} />
        <Button className="add_button" onClick={showModal} variant="outlined">
          Add
        </Button>
      </div>
    </>
  );
};

export default Page;
