import * as React from "react";
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
import { CSVLink } from "react-csv";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import moment from "moment";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import "./customertransactiontable.scss";

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

export function CustomerTransactionTable(props) {
  const [customer, setCustomer] = React.useState([]);
  const [customerTransaction, setCustomerTransaction] = React.useState([]);
  const [searched, setSearched] = React.useState("");

  const handleChange = (e) => {
    setSearched(e.target.value);
  };
  useEffect(() => {
    const fetchDataCustomer = async () => {
      try {
        const res = await axios.get("http://localhost:8800/customer");
        const resTransaction = await axios.get(
          "http://localhost:8800/transactionCustomer"
        );
        const data = resTransaction.data.filter(
          (item) => item.id_tag === props.idTag
        );
        // console.log("idtag", props.idTag);
        // console.log("data", data);
        // return res.data;
        setCustomer(res.data);
        setCustomerTransaction(data);
      } catch (err) {
        console.log(err);
      }
    };
    if (!searched) {
      fetchDataCustomer();
    } else {
      const filtered = customer.filter((item) =>
        item.NAME.toLowerCase().includes(searched.toLowerCase())
      );
      setCustomer(filtered);
    }
  }, [searched]);

  const dataDownload = [];
  if (customerTransaction.length) {
    for (let i = 0; i < customerTransaction.length; i++) {
      dataDownload.push({ ...customerTransaction[i] });
    }
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper}>
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
              <StyledTableCell align="center">Transaction PK</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">ID Tag</StyledTableCell>
              <StyledTableCell align="center">Error Code</StyledTableCell>
              <StyledTableCell align="center">Start Value</StyledTableCell>
              <StyledTableCell align="center">Stop Value </StyledTableCell>
              <StyledTableCell align="center">
                Energy Consumption
              </StyledTableCell>
              <StyledTableCell align="center">Event Timestamp</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table">
            {customerTransaction.map((row, index) => (
              <React.Fragment>
                <StyledTableRow>
                  <TableCell component="th" scope="row" key={index}>
                    {index + 1}
                  </TableCell>
                  <TableCell align="center">{row.transaction_pk}</TableCell>
                  <TableCell align="center">{row.NAME}</TableCell>
                  <TableCell align="center">{row.id_tag}</TableCell>
                  <TableCell align="center">
                    {row.error_code ? row.error_code : "NoError"}
                  </TableCell>
                  <TableCell align="center">{row.start_value}</TableCell>
                  <TableCell align="center">{row.stop_value}</TableCell>

                  <TableCell align="center">
                    {row.stop_value - row.start_value}
                  </TableCell>
                  <TableCell align="center">
                    {moment(row.event_timestamp).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
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

export default CustomerTransactionTable;
