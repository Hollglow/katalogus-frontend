import { CircularProgress, Typography } from "@mui/material";
import { ClassStudentsTable } from "../components/ClassStudentsTable";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";
import { useLoaderData, useNavigation } from "react-router-dom";
import { PaginatedStudentTable } from "../components/PaginatedStudentTable";

export const DataPage = () =>{
  const data = useLoaderData();
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <CircularProgress />;
  }
  return(
    <>
    <Typography>
      {data.Osztalyfonok}
    </Typography>
    <PaginatedStudentTable data={data.Diakok}/>
    </>
  );
}

export const classLoader = async (params) => {

  const ref = params.classId ?  doc(firestore, "Osztalyok", `${params.classId}`) : doc(firestore, "Osztalyok", "11");
  try {
    const oszyalySnap = await getDoc(ref);
    return oszyalySnap.data();
  } catch (err) {
    console.error(err);
    return null;
  }
  
  };