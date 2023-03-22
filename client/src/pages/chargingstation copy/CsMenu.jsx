import * as React from "react";
import "./chargingStation.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import DataTable from "../../components/data table/DataTable";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CsMenu = () => {
  const [cs, setCS] = useState([]);
  const [report, setReport] = React.useState([]);
  const [totalKWH, setTotalKWH] = React.useState([0]);

  useEffect(() => {
    const fetchDataCS = async () => {
      try {
        const res = await axios.get("http://localhost:8800/cs");
        const res1 = await axios.get("http://localhost:8800/transaction");
        setCS(res.data);
        setReport(res1.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataCS();
  }, []);

  const dataConnected = !cs
    ? 0
    : cs.filter((item) => item.LAST_HEARTBEAT_TIMESTAMP_STATUS === "Connected")
        .length;
  const activeCS = !cs
    ? 0
    : cs.filter((item) => item.IS_ACTIVE === "Active").length;
  //pindahkan ke widget

  useEffect(() => {
    if (report.length) {
      // console.log("report", report);
      let total_energy_consumption = 0;
      const countedArray = report.map((item) => {
        // console.log(Number(item.stop_value));
        total_energy_consumption +=
          Number(item.stop_value) - Number(item.start_value);
      });
      setTotalKWH(total_energy_consumption);
      // console.log("counted array >> ", total_energy_consumption);
    }
  }, [report]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      console.log(token);
      navigate("/login");
    }
  }, [token]);
  return (
    <div className="cS">
      <Sidebar />
      <div className="cSContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="registeredCS" registeredcs={cs.length} />
          <Widget type="connectedCS" connectedcs={dataConnected} />
          <Widget type="activeCS" activecs={activeCS} />
          <Widget type="kwh-nolink" kwhdata={totalKWH} />
        </div>
        <div className="table">
          <h3>Charging Station Status</h3>

          <DataTable />
        </div>
      </div>
    </div>
  );
};

export default CsMenu;
