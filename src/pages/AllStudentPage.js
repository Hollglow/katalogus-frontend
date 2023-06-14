import { CircularProgress, Stack } from "@mui/material";
import { collection, or, query, where } from "firebase/firestore";
import { firestore } from "../config/firebase";
import { redirect, useLoaderData, useNavigation } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { useState } from "react";
import { ClassSelector } from "../components/ClassSelector";
import { PaginatedStudentTable } from "../components/PaginatedStudentTable";
import { GetAllClassesExtra, GetClasses } from "../database/DatabaseInterface";

export const AllStudentPage = () => {
  const data = useLoaderData();
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState("");
  const [classValue, setClassValue] = useState("");

  if (navigation.state === "loading") {
    return <CircularProgress />;
  }
  return (
    <>
      <Stack
        sx={{ maxWidth: 500, margin: "25px auto 10px" }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <SearchBar callback={(searchValue) => setSearchValue(searchValue)} />
        <ClassSelector
          callback={(classValue) => setClassValue(classValue)}
          options={data.docs.map((doc) => {
            return doc.id;
          })}
        />
      </Stack>

      {!classValue && (
        <PaginatedStudentTable
          data={Object.assign(
            ...data.docs.map((doc) => {
              return doc.data().Diakok;
            })
          )}
          filter={searchValue}
        />
      )}
      {classValue &&
        data.docs.map((doc) => {
          return classValue === doc.id ? (
            <PaginatedStudentTable
              data={doc.data().Diakok}
              classId={doc.id}
              filter={searchValue}
            />
          ) : null;
        })}
    </>
  );
};

export const allStudentLoader = async (claims) => {
  let ref = collection(firestore, "Osztalyok");
  if (claims && claims.tanar && !claims.admin) {
    let keys = Object.keys(claims);
    const osztalyok = await GetAllClassesExtra();
    keys = osztalyok
      .data()
      .Osztalyok.filter((element) => keys.includes(element));
    console.log(keys, claims);
    ref = query(
      ref,
      or(
        where("__name__", "in", keys),
        where("__name__", "==", claims.osztalyfonoke)
      )
    );
  }
  try {
    const osztalySnap = await GetClasses(ref);
    console.log(osztalySnap.docs);
    return osztalySnap;
  } catch (err) {
    console.error(err);
    return redirect("/error");
  }
};
