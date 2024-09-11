"use client";
import {
  MaterialReactTable,
  useMaterialReactTable,
  createMRTColumnHelper,
} from "material-react-table";
import "./page.css";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv"; // or use your library of choice here
import { LuEye } from "react-icons/lu";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
  const [data, setData] = useState([]);
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
    columnHelper.accessor("id", {
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

    columnHelper.accessor("type", {
      header: "Category",
      size: 15,
    }),
    columnHelper.accessor("date", {
      header: "Date",
      size: 15,
    }),
    columnHelper.accessor("time", {
      header: "Time",
      size: 15,
    }),
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
            &nbsp;&nbsp;
            <MdEdit
              className="action_icons"
              style={{ color: "blue", cursor: "pointer", fontSize: "15px" }}
              onClick={() => {
                const { id } = row;
              }}
            />
            &nbsp;&nbsp;
            <RiDeleteBin2Fill
              style={{ color: "red", cursor: "pointer", fontSize: "15px" }}
              className="action_icons"
              onClick={() => {
                const { id } = row;
                const dataFilter = data.filter((data) => data.id !== id);
                setData([...dataFilter]);
              }}
            />
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

  return (
    <>
      <div style={{ width: "81vw", margin: "0 auto" }}>
        <MaterialReactTable table={table} />
      </div>
    </>
  );
};

export default Page;
