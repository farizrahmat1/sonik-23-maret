import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./detailcs.scss";
import axios from "axios";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import moment from "moment";
import CSConnector from "../../components/chargingStation-Connector/CSConnector";
import { FormGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

const DetailCS = () => {
  const role = localStorage.getItem("role")
    ? JSON.parse(localStorage.getItem("role"))
    : "";
  const bytes = CryptoJS.AES.decrypt(role, "10");
  const originalRole = bytes.toString(CryptoJS.enc.Utf8);

  useEffect(() => {
    if (originalRole !== "admin") navigate("/");
  }, []);
  useEffect(() => {
    getCs();
  }, []);

  // useEffect(() => {
  //   getConnector();
  // }, []);

  const location = useLocation();
  const csId = location.pathname.split("/")[2];

  const [chargingStation, setChargingStation] = useState("");

  const getCs = async () => {
    const response = await axios.get(
      `http://localhost:8800/cs/${csId}`,
      chargingStation
    );
    // console.log(response.data);
    setChargingStation(response.data);
  };

  // const [connectorCS, setConnectorCS] = React.useState([]);

  // useEffect(() => {
  //   const fetchDataConnector = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:8800/cs/connectorCS");
  //       setConnectorCS(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   console.log(connectorCS);
  //   // console.log(chargingStation)
  //   fetchDataConnector();
  // }, []);

  // const StyledTableCell = styled(TableCell)(({ theme }) => ({
  //   [`&.${tableCellClasses.head}`]: {
  //     backgroundColor: theme.palette.common.black,
  //     color: theme.palette.common.white,
  //     fontWeight: 600,
  //   },
  //   [`&.${tableCellClasses.body}`]: {
  //     fontSize: 14,
  //   },
  // }));

  // const StyledTableRow = styled(TableRow)(({ theme }) => ({
  //   "&:nth-of-type(odd)": {
  //     backgroundColor: theme.palette.action.hover,
  //   },
  //   // hide last border
  //   "&:last-child td, &:last-child th": {
  //     border: 0,
  //   },
  // }));

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      // console.log(token);
      navigate("/login");
    }
  }, [token]);
  return (
    <div className="detailCS">
      <Sidebar />
      <div className="detailContainer">
        <Navbar />
        {chargingStation && (
          <div className="detailBox">
            <div className="card">
              <span className="detailTitle">ID: </span>
              <p className="shortText">{chargingStation.ID}</p>
            </div>
            <div className="card">
              <span className="detailTitle">Charging Station Name: </span>
              <p className="shortText">
                {chargingStation.NAME ? chargingStation.NAME : "-"}
              </p>
            </div>
            <div className="card">
              <span className="detailTitle">Charging Station ID: </span>
              <p className="shortText">
                {chargingStation.ID ? chargingStation.ID : "-"}
              </p>
            </div>
            <div className="card">
              <span className="detailTitle">Charge Box PK: </span>
              <p className="shortText">
                {chargingStation.charge_box_pk
                  ? chargingStation.charge_box_pk
                  : "-"}
              </p>
            </div>
            <div className="card">
              <span className="detailTitle">Charge Box ID: </span>
              <p className="shortText">
                {chargingStation.charge_box_id
                  ? chargingStation.charge_box_id
                  : "-"}
              </p>
            </div>
            <div className="card">
              <span className="detailTitle">Endpoint Access: </span>
              <p className="shortText">
                {chargingStation.ENDPOINT_ADDRESS
                  ? chargingStation.ENDPOINT_ADDRESS
                  : "-"}
              </p>
            </div>
            <div className="card">
              <span className="detailTitle">City: </span>
              <p className="shortText">
                {chargingStation.CITY ? chargingStation.CITY : "-"}
              </p>
            </div>
            <div className="card">
              <span className="detailTitle">Location: </span>
              <p className="longText">
                {chargingStation.LOCATION ? chargingStation.LOCATION : "-"}
              </p>
            </div>
            <div className="card">
              <span className="detailTitle">Longitude: </span>
              <p className="shortText">
                {chargingStation.LONGITUDE ? chargingStation.LONGITUDE : "-"}
              </p>
            </div>
            <div className="card">
              <span className="detailTitle">Latitude: </span>
              <p className="shortText">
                {chargingStation.LATITUDE ? chargingStation.LATITUDE : "-"}
              </p>
            </div>
            <div className="card">
              <span className="detailTitle">Google Map Link: </span>
              <p className="shortText">
                {chargingStation.GOOGLE_MAP_LINK
                  ? chargingStation.GOOGLE_MAP_LINK
                  : "-"}
              </p>
            </div>
            <div className="card">
              <span className="detailTitle">General Price: </span>
              <p className="shortText">
                {chargingStation.GENERAL_PRICE
                  ? chargingStation.GENERAL_PRICE
                  : "-"}
              </p>
            </div>
            <div className="card">
              <span className="detailTitle">Overall Status: </span>
              <p className="shortText">
                {chargingStation.OVERALL_STATUS
                  ? chargingStation.OVERALL_STATUS
                  : "-"}
              </p>
            </div>
            <div className="card">
              <span className="detailTitle">Last Heartbeat Timestamp: </span>
              <p className="shortText">
                {moment(chargingStation.last_heartbeat_timestamp).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )}
              </p>
            </div>
            <div className="card">
              <span className="detailTitle">
                Last Heartbeat Timestamp Status:{" "}
              </span>
              <div className="heartbeatTimestampStatus">
                {Date.now() -
                  new Date(
                    chargingStation["last_heartbeat_timestamp"]
                  ).getTime() <
                1800000 ? (
                  <FormGroup>
                    <div className="connectedHeartbeatTimestamp">Connected</div>
                  </FormGroup>
                ) : (
                  <FormGroup>
                    <div className="disconnectedHeartbeatTimestamp">
                      Disconnected
                    </div>
                  </FormGroup>
                )}
              </div>
            </div>
            <div className="card">
              <span className="detailTitle">Is Active: </span>
              <p className="shortText">
                {chargingStation.IS_ACTIVE ? chargingStation.IS_ACTIVE : "-"}
              </p>
            </div>
          </div>
        )}
        {chargingStation && (
          <div className="connectorTable">
            <h3>Charging Station Status</h3>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                aria-label="simple table"
                className="tableCs"
              >
                <TableHead></TableHead>
                {/* {console.log("chargingstation", chargingStation)} */}
                <CSConnector chargeBoxID={chargingStation.charge_box_id} />
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailCS;
