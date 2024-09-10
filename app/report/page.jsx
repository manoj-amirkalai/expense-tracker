"use client";
// import React from "react";
// import "./page.css";
// import { transactions } from "@/app/data";
// import { RiDeleteBin2Fill } from "react-icons/ri";
// import { LuEye } from "react-icons/lu";
// import { MdEdit } from "react-icons/md";
// const page = () => {
//   return (
//     <div className="expense">
//       {" "}
//       <table>
//         <thead>
//           <tr>
//             <td className="title">Paid For</td>
//             <td className="title">Paid By</td>
//             <td className="title">Paid Using</td>
//             <td className="title">Category</td>
//             <td className="title">Date</td>
//             <td className="title">Time</td>
//             <td className="title">Amount</td>
//             <td className="title">Action</td>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.map((data, index) => {
//             return (
//               <tr key={index} className="">
//                 <td>{data.title}</td>
//                 <td>{data.paidby}</td>
//                 <td>{data.paidusing}</td>
//                 <td>{data.type}</td>
//                 <td>{data.date}</td>
//                 <td>{data.time}</td>
//                 <td>{data.amount}</td>{" "}
//                 <td className="action">
//                   <LuEye className="action_icons" />&nbsp;&nbsp;
//                   <MdEdit className="action_icons" />&nbsp;&nbsp;
//                   <RiDeleteBin2Fill className="action_icons"  />
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default page;
import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
const data = [
  { key: "1", name: "John Brown", age: 32, address: "New York No. 1 Lake Park" },
  { key: "2", name: "Jane Smith", age: 29, address: "London No. 2 Park Lane" },
  { key: "3", name: "Paul Johnson", age: 45, address: "Paris No. 3 Champs-Elysees" },
  { key: "4", name: "Emily Davis", age: 37, address: "Berlin No. 4 Alexanderplatz" },
  { key: "5", name: "Michael Wilson", age: 41, address: "Madrid No. 5 Gran Via" },
  { key: "6", name: "Sarah Miller", age: 28, address: "Rome No. 6 Via del Corso" },
  { key: "7", name: "David Lee", age: 35, address: "Tokyo No. 7 Shibuya" },
  { key: "8", name: "Linda Harris", age: 33, address: "Sydney No. 8 Bondi Beach" },
  { key: "9", name: "James Clark", age: 40, address: "Toronto No. 9 Queen Street" },
  { key: "10", name: "Laura Lewis", age: 31, address: "Los Angeles No. 10 Sunset Boulevard" },
  { key: "11", name: "Robert Walker", age: 39, address: "San Francisco No. 11 Golden Gate" },
  { key: "12", name: "Jessica Robinson", age: 26, address: "Chicago No. 12 Michigan Avenue" },
  { key: "13", name: "William Wright", age: 42, address: "Boston No. 13 Back Bay" },
  { key: "14", name: "Elizabeth Walker", age: 30, address: "Seattle No. 14 Pike Place Market" },
  { key: "15", name: "Daniel Hall", age: 38, address: "Houston No. 15 Main Street" },
  { key: "16", name: "Sophia Young", age: 27, address: "Miami No. 16 Ocean Drive" },
  { key: "17", name: "Matthew Allen", age: 34, address: "Dallas No. 17 Deep Ellum" },
  { key: "18", name: "Olivia King", age: 43, address: "Atlanta No. 18 Peachtree Street" },
  { key: "19", name: "Ethan Scott", age: 46, address: "Denver No. 19 16th Street Mall" },
  { key: "20", name: "Ava Adams", age: 25, address: "Phoenix No. 20 Camelback Mountain" },
];
const Page = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "20%",
      ...getColumnSearchProps("age"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};
export default Page;
