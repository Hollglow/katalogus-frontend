import { Divider, Paper, Typography } from "@mui/material";
import { StudentInformationRow } from "./StudentInformationRow";
import { StudentCheckboxRow } from "./StudentCheckboxRow";

const keys = [
  "Allapot",
  "Anya",
  "Apa",
  "Telefon",
  "Helyiseg",
  "Utca",
  "TornaFelmentes",
  "Vallas",
  "Nem",
  "Elment",
  "Erkezett",
  "EvetHalasztott",
  "OsztalyIsmetlo",
  "IskolaOtthagyas",
  "HianyzasbolIsmetlo",
];
export const StudentInformationCard = (props) => {
  return (
    <Paper
      sx={{ flex: "1 1 content", padding: 2, margin: "auto", maxWidth: "50%" }}
    >
      {keys.map((key) => (
        <>
          <Typography
            sx={{
              fontWeight: "bold",
              display: "inline-block",
              margin: 1,
              minWidth: 200,
            }}
          >
            {key}
          </Typography>
          {typeof props.data[key] === "boolean" ? (
            <StudentCheckboxRow
              data={{
                key: key,
                value: props.data[key],
                id: props.data.studentId,
                class: props.data.Osztaly,
                gender: props.data["Nem"],
              }}
            />
          ) : (
            <StudentInformationRow
              data={{ key: key, value: props.data[key] }}
            />
          )}
          <Divider />
        </>
      ))}
    </Paper>
  );
};
