import { Button, Stack } from "@mui/material";
import {
  generateAdmin,
  tanarbeosztasFillExcel,
  tanarokFillExcel,
  tanulokFillExcel,
} from "../database/CsvImport";
import { useState } from "react";

export const UploadPage = () => {
  const [loading, setLoading] = useState(false);

  const buttonLoadingWrapper = async (type, e) => {
    setLoading(true);
    switch (type) {
      case "tanulo":
        await tanulokFillExcel(e);
        break;
      case "tanar":
        await tanarokFillExcel(e);
        break;
      case "beosztas":
        await tanarbeosztasFillExcel(e);
        break;
      case "admin":
        await generateAdmin();
        break;
      default:
        console.error("Bad option");
    }
    setLoading(false);
  };

  return (
    <Stack
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
      spacing={2}
      margin={10}
    >
      <Button disabled={loading} variant="contained" component="label">
        Tanulok Excel Feltöltés
        <input
          type="file"
          accept=".csv"
          hidden
          onChange={(e) => buttonLoadingWrapper("tanulo", e)}
        ></input>
      </Button>
      <Button disabled={loading} variant="contained" component="label">
        Tanarok Excel Feltöltés
        <input
          type="file"
          accept=".csv"
          hidden
          onChange={(e) => buttonLoadingWrapper("tanar", e)}
        ></input>
      </Button>
      <Button disabled={loading} variant="contained" component="label">
        Tanar Beosztas Excel Feltöltés
        <input
          type="file"
          accept=".csv"
          hidden
          onChange={(e) => buttonLoadingWrapper("beosztas", e)}
        ></input>
      </Button>
      <Button
        disabled={loading}
        variant="contained"
        component="label"
        onClick={() => buttonLoadingWrapper("admin")}
      >
        Admin Generálás
      </Button>
    </Stack>
  );
};
