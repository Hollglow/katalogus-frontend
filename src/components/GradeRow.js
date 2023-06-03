import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import { DeleteGrade } from "../database/DatabaseInterface";

export const GradeRow = (props) => {
  const [open, setOpen] = useState(false);

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleDelete = async () => {
    handleCloseDialog();
    await DeleteGrade(props.grade.id);
    props.onGradeDelete(props.grade.id);
  };
  return (
    <>
      <Stack direction="row">
        {props.edit && (
          <IconButton
            aria-label="edit"
            sx={{ padding: 0, margin: "0 10px" }}
            onClick={handleOpenDialog}
          >
            <ClearIcon />
          </IconButton>
        )}
        <Box sx={{ verticalAlign: "middle" }}>
          <Typography display="inline" sx={{ fontSize: 16 }}>
            {props.grade.Jegy} -{" "}
          </Typography>
          <Typography display="inline" sx={{ color: "gray", fontSize: 10 }}>
            {props.grade.Datum.toDate().toLocaleDateString("en-US")}
          </Typography>
        </Box>
      </Stack>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Biztos ki akarja törölni az alábbi jegyet?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography>ID: {props.grade.id}</Typography>
            <Typography>Tantárgy: {props.grade.Targy}</Typography>
            <Typography>Jegy: {props.grade.Jegy}</Typography>
            <Typography>
              Dátum: {props.grade.Datum.toDate().toLocaleDateString("en-US")}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>Tovább</Button>
          <Button onClick={handleCloseDialog} autoFocus>
            Mégse
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
