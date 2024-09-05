import React from "react";
import "./page.css";
import { transactions } from "@/app/data";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { LuEye } from "react-icons/lu";
import { MdEdit } from "react-icons/md";
const page = () => {
  return (
    <div className="expense">
      {" "}
      <table>
        <thead>
          <tr>
            <td className="title">Paid For</td>
            <td className="title">Paid By</td>
            <td className="title">Paid Using</td>
            <td className="title">Category</td>
            <td className="title">Date</td>
            <td className="title">Time</td>
            <td className="title">Amount</td>
            <td className="title">Action</td>
          </tr>
        </thead>
        <tbody>
          {transactions.map((data, index) => {
            return (
              <tr key={index} className="">
                <td>{data.title}</td>
                <td>{data.paidby}</td>
                <td>{data.paidusing}</td>
                <td>{data.type}</td>
                <td>{data.date}</td>
                <td>{data.time}</td>
                <td>{data.amount}</td>{" "}
                <td className="action">
                  <LuEye className="action_icons" />&nbsp;&nbsp;
                  <MdEdit className="action_icons" />&nbsp;&nbsp;
                  <RiDeleteBin2Fill className="action_icons"  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default page;
