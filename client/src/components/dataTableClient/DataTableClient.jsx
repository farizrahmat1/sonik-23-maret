import * as React from "react";
import "./dataTableClient.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import moment from "moment";
import ListConnector from "../listConnector/ListConnector";
import ListConnectorStatus from "../list-connectorStatus/ListConnectorStatus";
import {FormGroup } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export function DataTableClient() {
  const [chargingStation, setChargingStation] = React.useState([]);
  const [connectorCS, setConnectorCS] = React.useState([]);

  useEffect(() => {
    const fetchDataCS = async () => {
      try {
        const res = await axios.get("http://localhost:8800/cs");
        const res1 = await axios.get("http://localhost:8800/cs/connectorCS");
        setChargingStation(res.data);
        setConnectorCS(res1.data);
        // console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    // console.log(connectorCS);
    // console.log(chargingStation);
    fetchDataCS();
  }, []);

  return (
    <TableContainer component={Paper}>
      <button className="addHome">
        <Link to="/addcs" style={{ color: "inherit", textDecoration: "none" }}>
          <AddCircleOutlineOutlinedIcon />
        </Link>
      </button>
      <Table
        sx={{ minWidth: 650 }}
        aria-label="simple table"
        className="tableCs"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">ID</StyledTableCell>
            <StyledTableCell align="center">City</StyledTableCell>
            <StyledTableCell align="center">Connectors</StyledTableCell>
            <StyledTableCell align="center">Connectors Status</StyledTableCell>
            <StyledTableCell align="center">
              Last Heartbeat Timestamp
            </StyledTableCell>
            <StyledTableCell align="center">
              Last Heartbeat Timestamp Status
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {connectorCS &&
            chargingStation.map((row, index) => (
              <StyledTableRow>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="center">
                  {row.NAME ? row.NAME : "-"}
                </TableCell>
                <TableCell align="center">{row.ID ? row.ID : "-"}</TableCell>
                <TableCell align="center">
                  {row.CITY ? row.CITY : "-"}
                </TableCell>
                <TableCell align="center">
                  <ListConnector chargeBoxID={row.charge_box_id} />
                </TableCell>
                <TableCell align="center">
                  <ListConnectorStatus chargeBoxID={row.charge_box_id} />
                </TableCell>
                <TableCell align="center">
                  {moment(row.last_heartbeat_timestamp).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )}
                </TableCell>
                <TableCell align="center">
                  <div className="heartbeatTimestampStatus">
                    {Date.now() -
                      new Date(row["last_heartbeat_timestamp"]).getTime() <
                    1800000 ? (
                      <FormGroup>
                        <div className="connectedHeartbeatTimestamp">
                          Connected
                        </div>
                      </FormGroup>
                    ) : (
                      <FormGroup>
                        <div className="disconnectedHeartbeatTimestamp">
                          Disconnected
                        </div>
                      </FormGroup>
                    )}
                  </div>
                </TableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTableClient;
