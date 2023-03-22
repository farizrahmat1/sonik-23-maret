import "./transaction.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import TransactionTable from "../../components/transaction table/TransactionTable";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
const Transaction = () => {
  const role = localStorage.getItem("role")
    ? JSON.parse(localStorage.getItem("role"))
    : "";
  const bytes = CryptoJS.AES.decrypt(role, "10");
  const originalRole = bytes.toString(CryptoJS.enc.Utf8);

  useEffect(() => {
    if (originalRole !== "admin") navigate("/");
  }, []);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      console.log(token);
      navigate("/login");
    }
  }, [token]);
  return (
    <div className="transaction">
      <Sidebar />
      <div className="transactionContainer">
        <Navbar />
        <div className="transactiontable">
          <h3>Transaction Data</h3>
          <TransactionTable />
        </div>
      </div>
    </div>
  );
};

export default Transaction;
