import "./widget.scss";
import EvStationOutlinedIcon from "@mui/icons-material/EvStationOutlined";
import BatteryChargingFullOutlinedIcon from "@mui/icons-material/BatteryChargingFullOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import ElectricalServicesOutlinedIcon from "@mui/icons-material/ElectricalServicesOutlined";
import { Link } from "react-router-dom";

const Widget = ({
  type,
  kwhdata,
  chargestoday,
  activecs,
  transactiontoday,
  registeredcs,
  connectedcs,
}) => {
  let data;
  const howMany = false;
  const isMoney = false;

  switch (type) {
    case "activeCs":
      data = {
        title: "Active CS",
        howMany: false,
        link: "See all active CS",
        url: "/chargingstation",
        icon: <EvStationOutlinedIcon className="icon station" />,
      };
      break;

    case "charge":
      data = {
        title: "Charges Today",
        howMany: false,
        link: "See all charges activity today",
        url: "/report",
        icon: <BatteryChargingFullOutlinedIcon className="icon battery" />,
      };
      break;

    case "transaction":
      data = {
        title: "Transaction Today",
        isMoney: true,
        link: "See all transaction today",
        url: "/transaction",
        icon: <CreditCardOutlinedIcon className="icon money" />,
      };
      break;

    case "activeCs-nolink":
      data = {
        title: "Active CS",
        howMany: false,
        link: " ",
        icon: <EvStationOutlinedIcon className="icon station" />,
      };
      break;

    case "kwh":
      data = {
        title: "KWH Delivered Today",
        howMany: true,
        link: "See all KWH delivered today",
        url: "/chargingstation",
        icon: <BoltOutlinedIcon className="icon electric" />,
      };
      break;

    case "charge-nolink":
      data = {
        title: "Charges Today",
        howMany: false,
        icon: <BatteryChargingFullOutlinedIcon className="icon battery" />,
      };
      break;

    case "transaction-nolink":
      data = {
        title: "Transaction Today",
        isMoney: true,
        icon: <CreditCardOutlinedIcon className="icon money" />,
      };
      break;

    case "kwh-nolink":
      data = {
        title: "KWH Delivered Today",
        howMany: true,
        icon: <BoltOutlinedIcon className="icon electric" />,
      };
      break;

    case "registeredCS":
      data = {
        title: "Registered CS",
        link: " ",
        icon: <CheckBoxOutlinedIcon className="icon registered" />,
      };
      break;

    case "connectedCS":
      data = {
        title: "Connected CS",
        icon: <ElectricalServicesOutlinedIcon className="icon connected" />,
      };
      break;

    case "activeCS":
      data = {
        title: "Active CS",
        icon: <MonitorHeartOutlinedIcon className="icon active" />,
      };
      break;

    default:
      break;
  }


  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <div className="counter">{activecs}</div>
        <div className="counter">{transactiontoday}</div>
        <div className="counter">{chargestoday}</div>
        <div className="counter">{registeredcs}</div>
        <div className="counter">{connectedcs}</div>
        {/* <div className="counter-activecs">
           {howmany} {activecs}
        </div>   */}
        <div className="counter">{kwhdata}</div>
        <span className="link">
          <Link to={data.url}>{data.link}</Link>
        </span>
      </div>
      <div className="right">{data.icon}</div>
    </div>
  );
};

export default Widget;
