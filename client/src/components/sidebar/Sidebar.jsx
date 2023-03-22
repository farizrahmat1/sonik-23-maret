import "./sidebar.scss";
import React, { useEffect, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EvStationIcon from "@mui/icons-material/EvStation";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoIcon from "@mui/icons-material/Info";
import AssessmentIcon from "@mui/icons-material/Assessment";
import GroupsIcon from "@mui/icons-material/Groups";
import { Link } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Sonik from "../img/logo-sonik/sonik_bppt_color_white_black_background.png";
import CryptoJS from "crypto-js";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const role = localStorage.getItem("role")
    ? JSON.parse(localStorage.getItem("role"))
    : "";
  const bytes = CryptoJS.AES.decrypt(role, "10");
  const originalRole = bytes.toString(CryptoJS.enc.Utf8);

  // console.log(originalRole);

  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
      icon: <DashboardIcon className="icon" />,
    },
    {
      path: "/chargingstation",
      name: "Charging Station",
      icon: <EvStationIcon className="icon" />,
    },
    {
      path: "/transaction",
      name: "Transaction",
      icon: <ShowChartIcon className="icon" />,
    },
    {
      path: "/warning",
      name: "Warning",
      icon: <WarningAmberIcon className="icon" />,
    },
    {
      path: "/activity",
      name: "Activity",
      icon: <InfoIcon className="icon" />,
    },
    {
      path: "/report",
      name: "Report",
      icon: <AssessmentIcon className="icon" />,
    },
    {
      path: "/customer",
      name: "Customer",
      icon: <GroupsIcon className="icon" />,
    },
    {
      path: "/logout",
      name: "Logout",
      icon: <LogoutOutlinedIcon className="iconLogout" />,
    },
  ];

  const menuItemClient = [
    {
      path: "/",
      name: "Dashboard",
      icon: <DashboardIcon className="icon" />,
    },
    {
      path: "/chargingStationClient",
      name: "Charging Station",
      icon: <EvStationIcon className="icon" />,
    },
    {
      path: "/logout",
      name: "Logout",
      icon: <LogoutOutlinedIcon className="iconLogout" />,
    },
  ];

  useEffect(() => {
    // console.log("role", role);
  }, []);

  return (
    <div className="container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <div className="logoContainer">
            <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
              <Link to="/">
                <img src={Sonik} alt="logo" />
              </Link>
            </h1>
          </div>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <MenuOutlinedIcon onClick={toggle} />
          </div>
        </div>
        {originalRole === "admin" &&
          menuItem.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className="link"
              activeclassname="active"
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                {item.name}
              </div>
            </Link>
          ))}
        {originalRole !== "admin" &&
          menuItemClient.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className="link"
              activeclassname="active"
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                {item.name}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
