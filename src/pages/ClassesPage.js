import { Container } from "@mui/material";
import { ClassesTable } from "../components/ClassesTable";
import { firestore } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { redirect, useLoaderData } from "react-router-dom";

export const ClassesPage = () => {
  const data = useLoaderData();
  return (
  <Container sx={{paddingTop: 2}}>
    <ClassesTable data = {data}/>
  </Container>
    );
}

export const classesLoader = async () => {
  const ref = doc(firestore, "Config", "Osztalyok");
  try {
    const osztalyokSnap = await getDoc(ref);
    
    return osztalyokSnap.data().Osztalyok;
  } catch (err) {
    console.error(err);
    return redirect("/error");
  }
  
  };