import { Button } from "@mui/material";
import { tanulokFill, osztalyokFill, tanarokFill, jegyekFill, tantargyakFill } from "../database/faker";
import { tanarbeosztasFillExcel, tanarokFillExcel, tanulokFillExcel } from "../database/CsvImport";

export const WelcomePage = () =>{
  return(
    <>
    <Button onClick={tanulokFill}>Fill Students</Button>
    <Button onClick={osztalyokFill}>Fill Osztalyok</Button>
    <Button onClick={tanarokFill}>Fill Tanarok</Button>
    <Button onClick={jegyekFill}>Fill Jegyek</Button>
    <Button onClick={tantargyakFill}>Fill Tantargyak</Button>
    <Button variant="contained" component="label">Test Excel Tanulok<input type="file" accept=".csv" hidden onChange={tanulokFillExcel}></input></Button>
    <Button variant="contained" component="label">Test Excel Tanarok<input type="file" accept=".csv" hidden onChange={tanarokFillExcel}></input></Button>
    <Button variant="contained" component="label">Test Excel Tanar Beosztas<input type="file" accept=".csv" hidden onChange={tanarbeosztasFillExcel}></input></Button>
    
    </>
  );
}