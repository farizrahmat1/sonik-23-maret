import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import ListConnectorStatus from "../list-connectorStatus/ListConnectorStatus";
import ListConnector from "../listConnector/ListConnector";
import "./CSConnector.scss";

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

export function CSConnector(props) {
  const [infoData, setInfoData] = useState();
  const [data, setData] = useState();
  useEffect(() => {
    if (props.chargeBoxID) {
      const fetchData = async () => {
        try {
          // console.log("chagebox", props.chargeBoxID);
          const data = await axios.get(
            `http://localhost:8800/connectorStatus/${props.chargeBoxID}`
          );
          // console.log("data", data);
          setData(data.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (data) {
      const filteredData = data.reduce((acc, current) => {
        const existing = acc.find(
          (item) => item.connector_name === current.connector_name
        );
        if (!existing) {
          acc.push(current);
        } else if (current.status_timestamp > existing.status_timestamp) {
          existing.status_timestamp = current.status_timestamp;
          existing.connector_status_id = current.connector_status_id;
          existing.status = current.status;
        }
        return acc;
      }, []);
      // console.log("filteredData", filteredData);
      setInfoData(filteredData);
    }
  }, [data]);
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          stickyHeader
          aria-label="sticky table"
          className="tableTransaction"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="center">Charge Box ID</StyledTableCell>
              <StyledTableCell align="center">Connector Type</StyledTableCell>
              <StyledTableCell align="center">Connector Status</StyledTableCell>
              {/* <StyledTableCell align="center">Error Code</StyledTableCell>
              <StyledTableCell align="center">Socket Status</StyledTableCell>
              <StyledTableCell align="center">Leakage Status</StyledTableCell>
              <StyledTableCell align="center">MCB Status</StyledTableCell>
              <StyledTableCell align="center">Grounding Status</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody className="table">
            {infoData &&
              infoData.map((row, index) => (
                <React.Fragment>
                  <StyledTableRow>
                    <TableCell component="th" scope="row" key={index}>
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{row.charge_box_id}</TableCell>
                    <TableCell align="center">
                      <ListConnector chargeBoxID={row.charge_box_id} />
                    </TableCell>
                    <TableCell align="center">
                      <ListConnectorStatus chargeBoxID={row.charge_box_id} />
                    </TableCell>
                    {/* <TableCell align="center">{row.STATUS_SOCKET}</TableCell>
                    <TableCell align="center">{row.STATUS_LEAKAGE}</TableCell>
                    <TableCell align="center">{row.STATUS_MCB}</TableCell>
                    <TableCell align="center">{row.STATUS_GROUNDING}</TableCell>
                    <TableCell align="center">{row.OVERALL_STATUS}</TableCell> */}
                  </StyledTableRow>
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default CSConnector;
