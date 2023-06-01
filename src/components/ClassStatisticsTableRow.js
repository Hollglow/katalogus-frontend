import { TableCell, TableRow } from "@mui/material";

export const ClassStatisticsTableRow = (props) => {
  return (
    <>
      <TableRow key={props.propKey}>
        <TableCell>
          {props.value}
        </TableCell>
        <TableCell>
          {props.data.female[props.propKey] + props.data.male[props.propKey]}
        </TableCell>
        <TableCell>
          {props.data.female[props.propKey]}
        </TableCell>
        <TableCell>
          {props.data.male[props.propKey]}
        </TableCell>
      </TableRow>
    </>
  );
}