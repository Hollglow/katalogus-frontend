import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Stack, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Box, Typography, Divider } from '@mui/material';
import { useState } from 'react';
import EditIcon from "@mui/icons-material/Edit"
import AddIcon from "@mui/icons-material/Add"
import { GradeRow } from './GradeRow';
import { AbsencesRow } from './AbsencesRow';
import { AddAbsence, AddGrade } from '../database/DatabaseInterface';
import { Timestamp } from 'firebase/firestore';


export const GradeTable = (props) => {

  const [open, setOpen] = useState(false);
  const [chosenSubject, setChosenSubject] = useState("");
  const [addedGrade, setAddedGrade] = useState(0);

  const handleCloseGradeDialog = () => {
    setOpen(false);
  }

  const handleOpenGradeDialog = (subject) => {
    setOpen(true);
    setChosenSubject(subject)
  }

  
  const handleAddGrade = async () => {
    handleCloseGradeDialog();
    const result = await AddGrade(chosenSubject, addedGrade, props.studentId, props.studentName);
    setGradesData(gradesData.concat([{
      Datum: Timestamp.fromDate(new Date()),
      Diak: props.studentName,
      Jegy: addedGrade,
      Targy: chosenSubject,
      Torzsszam: props.studentId,
      id: result.id
    }]))
    console.log("added grade");
  }

  const handleAddAbsence = async (subject) => {
    const result = await AddAbsence(subject, props.studentId, props.studentName);
    setAbsencesData(absencesData.concat([{
      Datum: Timestamp.fromDate(new Date()),
      Diak: props.studentName,
      Igazolt: false,
      Targy: subject,
      Torzsszam: props.studentId,
      id: result.id
    }]))
    console.log("added absence");
  }

  const data = props.data.map((doc) => {
    return {...doc.data(), id:doc.id};
  })
  const subjects = props.subjects;
  const absences = props.absences.map((absence) => {
    return {...absence.data(), id:absence.id};
  })
  
  const [editGrades, setEditGrades] = useState(subjects.reduce((acc, cur) => ({...acc, [cur]: false}), {}));
  const [editAbsences, setEditAbsences] = useState(subjects.reduce((acc, cur) => ({...acc, [cur]: false}), {}));

  const handleEditGradeClick = (subject) => {
    setEditGrades({
      ...editGrades,
      [subject]: !editGrades[subject]
    })
  }
  const handleEditAbsenceClick = (subject) => {
    setEditAbsences({
      ...editAbsences,
      [subject]: !editAbsences[subject]
    })
  }

  const [gradesData, setGradesData] = useState(data);
  const [absencesData, setAbsencesData] = useState(absences);

  const onGradeDelete = (id) => {
    setGradesData(gradesData.filter(item => item.id !== id));
  }

  const onAbsenceDelete = (id) => {
    setAbsencesData(absencesData.filter(item => item.id !== id));
  }
  let sum = 0;
  let amount = 0;

  const CalculateAverage = () => {
    if (amount === 0) {
      return 0;
    }
    const res = sum / amount;
    sum = 0;
    amount = 0;
    return res.toFixed(2);
  }

  return (
    <>
    <TableContainer component={Paper} sx={{margin:'auto', maxWidth:'50%'}}>
      <Table aria-label="paginated table">
        <TableHead>
          <TableRow>
            <TableCell>Tantárgy</TableCell>
            <TableCell>Jegyek</TableCell>
            <TableCell width={7}></TableCell>
            <TableCell>Hiányzások</TableCell>
            <TableCell width={7}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {subjects.map((subject) => (
            <TableRow>
              <TableCell>
                {subject}
              </TableCell>
              <TableCell>
                <Stack direction="column">
                {gradesData.map((grade) => {
                  if (grade.Targy === subject) {
                    amount++;
                    sum += parseInt(grade.Jegy);
                    return <GradeRow grade = {grade} edit={editGrades[subject]} onGradeDelete={onGradeDelete}/>
                  }
                  return null
                })}
                {editGrades[subject] &&
                  <IconButton sx={{padding: 0, width: "fit-content", margin: "0 auto"}} onClick={() => handleOpenGradeDialog(subject)}>
                    <AddIcon/>
                  </IconButton>}
                  <Divider/>
                  <Box sx={{ verticalAlign: "middle"}}>
                    <Typography display="inline" sx={{fontSize: 16}}>{CalculateAverage()} </Typography>
                    
                    <Typography display="inline" sx={{color: "gray", fontSize: 10}}>Átlag</Typography>
                  </Box>
                </Stack>
              </TableCell>
              <TableCell>
                <IconButton aria-label="edit" onClick={() => handleEditGradeClick(subject)} >
                  <EditIcon/>
                </IconButton>
              </TableCell>
              <TableCell>
                
              <Stack direction="column">
                {absencesData.map((absence) => {
                  return absence.Targy === subject ? <AbsencesRow absence = {absence} edit={editAbsences[subject]}  onAbsenceDelete={onAbsenceDelete}/> : null
                })}
                {editAbsences[subject] &&
                  <IconButton sx={{padding: 0, width: "fit-content", margin: "0 auto"}} onClick={() => handleAddAbsence(subject)}>
                    <AddIcon/>
                  </IconButton>}
                </Stack>
              </TableCell>
              <TableCell>
                <IconButton aria-label="edit" onClick={() => handleEditAbsenceClick(subject)} >
                  <EditIcon/>
                </IconButton>
              </TableCell>
            </TableRow>
        ))}

          
        </TableBody>
      </Table>
      
    </TableContainer>
    <Dialog open={open} onClose={handleCloseGradeDialog}>
        <DialogTitle>Jegy Hozzáadása</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Töltse ki az alábbi adatokat...
          </DialogContentText>
          <TextField
            disabled="true"
            margin="dense"
            label="Tantárgy"
            type="text"
            variant="standard"
            defaultValue={chosenSubject}
            onChange={(event) => {setChosenSubject(event.target.value)}}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Jegy"
            type="number"
            variant="standard"
            onChange={(event) => {setAddedGrade(event.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseGradeDialog}>Mégse</Button>
          <Button onClick={handleAddGrade}>Tovább</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
