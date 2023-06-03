import { Button } from "@mui/material";
import {
  tanulokFill,
  osztalyokFill,
  tanarokFill,
  jegyekFill,
  tantargyakFill,
  hianyzasFill,
} from "../database/faker";
import { test } from "../database/CsvImport";

export const TestPage = () => {
  return (
    <>
      <Button onClick={tanulokFill}>Fill Students</Button>
      <Button onClick={osztalyokFill}>Fill Osztalyok</Button>
      <Button onClick={tanarokFill}>Fill Tanarok</Button>
      <Button onClick={jegyekFill}>Fill Jegyek</Button>
      <Button onClick={tantargyakFill}>Fill Tantargyak</Button>
      <Button onClick={hianyzasFill}>Fill Hianyzasok</Button>
      <Button onClick={test}>TEst</Button>
    </>
  );
};
