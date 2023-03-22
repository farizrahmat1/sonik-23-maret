import "./report.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ReportTable from "../../components/report-table/ReportTable";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

const Report = () => {
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
      // console.log(token);
      navigate("/login");
    }
  }, [token]);
  return (
    <div className="report">
      <Sidebar />
      <div className="reportContainer">
        <Navbar />
        {/* <div className="chart">
          <Chart />
        </div> */}
        <div className="reportTable">
          <h3>Report Data</h3>
          <ReportTable />
        </div>
      </div>
    </div>
  );
};

export default Report;
