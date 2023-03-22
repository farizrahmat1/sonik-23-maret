import "./chart.scss";
import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = () => {
  const [transaction, setTransaction] = React.useState([]);
  const [lengthTransaction, setLengthTransaction] = React.useState([]);

  

  useEffect(() => {
    const fetchDataTransaction = async () => {
      try {
        const res = await axios.get("http://localhost:8800/transaction");
        setTransaction(res.data);
        setLengthTransaction(res.data.length);
        console.log(transaction);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataTransaction();
  }, []);

  return (
    <div className="areachart">
      <button className="buttonChart">
        <Link to="/report" style={{ color: "inherit", textDecoration: "none" }}>
          <BarChartOutlinedIcon />
        </Link>
      </button>
      <button className="buttonChart">
        <Link
          to="/piereport"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <PieChartOutlineOutlinedIcon />
        </Link>
      </button>
      <div className="titleChart">{"Banyaknya transaksi"}</div>{" "}
      <ResponsiveContainer width="100%" height="100%" aspect={5}>
        <BarChart width={730} height={250} data={transaction}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={"transactions"} fill="#8884d8" />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
