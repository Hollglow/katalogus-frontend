import { Button, Stack } from "@mui/material"
import { tanarbeosztasFillExcel, tanarokFillExcel, tanulokFillExcel } from "../database/CsvImport"

export const UploadPage = () => {
  return(
    <Stack direction="column" justifyContent="space-evenly" alignItems="center" spacing={2} margin={10}>
      <Button variant="contained" component="label">Tanulok Excel Feltöltés<input type="file" accept=".csv" hidden onChange={tanulokFillExcel}></input></Button>
      <Button variant="contained" component="label">Tanarok Excel Feltöltés<input type="file" accept=".csv" hidden onChange={tanarokFillExcel}></input></Button>
      <Button variant="contained" component="label">Tanar Beosztas Excel Feltöltés<input type="file" accept=".csv" hidden onChange={tanarbeosztasFillExcel}></input></Button>
    </Stack>
  )
}