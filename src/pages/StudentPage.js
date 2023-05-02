import { CircularProgress, Paper, Typography, Box } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";
import { useLoaderData, useNavigation } from "react-router-dom";
import { merge } from 'lodash';
import { StudentProfileCard } from "../components/StudentProfileCard";
import { StudentInformationCard } from "../components/StudentInformationCard";

export const StudentPage = () =>{
  const data = useLoaderData();
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <CircularProgress />;
  }
  return(
    <Box sx={{display: "flex"}}>
      <StudentProfileCard data = {data}/>
      <StudentInformationCard data = {data}/>
    </Box>
  );
}

export const studentLoader = async (params) => {
  console.log("I HAVE ENTERED LOADER");
  const ref = doc(firestore, "Tanulok", params.studentId);
  try {
    const tanuloSnap = await getDoc(ref);
    const tanuloInfoSnap = await getDoc(doc(ref, "Informaciok", "Informacio"));
    return merge(tanuloSnap.data(), tanuloInfoSnap.data());
  } catch (err) {
    console.error(err);
    return null;
  }
  
  };