import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Stack, Typography } from "@mui/material"
import ClearIcon from "@mui/icons-material/Clear"
import { useContext, useState } from "react"
import { DeleteAbsence, UpdateAbsence } from "../database/DatabaseInterface"
import PermissionContext from "./PermissionContext"

export const AbsencesRow = (props) => {
  const handleToggleAbsence = async (event) => {
    await UpdateAbsence(event.target.name, event.target.checked);
    setConfirmed(!confirmed);
  }

  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(props.absence.Igazolt);

  const handleCloseDialog = () => {
    setOpen(false);
  }

  const handleOpenDialog = () => {
    setOpen(true);
  }

  const handleDelete = async () => {
    handleCloseDialog();
    await DeleteAbsence(props.absence.id);
    props.onAbsenceDelete(props.absence.id);
  }

  const {isAllowedTo} = useContext(PermissionContext);

  return (
    <>
    <Stack direction="row">
    {props.edit && <IconButton aria-label="edit" sx={{padding: 0, margin: "0 10px"}} onClick={handleOpenDialog}>
                      <ClearIcon/>
                    </IconButton>}
    <Box>
      <FormControlLabel disabled={!isAllowedTo(["tanar"])} display="inline" sx={{fontSize: 16}} control={<Checkbox checked={confirmed} inputProps={{ 'aria-label': 'controlled' }} onChange={handleToggleAbsence} name= {props.absence.id} />} label="Igazolt -"/> 
      <Typography display="inline" sx={{color: "gray", fontSize: 10}}>{props.absence.Datum.toDate().toLocaleDateString("en-US")}</Typography>
    </Box>
    </Stack>
    <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Biztos ki akarja törölni az alábbi hiányzást?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography>ID: {props.absence.id}</Typography>
            <Typography>Tantárgy: {props.absence.Targy}</Typography>
            <Typography>Dátum: {props.absence.Datum.toDate().toLocaleDateString("en-US")}</Typography>
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
  )
}