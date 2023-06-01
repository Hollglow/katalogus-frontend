import { CircularProgress, Stack } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";
import { redirect, useLoaderData, useNavigation } from "react-router-dom";
import { PaginatedStudentTable } from "../components/PaginatedStudentTable";
import { ProfileCard } from "../components/ProfileCard";
import { merge } from "lodash";
import { ClassStatisticsTable } from "../components/ClassStatisticsTable";
import { ClassTeacherTable } from "../components/ClassTeacherTable";

export const ClassPage = () =>{
  const data = useLoaderData();
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <CircularProgress />;
  }
  return(
    <>
    <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2} sx={{margin: 2}}>
      <ProfileCard data = {{Nev: data.Osztalyfonok}} osztalyfonok={true}/>
      <PaginatedStudentTable data={data.Diakok} margin = {true}/>
      <ClassTeacherTable data = {data}/>
    </Stack>
    <ClassStatisticsTable male={data.male} female={data.female} />
    </>
  );
}

export const classLoader = async (params) => {

  const ref = params.classId ?  doc(firestore, "Osztalyok", `${params.classId}`) : doc(firestore, "Osztalyok", "11");
  const statRef = doc(ref, "Statisztikak", "Statisztika")
  const maleRef = doc(statRef, "Fiu", "Statisztika");
  const femaleRef = doc(statRef, "Lany", "Statisztika");
  try {
    const oszyalySnap = await getDoc(ref);
    const maleSnap = await getDoc(maleRef);
    const femaleSnap = await getDoc(femaleRef);
    return merge(oszyalySnap.data(), {male: maleSnap.data()}, {female: femaleSnap.data()});
  } catch (err) {
    console.error(err);
    return redirect("/error");
  }
  
  };