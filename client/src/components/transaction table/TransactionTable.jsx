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
import { CSVLink } from "react-csv";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import SearchBar from "../search-bar/SearchBar";
import { Link } from "react-router-dom";
import moment from "moment";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import "./transactiontable.scss";

const lstMonth = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];
const d = new Date();
const month = d.getMonth();
const monthName = lstMonth[month];
const year = d.getFullYear();
const monthDate = `${year}-${month + 1}`;

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

export function TransactionTable() {
  const [filteredDataTransaction, setFilteredDataTransaction] = React.useState(
    []
  );
  const [transactionStart, setTransactionStart] = React.useState([]);
  const [searched, setSearched] = React.useState("");

  const handleChange = (e) => {
    setSearched(e.target.value);
  };

  const dataDownload = [];
  if (transactionStart.length) {
    for (let i = 0; i < transactionStart.length; i++) {
      dataDownload.push({
        ...transactionStart[i],
        energy_consumption:
          transactionStart[i].stop_value - transactionStart[i].start_value,
        energy_cost:
          (transactionStart[i].stop_value - transactionStart[i].start_value) *
          135,
        duration:
          (new Date(transactionStart[i].stop_timestamp).getTime() -
            new Date(transactionStart[i].start_timestamp).getTime()) /
            1000 >=
          60
            ? Math.round(
                (new Date(transactionStart[i].stop_timestamp).getTime() -
                  new Date(transactionStart[i].start_timestamp).getTime()) /
                  1000 /
                  60
              ) + " m"
            : (new Date(transactionStart[i].stop_timestamp).getTime() -
                new Date(transactionStart[i].start_timestamp).getTime()) /
                1000 +
              " s",
      });
    }
  }
  useEffect(() => {
    const fetchDataTransaction = async () => {
      try {
        const res1 = await axios.get("http://localhost:8800/transaction");
        const dataFilter = res1.data.sort((a, b) =>
          a.transaction_pk > b.transaction_pk ? 1 : -1
        );
        //JANGAN LUPA BIKIN SATU COMPONENT UNTUK FILTER DATA PER BULAN
        // setTransactionStart(res1.data.filter((item)=> new Date(item.stop_timestamp).getMonth() == new Date().getMonth()));
        setTransactionStart(dataFilter);
      } catch (err) {
        console.log(err);
      }
      fetchDataTransaction();
    };

    if (!searched) {
      fetchDataTransaction();
    } else {
      const filtered = transactionStart.filter((item) =>
        item.NAME.toLowerCase().includes(searched.toLowerCase())
      );
      // setTransactionStart(filtered);
      setFilteredDataTransaction(filtered);
    }
  }, [searched]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <SearchBar
        type={"text"}
        placeholder={"search"}
        onChange={handleChange}
        value={searched}
      />
      <TableContainer component={Paper}>
        <button className="buttonChart">
          <Link
            to="/transaction"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <FilterAltOutlinedIcon />
          </Link>
        </button>

        <button className="buttonChart">
          <Link
            to="/transactionFilter"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <TodayOutlinedIcon />
          </Link>
        </button>
        <button className="buttonChart">
          <CSVLink
            className="CSVButton"
            data={dataDownload}
            filename={`transaction (${monthDate})`}
          >
            <FileDownloadOutlinedIcon />
          </CSVLink>
        </button>
        <Table
          sx={{ minWidth: 650 }}
          stickyHeader
          aria-label="sticky table"
          className="tableTransaction"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Connector Name</StyledTableCell>
              <StyledTableCell align="center">Transaction PK</StyledTableCell>
              <StyledTableCell align="center">Tag ID</StyledTableCell>
              <StyledTableCell align="center">Start Timestamp</StyledTableCell>
              <StyledTableCell align="center">Start Value</StyledTableCell>
              <StyledTableCell align="center">Stop Timestamp</StyledTableCell>
              <StyledTableCell align="center">Stop Value</StyledTableCell>
              <StyledTableCell align="center">
                Energy Consumption
              </StyledTableCell>
              <StyledTableCell align="center">Energy Cost</StyledTableCell>
              <StyledTableCell align="center">Duration</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table">
            {/* {list} */}
            {/* {transaction && */}
            {searched
              ? filteredDataTransaction.map((row, index) => (
                  <React.Fragment>
                    <StyledTableRow>
                      <TableCell component="th" scope="row" key={index}>
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">{row.NAME}</TableCell>
                      <TableCell align="center">{row.connector_name}</TableCell>
                      <TableCell align="center">{row.transaction_pk}</TableCell>
                      <TableCell align="center">{row.id_tag}</TableCell>
                      <TableCell align="center">
                        {moment(row.start_timestamp).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </TableCell>
                      <TableCell align="center">{row.start_value}</TableCell>
                      <TableCell align="center">
                        {moment(row.stop_timestamp).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </TableCell>
                      <TableCell align="center">{row.stop_value}</TableCell>
                      <TableCell align="center">
                        {row.stop_value - row.start_value}
                      </TableCell>
                      <TableCell align="center">
                        Rp. {(row.stop_value - row.start_value) * 135}
                      </TableCell>
                      <TableCell align="center">
                        {(new Date(row.stop_timestamp).getTime() -
                          new Date(row.start_timestamp).getTime()) /
                          1000 >=
                        60
                          ? Math.round(
                              (new Date(row.stop_timestamp).getTime() -
                                new Date(row.start_timestamp).getTime()) /
                                1000 /
                                60
                            ) + " m"
                          : (new Date(row.stop_timestamp).getTime() -
                              new Date(row.start_timestamp).getTime()) /
                              1000 +
                            " s"}
                      </TableCell>
                    </StyledTableRow>
                  </React.Fragment>
                ))
              : transactionStart.map((row, index) => (
                  <React.Fragment>
                    <StyledTableRow>
                      <TableCell component="th" scope="row" key={index}>
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">{row.NAME}</TableCell>
                      <TableCell align="center">{row.connector_name}</TableCell>
                      <TableCell align="center">{row.transaction_pk}</TableCell>
                      <TableCell align="center">{row.id_tag}</TableCell>
                      <TableCell align="center">
                        {moment(row.start_timestamp).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </TableCell>
                      <TableCell align="center">{row.start_value}</TableCell>
                      <TableCell align="center">
                        {moment(row.stop_timestamp).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </TableCell>
                      <TableCell align="center">{row.stop_value}</TableCell>
                      <TableCell align="center">
                        {row.stop_value - row.start_value}
                      </TableCell>
                      <TableCell align="center">
                        Rp. {(row.stop_value - row.start_value) * 135}
                      </TableCell>
                      <TableCell align="center">
                        {(new Date(row.stop_timestamp).getTime() -
                          new Date(row.start_timestamp).getTime()) /
                          1000 >=
                        60
                          ? Math.round(
                              (new Date(row.stop_timestamp).getTime() -
                                new Date(row.start_timestamp).getTime()) /
                                1000 /
                                60
                            ) + " m"
                          : (new Date(row.stop_timestamp).getTime() -
                              new Date(row.start_timestamp).getTime()) /
                              1000 +
                            " s"}
                      </TableCell>
                    </StyledTableRow>
                  </React.Fragment>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default TransactionTable;
