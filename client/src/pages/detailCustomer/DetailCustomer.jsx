import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./detailcustomer.scss";
import axios from "axios";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import CustomerTransactionTable from "../../components/customer-transactions/CustomerTransactionTable";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

const DetailCustomer = () => {
  const role = localStorage.getItem("role")
    ? JSON.parse(localStorage.getItem("role"))
    : "";
  const bytes = CryptoJS.AES.decrypt(role, "10");
  const originalRole = bytes.toString(CryptoJS.enc.Utf8);

  useEffect(() => {
    if (originalRole !== "admin") navigate("/");
  }, []);
  useEffect(() => {
    getCs();
  }, []);

  // useEffect(() => {
  //   getConnector();
  // }, []);

  const location = useLocation();
  const customersId = location.pathname.split("/")[2];

  const [customer, setCustomer] = useState("");
  //   const [connector, setConnector] = useState("");

  const getCs = async () => {
    const response = await axios.get(
      `http://localhost:8800/customer/${customersId}`,
      customer
    );
    // console.log(response.data);
    setCustomer(response.data);
  };

  // const StyledTableCell = styled(TableCell)(({ theme }) => ({
  //   [`&.${tableCellClasses.head}`]: {
  //     backgroundColor: theme.palette.common.black,
  //     color: theme.palette.common.white,
  //     fontWeight: 600,
  //   },
  //   [`&.${tableCellClasses.body}`]: {
  //     fontSize: 14,
  //   },
  // }));

  // const StyledTableRow = styled(TableRow)(({ theme }) => ({
  //   "&:nth-of-type(odd)": {
  //     backgroundColor: theme.palette.action.hover,
  //   },
  //   // hide last border
  //   "&:last-child td, &:last-child th": {
  //     border: 0,
  //   },
  // }));

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      console.log(token);
      navigate("/login");
    }
  }, [token]);
  return (
    <div className="detailCS">
      <Sidebar />
      <div className="detailContainer">
        <Navbar />
        {customer && (
          <div className="detailBox">
            <div className="card">
              <span className="detailTitle">ID: </span>
              <p className="shortText">{customer.ID}</p>
            </div>
            <div className="card">
              <span className="detailTitle">Customer Name: </span>
              <p className="shortText">{customer.NAME ? customer.NAME : "-"}</p>
            </div>
            <div className="card">
              <span className="detailTitle">Email: </span>
              <p className="shortText">
                {customer.EMAIL ? customer.EMAIL : "-"}
              </p>
            </div>
            <div className="card">
              <span className="detailTitle">Customer ID Tag: </span>
              <p className="shortText">
                {customer.id_tag ? customer.id_tag : "-"}
              </p>
            </div>
            <div className="card">
              <span className="detailTitle">Address </span>
              <p className="shortText">
                {customer.ADDRESS ? customer.ADDRESS : "-"}
              </p>
            </div>
            <div className="card">
              <span className="detailTitle">Phone Number: </span>
              <p className="shortText">
                {customer.PHONE_NUMBER ? customer.PHONE_NUMBER : "-"}
              </p>
            </div>
            <div className="card">
              <span className="detailTitle">City: </span>
              <p className="shortText">{customer.CITY ? customer.CITY : "-"}</p>
            </div>
            <div className="card">
              <span className="detailTitle">Saldo: </span>
              <p className="shortText">
                {customer.SALDO ? customer.SALDO : "-"}
              </p>
            </div>
            <div className="card">
              <span className="detailTitle">Is Active: </span>
              <p className="shortText">
                {customer.IS_ACTIVE ? customer.IS_ACTIVE : "-"}
              </p>
            </div>
            <div className="card">
              <span className="detailTitle">Date Created: </span>
              <p className="shortText">
                {moment(customer.DATE_CREATED).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )}
              </p>
            </div>
            <div className="card">
              <span className="detailTitle">Last Login: </span>
              <p className="shortText">
                {customer.LAST_LOGIN ? customer.LAST_LOGIN : "-"}
              </p>
            </div>
            <div className="card">
              <span className="detailTitle">Number of Transaction: </span>
              <p className="shortText">
                {customer.GENERAL_PRICE ? customer.GENERAL_PRICE : "-"}
              </p>
            </div>
            <div className="card">
              <span className="detailTitle">Last Transaction: </span>
              <p className="shortText">
                {customer.LAST_TRANSACTION ? customer.LAST_TRANSACTION : "-"}
              </p>
            </div>
            <div className="card">
              <span className="detailTitle">Last Heartbeat Timestamp: </span>
              <p className="shortText">
                {customer.last_heartbeat_timestamp
                  ? customer.last_heartbeat_timestamp
                  : "-"}
              </p>
            </div>
            <div className="card">
              <span className="detailTitle">
                Last Heartbeat Timestamp Status:{" "}
              </span>
              <p className="shortText">
                {customer.LAST_HEARTBEAT_TIMESTAMP_STATUS
                  ? customer.LAST_HEARTBEAT_TIMESTAMP_STATUS
                  : "-"}
              </p>
            </div>
            <div className="card">
              <span className="detailTitle">Is Active: </span>
              <p className="shortText">
                {customer.IS_ACTIVE ? customer.IS_ACTIVE : "-"}
              </p>
            </div>
          </div>
        )}
        {customer && (
          <div className="connectorTable">
            <h3>Transactions Data</h3>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                aria-label="simple table"
                className="tableCs"
              >
                <TableHead></TableHead>
                <CustomerTransactionTable idTag={customer.id_tag} />
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailCustomer;
