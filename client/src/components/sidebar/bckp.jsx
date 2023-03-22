import "./sidebar.scss";
import React, { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EvStationIcon from "@mui/icons-material/EvStation";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoIcon from "@mui/icons-material/Info";
import AssessmentIcon from "@mui/icons-material/Assessment";
import GroupsIcon from "@mui/icons-material/Groups";
import { Link } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PersonIcon from '@mui/icons-material/Person';

const Sidebar = () => {

  return (
    <div className="sidebar">
      <div className="top">
        <Link
          to="/"
          style={{ textDecoration: "none" }}
          activeclassName="active"
        >
          <span className="logo">SONIK</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">
            MENU
            <button>
              <MenuOutlinedIcon className="icon" />
            </button>
          </p>

          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span activeclassName="active">Dashboard</span>
            </li>
          </Link>

          <Link to="/chargingstation" style={{ textDecoration: "none" }}>
            <li>
              <EvStationIcon className="icon" />
              <span activeclassName="active">Charging Station</span>
            </li>
          </Link>

          <Link to="/transaction" style={{ textDecoration: "none" }}>
            <li>
              <ShowChartIcon className="icon" />
              <span>Transaction</span>
            </li>
          </Link>

          <li>
            <WarningAmberIcon className="icon" />
            <span>Warning</span>
          </li>
          
          <Link to="/activity" style={{ textDecoration: "none" }}>
            <li>
              <InfoIcon className="icon" />
              <span>Activity</span>
            </li>
          </Link>

          <Link to="/report" style={{ textDecoration: "none" }}>
            <li>
              <AssessmentIcon className="icon" />
              <span>Report</span>
            </li>
          </Link>
          
          <Link to="/customer" style={{ textDecoration: "none" }}>
            <li>
              <GroupsIcon className="icon" />
              <span>Customer</span>
            </li>
          </Link>

        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  );
};

export default Sidebar;
