import "./piechartcomponent.scss";
import { Link } from "react-router-dom";
import { ResponsiveContainer, PieChart, Pie } from "recharts";
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';

const data01 = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
  { name: "Group D", value: 9800 },
  { name: "Group E", value: 3908 },
  { name: "Group F", value: 4800 },
];

const data02 = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
  { name: "Group D", value: 9800 },
  { name: "Group E", value: 3908 },
  { name: "Group F", value: 4800 },
];

const PieChartComponent = () => {
  return (
    <div className="piechart">
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
      <div className="titleChart">{"Transaction Chart Januari - Desember"}</div>
      <ResponsiveContainer width="100%" height="100%" aspect={5}>
        <PieChart width={300} height={600}>
          <Pie
            data={data01}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
          />
          <Pie
            data={data02}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#82ca9d"
            label
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
