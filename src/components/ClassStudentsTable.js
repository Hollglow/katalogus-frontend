import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";

export const ClassStudentsTable = (props) => {
  const tableHeader = props.id ? <TableCell>{props.id}</TableCell> : <TableCell>Név</TableCell>;
  console.log(props.filter);
  return (
    <TableContainer component={Paper} sx={{margin:'auto', maxWidth:'50%'}}>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeader}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(props.students).map(([id, student]) => (
            student.toLowerCase().includes(props.filter.toLowerCase()) && <TableRow key={id}>
              <Button component={RouterLink} to={`/students/${id}`} sx={{width:'-moz-available', display:'block'}}>
                <TableCell>{student}</TableCell>
              </Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

