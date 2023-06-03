import { TableCell, TableRow } from "@mui/material";

export const ClassStatisticsTableRow = (props) => {
  return (
    <>
      <TableRow key={props.propKey}>
        <TableCell sx={{ padding: "10px 20px" }}>{props.value}</TableCell>
        <TableCell sx={{ padding: "10px 20px" }}>
          {props.data.female[props.propKey] + props.data.male[props.propKey]}
        </TableCell>
        <TableCell sx={{ padding: "10px 20px" }}>
          {props.data.female[props.propKey]}
        </TableCell>
        <TableCell sx={{ padding: "10px 20px" }}>
          {props.data.male[props.propKey]}
        </TableCell>
      </TableRow>
    </>
  );
};
