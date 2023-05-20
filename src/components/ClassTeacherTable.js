import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { useState } from "react"
import { GetAllSubjectsAndTeachers } from "../database/DatabaseInterface";

export const ClassTeacherTable = (props) => {

  const [open, setOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [allTeachers, setAllTeachers] = useState([]); 
  const [allSubjects, setAllSubjects] = useState([]); 
  const handleOpenSubstituteTeacherDialog = async () => {
    const data = await GetAllSubjectsAndTeachers();
    setAllSubjects(data.data().Tantargyak);
    setAllTeachers(data.data().Tanarok);
    console.log(data);
    setOpen(true);

  }

  const handleCloseSubstituteTeacherDialog = () => {
    setOpen(false);
  }

  const handleSelectedTeacherChange = (event, newValue) => {
    setSelectedTeacher(newValue);
  }
  const handleSelectedSubjectChange = (event, newValue) => {
    setSelectedSubject(newValue);
  }

  const handleAddSubstituteTeacher = () => {
    setOpen(false);
  }
  return (
    <>
    <TableContainer component={Paper} sx={{margin:'', maxWidth:'30%'}}>
      <Table aria-label="paginated table">
        <TableHead>
          <TableRow>
            <TableCell>Név</TableCell>
            <TableCell>Tantárgy</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(props.data.Tanarok).map(([subject, teacher]) => (
            <TableRow key={subject}>
              <TableCell>
                {teacher}
              </TableCell>
              <TableCell>
                {subject}
              </TableCell>
            </TableRow>
          ))}
          <TableRow key="add">
              <TableCell>
              <IconButton sx={{padding: 1, width: "fit-content", margin: "0 auto"}} onClick={handleOpenSubstituteTeacherDialog}>
                <AddIcon/>
              </IconButton>
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleCloseSubstituteTeacherDialog}>
      <DialogTitle>Tanárhelyettes Hozzáadása</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Töltse ki az alábbi adatokat...
        </DialogContentText>
        <Autocomplete
          sx={{minWidth: 150}}
          id="combo-box"
          options={allTeachers}
          onChange={handleSelectedTeacherChange}
          renderInput={(params) => <TextField {...params} label="Tanár" />}
        />
        <Autocomplete
          sx={{minWidth: 150}}
          id="combo-box"
          options={allSubjects}
          onChange={handleSelectedSubjectChange}
          renderInput={(params) => <TextField {...params} label="Tantárgy" />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseSubstituteTeacherDialog}>Mégse</Button>
        <Button onClick={handleAddSubstituteTeacher}>Tovább</Button>
      </DialogActions>
    </Dialog>
    </>
  )
}