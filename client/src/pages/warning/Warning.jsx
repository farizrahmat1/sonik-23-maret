import "./warning.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import WarningTable from "../../components/warning-table/WarningTable";
import CryptoJS from "crypto-js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Warning = () => {
  const role = localStorage.getItem("role")
    ? JSON.parse(localStorage.getItem("role"))
    : "";
  const bytes = CryptoJS.AES.decrypt(role, "10");
  const originalRole = bytes.toString(CryptoJS.enc.Utf8);

  useEffect(() => {
    if (originalRole !== "admin") navigate("/");
  }, []);
  const navigate = useNavigate();
  return (
    <div className="warning">
      <Sidebar />
      <div className="warningContainer">
        <Navbar />
        <div className="warningTable">
          <h3>Data Warning</h3>
          <WarningTable />
        </div>
      </div>
    </div>
  );
};

export default Warning;
