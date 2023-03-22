import "./customertable.scss";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import SearchBar from "../search-bar/SearchBar";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";

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

export function CustomerTable() {
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
        // return res.data;
        setCustomer(res.data);
        setCustomerTransaction(resTransaction.data);
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

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <SearchBar
        type={"text"}
        placeholder={"search"}
        onChange={handleChange}
        value={searched}
      />
      <TableContainer component={Paper}>
        <button className="addHome">
          <Link
            to="/addCustomer"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <AddCircleOutlineOutlinedIcon />
          </Link>
        </button>
        <button className="exportCSV">
          <CSVLink className="CSVButton" data={customer}>
            <FileDownloadOutlinedIcon />
          </CSVLink>
        </button>
        <Table
          sx={{ minWidth: 650 }}
          stickyHeader
          aria-label="sticky table"
          className="tableCustomer"
          // input={inputText}
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Tag ID</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Phone Number</StyledTableCell>
              <StyledTableCell align="center">Detail Customer</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table">
            {customer &&
              customer.map((row, index) => (
                <React.Fragment>
                  <StyledTableRow>
                    <TableCell component="th" scope="row" key={customer.ID}>
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">
                      {row.NAME ? row.NAME : "-"}
                    </TableCell>
                    <TableCell align="center">
                      {row.id_tag ? row.id_tag : "-"}
                    </TableCell>
                    <TableCell align="center">
                      {row.EMAIL ? row.EMAIL : "-"}
                    </TableCell>
                    <TableCell align="center">
                      {row.ADDRESS ? row.ADDRESS : "-"}
                    </TableCell>
                    <TableCell align="center">
                      {row.PHONE_NUMBER ? row.PHONE_NUMBER : "-"}
                    </TableCell>
                    <TableCell align="center">
                      <button className="customerDetail">
                        <Link
                          to={`/detailCustomer/${row.ID}`}
                          style={{ color: "inherit", textDecoration: "none" }}
                        >
                          <NavigateNextOutlinedIcon />
                        </Link>
                      </button>
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

export default CustomerTable;
