import { Container } from "@mui/material";
import { ClassesTable } from "../components/ClassesTable";
import { redirect, useLoaderData } from "react-router-dom";
import { GetAllClassesExtra } from "../database/DatabaseInterface";

export const ClassesPage = () => {
  const data = useLoaderData();
  return (
    <Container sx={{ paddingTop: 2 }}>
      <ClassesTable data={data} />
    </Container>
  );
};

export const classesLoader = async () => {
  try {
    const osztalyokSnap = await GetAllClassesExtra();

    return osztalyokSnap.data().Osztalyok;
  } catch (err) {
    console.error(err);
    return redirect("/error");
  }
};
