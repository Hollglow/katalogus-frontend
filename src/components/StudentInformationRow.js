import { IconButton, TextField, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import { UpdateStudentInformation } from "../database/DatabaseInterface";
import { useParams } from "react-router-dom";
import Restricted from "./Restricted";

export const StudentInformationRow = (props) => {
  const [editing, setEditing] = useState(false);
  const [edit, setEdit] = useState(false);

  const { studentId } = useParams();

  const handleEditClick = () => {
    setEditing(!editing);
  };

  const handleEditSend = async () => {
    try {
      await UpdateStudentInformation(props.data.key, edit, studentId);
    } catch (err) {
      console.error(err);
    }
    props.data.value = edit;
    setEditing(!editing);
  };

  console.log(typeof props.data.value);

  const editableComponent = editing ? (
    <Restricted to={["tanar"]}>
      <TextField
        sx={{ display: "inline-block" }}
        label="Edit"
        variant="standard"
        defaultValue={props.data.value}
        onChange={(event) => {
          setEdit(event.target.value);
        }}
      ></TextField>
      <IconButton
        sx={{ display: "inline-block" }}
        aria-label="check"
        onClick={handleEditSend}
      >
        <CheckIcon />
      </IconButton>
    </Restricted>
  ) : (
    <Typography sx={{ display: "inline-block" }}>{props.data.value}</Typography>
  );

  return (
    <>
      {editableComponent}
      <Restricted to={["tanar"]}>
        <IconButton
          sx={{ float: "right", margin: 0 }}
          aria-label="edit"
          onClick={handleEditClick}
        >
          <EditIcon />
        </IconButton>
      </Restricted>
    </>
  );
};
