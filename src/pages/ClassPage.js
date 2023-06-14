import { CircularProgress, Stack } from "@mui/material";
import { redirect, useLoaderData, useNavigation } from "react-router-dom";
import { PaginatedStudentTable } from "../components/PaginatedStudentTable";
import { ProfileCard } from "../components/ProfileCard";
import { merge } from "lodash";
import { ClassStatisticsTable } from "../components/ClassStatisticsTable";
import { ClassTeacherTable } from "../components/ClassTeacherTable";
import {
  GetClass,
  GetClassFemaleStats,
  GetClassMaleStats,
} from "../database/DatabaseInterface";

export const ClassPage = () => {
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
        justifyContent="space-between"
        spacing={2}
        sx={{ margin: 2 }}
      >
        <ProfileCard data={{ Nev: data.Osztalyfonok }} osztalyfonok={true} />
        <PaginatedStudentTable data={data.Diakok} margin={true} />
        <ClassTeacherTable data={data} />
      </Stack>
      <ClassStatisticsTable male={data.male} female={data.female} />
    </>
  );
};

export const classLoader = async (params) => {
  try {
    const oszyalySnap = await GetClass(params.classId);
    const maleSnap = await GetClassMaleStats(params.classId);
    const femaleSnap = await GetClassFemaleStats(params.classId);
    return merge(
      oszyalySnap.data(),
      { male: maleSnap.data() },
      { female: femaleSnap.data() }
    );
  } catch (err) {
    console.error(err);
    return redirect("/error");
  }
};
