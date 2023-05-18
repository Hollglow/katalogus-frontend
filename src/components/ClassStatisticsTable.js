import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { ClassStatisticsTableRow } from "./ClassStatisticsTableRow";

export const ClassStatisticsTable = (props) => {

  const statisticDictionary = {
    Varosi: "Városi",
    Falusi: "Falusi",
    Elment: "Elment",
    Erkezett: "Érkezett",
    Halasztott: "Évet Halasztott",
    OsztalyIsmetlo: "Osztály Ismétlő",
    IskolaOtthagyas: "Iskola Otthagyás",
    HianyzasbolIsmetlo: "Hiányzás miatt ismétlő"
  }

  return (
    <TableContainer component={Paper} sx={{margin:'auto', maxWidth:'70%'}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Összesen</TableCell>
            <TableCell>Lány</TableCell>
            <TableCell>Fiú</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(statisticDictionary).map(([key, value]) => (
            <ClassStatisticsTableRow propKey = {key} value = {value} data = {props}/>
          ))}

        
        </TableBody>
      </Table>
      
    </TableContainer>
  );
}