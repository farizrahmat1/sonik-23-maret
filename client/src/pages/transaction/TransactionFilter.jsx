import "./transactionfilter.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import TransactionFilterTable from "../../components/filter-transaction/TransactionFilterTable";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
const TransactionFilter = () => {
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
    <div className="transactionFilter">
      <Sidebar />
      <div className="transactionFilterContainer">
        <Navbar />
        <div className="transactiontable">
          <h3>Transaction Data Filtered</h3>
          <TransactionFilterTable />
        </div>
      </div>
    </div>
  );
};

export default TransactionFilter;
