import "./warningtable.scss";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import SearchBar from "../search-bar/SearchBar";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import { useTheme } from "@mui/material/styles";
import LastPageIcon from "@mui/icons-material/LastPage";

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


export function WarningTable() {
  const [warning, setWarning] = React.useState([]);
  const [searched, setSearched] = React.useState("");

  const handleChange = (e) => {
    setSearched(e.target.value);
  };
  useEffect(() => {
    const fetchDataWarning = async () => {
      try {
        const res = await axios.get("http://localhost:8800/warning");
        setWarning(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (!searched) {
      fetchDataWarning();
    } else {
      const filtered = warning.filter((item) =>
        item.NAME.toLowerCase().includes(searched.toLowerCase())
      );
      setWarning(filtered);
    }
  }, [searched]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - warning.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper}>
        <SearchBar
          type={"text"}
          placeholder={"search by name"}
          onChange={handleChange}
          value={searched}
        />
        <button className="exportCSV">
          <CSVLink className="CSVButton" data={warning}>
            <FileDownloadOutlinedIcon />
          </CSVLink>
        </button>
        <Table
          sx={{ minWidth: 650 }}
          stickyHeader
          aria-label="sticky table"
          className="tableWarning"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Charge Box ID</StyledTableCell>
              <StyledTableCell align="center">Connector Name</StyledTableCell>
              <StyledTableCell align="center">Error Code</StyledTableCell>
              <StyledTableCell align="center">Error Info</StyledTableCell>
              <StyledTableCell align="center">Vendor ID</StyledTableCell>
              <StyledTableCell align="center">
                Vendor Error Code
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table">
            {/* {warning.map((row, index) => ( */}
            {(rowsPerPage > 0
              ? warning.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : warning
            ).map((row, index) => (
              <React.Fragment>
                <StyledTableRow>
                  <TableCell component="th" scope="row" key={warning.ID}>
                    {index + 1}
                  </TableCell>
                  <TableCell align="center">{warning[index].NAME}</TableCell>
                  <TableCell align="center">
                    {warning[index].charge_box_id}
                  </TableCell>
                  <TableCell align="center">
                    {warning[index].connector_name}
                  </TableCell>
                  <TableCell align="center">
                    {warning[index].error_code
                      ? warning[index].error_code
                      : "-"}
                  </TableCell>
                  <TableCell align="center">
                    {warning[index].error_info
                      ? warning[index].error_info
                      : "-"}
                  </TableCell>
                  <TableCell align="center">
                    {warning[index].vendor_id ? warning[index].vendor_id : "-"}
                  </TableCell>
                  <TableCell align="center">
                    {warning[index].vendor_error_code
                      ? warning[index].vendor_error_code
                      : "-"}
                  </TableCell>
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
                count={warning.length}
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

export default WarningTable;
