import { CircularProgress, Box } from "@mui/material";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../config/firebase";
import { useLoaderData, useNavigation } from "react-router-dom";
import { merge } from 'lodash';
import { StudentProfileCard } from "../components/StudentProfileCard";
import { StudentInformationCard } from "../components/StudentInformationCard";
import { StudentGradesCard } from "../components/StudentGradesCard";

export const StudentPage = () =>{
  const data = useLoaderData();
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <CircularProgress />;
  }
  return(
    <>
    <Box sx={{display: "flex"}}>
      <StudentProfileCard data = {data}/>
      <StudentInformationCard data = {data}/>
    </Box>
    <StudentGradesCard data = {data.grades} subjects = {data.subjects} absences = {data.absences} studentName={data.Nev} studentId={data.studentId}/>
    </>
  );
}

export const studentLoader = async (params) => {
  const tanuloRef = doc(firestore, "Tanulok", params.studentId);
  const gradeRef = collection(firestore, "Jegyek");
  const gradeQuery = query(gradeRef, where("Torzsszam", "==", params.studentId));
  const subjectsRef = collection(firestore, "Tantargyak");
  const absencesRef = collection(firestore, "Hianyzasok");
  const absenceQuery = query(absencesRef, where("Torzsszam", "==", params.studentId))
  try {
    const tanuloSnap = await getDoc(tanuloRef);
    const tanuloInfoSnap = await getDoc(doc(tanuloRef, "Informaciok", "Informacio"));
    const studentGradeSnap = await getDocs(gradeQuery);
    const subjects = await getDocs(subjectsRef);
    const absences = await getDocs(absenceQuery);
    return merge(tanuloSnap.data(), tanuloInfoSnap.data(), {grades: studentGradeSnap.docs, subjects: subjects.docs, absences: absences.docs, studentId: params.studentId});
  } catch (err) {
    console.error(err);
    return null;
  }
  
  };