import { CircularProgress } from "@mui/material";
import { ClassStudentsTable } from "../components/ClassStudentsTable";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../config/firebase";
import { useLoaderData, useNavigation } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { useState } from "react";

export const AllStudentPage = () =>{
  const data = useLoaderData();
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState("");

  if (navigation.state === "loading") {
    return <CircularProgress />;
  }
  return(
    <>
    <SearchBar callback={(searchValue) => setSearchValue(searchValue)}/>
    {data.docs.map((doc) => {
      return <ClassStudentsTable students={doc.data().Diakok} id = {doc.id} filter = {searchValue}/>

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