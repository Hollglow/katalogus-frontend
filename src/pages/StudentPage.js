import { CircularProgress, Stack } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../config/firebase";
import { redirect, useLoaderData, useNavigation } from "react-router-dom";
import { merge } from "lodash";
import { ProfileCard } from "../components/ProfileCard";
import { StudentInformationCard } from "../components/StudentInformationCard";
import { StudentGradesCard } from "../components/StudentGradesCard";
import {
  GetClass,
  GetStudent,
  GetStudentInformation,
  GetTeacher,
} from "../database/DatabaseInterface";

export const StudentPage = () => {
  const data = useLoaderData();
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <CircularProgress />;
  }
  return (
    <>
      <Stack
        direction="row"
        alignItems="flex-start"
        spacing={4}
        sx={{ margin: "20px auto", maxWidth: "fit-content" }}
      >
        <ProfileCard data={data} />
        <StudentGradesCard
          data={data.grades}
          subjects={data.subjects}
          absences={data.absences}
          studentName={data.Nev}
          studentId={data.studentId}
        />
      </Stack>
      <StudentInformationCard data={data} />
    </>
  );
};

export const studentLoader = async (params, claims) => {
  const gradeRef = collection(firestore, "Jegyek");
  const absencesRef = collection(firestore, "Hianyzasok");
  try {
    const tanuloSnap = await GetStudent(params.studentId);
    let gradeQuery = query(
      gradeRef,
      where("Torzsszam", "==", params.studentId)
    );
    let absenceQuery = query(
      absencesRef,
      where("Torzsszam", "==", params.studentId)
    );
    if (claims && claims.tanar && !claims.admin) {
      const tanarSnapshot = await GetTeacher(claims.torzsszam);
      if (tanarSnapshot.data().Osztalyfonoke !== tanuloSnap.data().Osztaly) {
        gradeQuery = query(
          gradeQuery,
          where(
            "Targy",
            "in",
            tanarSnapshot.data().Tantargy[tanuloSnap.data().Osztaly]
          )
        );
        absenceQuery = query(
          absenceQuery,
          where(
            "Targy",
            "in",
            tanarSnapshot.data().Tantargy[tanuloSnap.data().Osztaly]
          )
        );
      }
    }
    const subjects = await GetClass(tanuloSnap.data().Osztaly);
    const tanuloInfoSnap = await GetStudentInformation(params.studentId);
    const studentGradeSnap = await getDocs(gradeQuery);
    const absences = await getDocs(absenceQuery);
    console.log("I AM HEREE");
    return merge(tanuloSnap.data(), tanuloInfoSnap.data(), {
      grades: studentGradeSnap.docs,
      subjects: subjects.data().Tanarok,
      absences: absences.docs,
      studentId: params.studentId,
    });
  } catch (err) {
    console.error(err);
    return redirect("/error");
  }
};
