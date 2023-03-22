import "./piechartreport.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import PieChartComponent from "../../components/chart/PieChartComponent";

const PieChartReport = () => {
  return (
    <div className="pieReport">
      <Sidebar />
      <div className="pieReportContainer">
        <Navbar />
        <div>
          <PieChartComponent />
        </div>
      </div>
    </div>
  );
};

export default PieChartReport;
