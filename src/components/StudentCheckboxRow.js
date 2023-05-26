import { Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";
import { DecrementStudentStatistic, IncrementStudentStatistic, UpdateStudentInformation } from "../database/DatabaseInterface";

export const StudentCheckboxRow = (props) => {

  const handleToggle = async (event) => {
    setConfirmed(!confirmed);
    console.log(props);
    UpdateStudentInformation(props.data.key, event.target.checked, props.data.id);
    if (event.target.checked === true) {
      IncrementStudentStatistic(props.data.class, props.data.gender, props.data.key)
    } else {
      DecrementStudentStatistic(props.data.class, props.data.gender, props.data.key)
    }
  }

  const [confirmed, setConfirmed] = useState(props.data.value);
  return (
    <FormControlLabel display="inline" sx={{fontSize: 16}} control={<Checkbox checked={confirmed} inputProps={{ 'aria-label': 'controlled' }} onChange={handleToggle} name= {props.data.key} />}/> 
  );
}