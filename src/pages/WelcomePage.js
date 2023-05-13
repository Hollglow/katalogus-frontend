import { Button } from "@mui/material";
import { tanulokFill, osztalyokFill, tanarokFill, jegyekFill, tantargyakFill } from "../database/faker";

export const WelcomePage = () =>{
  return(
    <>
    <Button onClick={tanulokFill}>Fill Students</Button>
    <Button onClick={osztalyokFill}>Fill Osztalyok</Button>
    <Button onClick={tanarokFill}>Fill Tanarok</Button>
    <Button onClick={jegyekFill}>Fill Jegyek</Button>
    <Button onClick={tantargyakFill}>Fill Tantargyak</Button>
    </>
  );
}