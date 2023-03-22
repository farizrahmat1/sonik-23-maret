import "./reportFiltered.scss";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import SearchBar from "../search-bar/SearchBar";
import { CSVLink } from "react-csv";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
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
import { Link } from "react-router-dom";
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

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

export function ReportFiltered() {
  const [report, setReport] = React.useState([]);
  const [searched, setSearched] = React.useState("");
  const handleChange = (e) => {
    setSearched(e.target.value);
  };
  useEffect(() => {
    const fetchDataReport = async () => {
      try {
        const res = await axios.get("http://localhost:8800/transaction");
        const filterYear = res.data.filter(
          (item) =>
            new Date(item.stop_timestamp).getFullYear() ==
            new Date().getFullYear()
        );

        setReport(filterYear);
      } catch (err) {
        console.log(err);
      }
    };
    if (!searched) {
      fetchDataReport();
    } else {
      const filtered = report.filter((item) =>
        item.NAME.toLowerCase().includes(searched.toLowerCase())
      );
      setReport(filtered);
    }
  }, [searched]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - report.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    if (report.length) {
      // console.log("report", report);
      const countedArray = report.reduce((acc, current) => {
        const existing = acc.find(
          (item) =>
            item.connector_name === current.connector_name &&
            item.NAME === current.NAME
        );
        if (existing) {
          existing.total_usage += 1;
          existing.energy_cost +=
            (current.stop_value - current.start_value) * 2500;
          existing.energy_consumption +=
            current.stop_value - current.start_value;
        } else {
          acc.push({
            NAME: current.NAME,
            connector_name: current.connector_name,
            total_usage: 1,
            energy_cost: (current.stop_value - current.start_value) * 135,
            energy_consumption: current.stop_value - current.start_value,
          });
        }
        return acc;
      }, []);
      setFilterData(countedArray);
      // console.log("counted array >> ", countedArray);
    }
  }, [report]);

  const dataDownload = [];
  if (report.length) {
    for (let i = 0; i < report.length; i++) {
      dataDownload.push({
        ...report[i],
        energy_consumption: report[i].stop_value - report[i].start_value,
        energy_cost: (report[i].stop_value - report[i].start_value) * 135,
        duration:
          (new Date(report[i].stop_timestamp).getTime() -
            new Date(report[i].start_timestamp).getTime()) /
            1000 >=
          60
            ? Math.round(
                (new Date(report[i].stop_timestamp).getTime() -
                  new Date(report[i].start_timestamp).getTime()) /
                  1000 /
                  60
              ) + " m"
            : (new Date(report[i].stop_timestamp).getTime() -
                new Date(report[i].start_timestamp).getTime()) /
                1000 +
              " s",
      });
    }
  }

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
            to="/report"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <FilterAltOutlinedIcon />
          </Link>
        </button>

        <button className="exportCSV">
          <CSVLink
            className="CSVButton"
            data={dataDownload}
            filename={`report Filtered`}
            // filename={`report (${monthDate})`}
          >
            <FileDownloadOutlinedIcon />
          </CSVLink>
        </button>
        <Table
          sx={{ minWidth: 650 }}
          stickyHeader
          aria-label="sticky table"
          className="tableReport"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Connector Name</StyledTableCell>
              <StyledTableCell align="center">Total Usage</StyledTableCell>
              <StyledTableCell align="center">
                Energy Consumption
              </StyledTableCell>
              <StyledTableCell align="center">Energy Cost</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table">
            {(rowsPerPage > 0
              ? filterData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filterData
            ).map((row, index) => (
              <React.Fragment>
                <StyledTableRow>
                  <TableCell component="th" scope="row" key={report.ID}>
                    {index + 1}
                  </TableCell>
                  <TableCell align="center">{row.NAME}</TableCell>
                  <TableCell align="center">{row.connector_name}</TableCell>
                  <TableCell align="center">{row.total_usage}</TableCell>
                  <TableCell align="center">{row.energy_consumption}</TableCell>
                  <TableCell align="center">{row.energy_cost}</TableCell>
                </StyledTableRow>
              </React.Fragment>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 15, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={report.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default ReportFiltered;
