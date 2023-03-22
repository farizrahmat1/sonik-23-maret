import "./report.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ReportFiltered from "../../components/reportTableFiltered/ReportFiltered";
import CryptoJS from "crypto-js";

const ReportFilteredPage = () => {
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
    <div className="report">
      <Sidebar />
      <div className="reportContainer">
        <Navbar />
        {/* <div className="chart">
          <Chart />
        </div> */}
        <div className="reportTable">
          <h3>Report Filtered Data</h3>
          <ReportFiltered />
        </div>
      </div>
    </div>
  );
};

export default ReportFilteredPage;
