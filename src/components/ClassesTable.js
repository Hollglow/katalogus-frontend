import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import PermissionContext from "./PermissionContext";

export const ClassesTable = (props) => {
  const navigate = useNavigate();
  const handleClickRow = (id) => {
    navigate(`/classes/${id}`)
  }
  const {permissions} = useContext(PermissionContext);
  const filtered = props.data.filter(element => permissions[element] || permissions.osztalyfonoke === element);
  return (
    <TableContainer component={Paper} sx={{margin:'auto', maxWidth:'30%'}}>
      <Table aria-label="paginated table">
        <TableHead>
          <TableRow>
            <TableCell>Osztály</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((classId) => (
            <TableRow key={classId} hover onClick={() => handleClickRow(classId)}>
              <TableCell>
              {classId}
              </TableCell>
            </TableRow>
          ), [])}
        </TableBody>
      </Table>
      </TableContainer>
  )
}