import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export const PaginatedStudentTable = (props) => {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickRow = (id) => {
    navigate(`/students/${id}`);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const classHeader = props.classId ? (
    <Button
      sx={{
        textAlign: "center",
        display: "block",
        width: "fit-content",
        margin: "0px auto 10px",
        fontSize: 30,
      }}
      component={RouterLink}
      variant="outlined"
      size="large"
      to={`/classes/${props.classId}`}
    >
      {props.classId}
    </Button>
  ) : null;

  const filteredData = props.filter
    ? Object.fromEntries(
        Object.entries(props.data).filter(([id, student]) =>
          student.toLowerCase().includes(props.filter.toLowerCase())
        )
      )
    : props.data;
  const dataLength = Object.entries(filteredData).length;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, dataLength - page * rowsPerPage);

  return (
    <>
      {classHeader}
      <TableContainer
        component={Paper}
        sx={{
          margin: props.margin ? "" : "auto",
          maxWidth: "50%",
          minWidth: "30%",
        }}
      >
        <Table aria-label="paginated table">
          <TableHead>
            <TableRow>
              <TableCell>Név</TableCell>
              <TableCell>Törzsszám</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? Object.entries(filteredData).slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : Object.entries(filteredData)
            ).map(([id, student]) => (
              <TableRow key={id} hover onClick={() => handleClickRow(id)}>
                <TableCell sx={{ padding: "10px 20px" }}>{student}</TableCell>
                <TableCell sx={{ padding: "10px 20px" }}>{id}</TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow sx={{ height: 53 * emptyRows }}>
                <TableCell colSpan={2} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataLength}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
};
