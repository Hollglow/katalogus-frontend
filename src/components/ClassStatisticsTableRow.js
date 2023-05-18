import { IconButton, TableCell, TableRow, TextField, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"
import CheckIcon from "@mui/icons-material/Check"
import { useState } from "react";
import { UpdateClassStatistic } from "../database/DatabaseInterface";
import { useParams } from "react-router-dom";


export const ClassStatisticsTableRow = (props) => {
  const [editing, setEditing] = useState(false);
  const [editFemale, setEditFemale] = useState(props.data.female[props.propKey]);
  const [editMale, setEditMale] = useState(props.data.male[props.propKey]);

  const { classId } = useParams();
  const handleEditClick = () =>{
    setEditing(!editing);
  }

  const handleEditSend = async (gender) => {
    setEditing(!editing);
    await UpdateClassStatistic(classId, gender === "Female" ? "Lany" : "Fiu", props.propKey, gender === "Female" ? editFemale : editMale);
  }

  return (
    <>
      <TableRow key={props.propKey}>
        <TableCell>
          {props.value}
        </TableCell>
        <TableCell>
          {editFemale + editMale}
        </TableCell>
        <TableCell>
          {editing ? <><TextField sx={{display: 'inline-block'}} label="Edit" type="number" variant="standard" defaultValue={editFemale} onChange={(event) => {isNaN(parseInt(event.target.value)) ? setEditFemale(0) : setEditFemale(parseInt(event.target.value))}}></TextField> 
                                        <IconButton sx={{display:"inline-block"}} aria-label="check" onClick={() => handleEditSend("Female")}>
                                          <CheckIcon/>
                                        </IconButton>
                                      </> : editFemale}
        </TableCell>
        <TableCell>
          {editing ? <><TextField sx={{display: 'inline-block'}} label="Edit" type="number" variant="standard" defaultValue={editMale} onChange={(event) => {isNaN(parseInt(event.target.value)) ? setEditMale(0) : setEditMale(parseInt(event.target.value))}}></TextField> 
                                        <IconButton sx={{display:"inline-block"}} aria-label="check" onClick={() => handleEditSend("Male")}>
                                          <CheckIcon/>
                                        </IconButton>
                                      </> : editMale}
        </TableCell>

        <TableCell>
          <IconButton sx={{margin: 0}} aria-label="edit" onClick={handleEditClick}>
            <EditIcon/>
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}