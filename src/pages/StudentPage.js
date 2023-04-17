import { CircularProgress, Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";
import { useLoaderData, useNavigation, useParams } from "react-router-dom";

export const StudentPage = () =>{
  const data = useLoaderData();
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <CircularProgress />;
  }
  return(
    <>
    <Typography>Student Page</Typography>
    <Typography>
      {data.Nev}
    </Typography>
    </>
  );
}

export const studentLoader = async (params) => {
  console.log(params);
  console.log("I HAVE ENTERED LOADER");
  const ref = doc(firestore, "Tanulok", params.studentId);
  try {
    const tanuloSnap = await getDoc(ref);
    return tanuloSnap.data();
  } catch (err) {
    console.error(err);
    return null;
  }
  
  };