import { CircularProgress, Stack } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../config/firebase";
import { useLoaderData, useNavigation } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { useState } from "react";
import { ClassSelector } from "../components/ClassSelector";
import { PaginatedStudentTable } from "../components/PaginatedStudentTable";


export const AllStudentPage = () =>{
  const data = useLoaderData();
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState("");
  const [classValue, setClassValue] = useState("");

  if (navigation.state === "loading") {
    return <CircularProgress />;
  }
  return(
    <>
    <Stack sx={{maxWidth: 500, margin: "25px auto 10px"}} direction="row" justifyContent="center" alignItems="center" spacing={1}>
      <SearchBar callback={(searchValue) => setSearchValue(searchValue)}/>
      <ClassSelector callback={(classValue) => setClassValue(classValue)} options = {data.docs.map((doc) => {return doc.id})}/>
    </Stack>

    {!classValue && <PaginatedStudentTable data ={Object.assign(...data.docs.map((doc) => {return doc.data().Diakok}))} filter = {searchValue} />}
    {classValue && data.docs.map((doc) => {
      return classValue === doc.id ? <PaginatedStudentTable data={doc.data().Diakok} classId = {doc.id} filter = {searchValue}/> : null

    })}
    </>
  );
}

export const allStudentLoader = async () => {
  const ref = collection(firestore, "Osztalyok");
  try {
    const osztalySnap = await getDocs(ref);
    return osztalySnap;
  } catch (err) {
    console.error(err);
    return null;
  }
  
  };