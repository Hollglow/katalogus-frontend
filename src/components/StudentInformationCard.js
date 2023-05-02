import { Divider, Paper, Typography } from "@mui/material";
import { StudentInformationRow } from "./StudentInformationRow";

const keys = ["Allapot", "Anya", "Apa", "Telefon", "Varos", "Utca", "TornaFelmentes", "Vallas"];
export const StudentInformationCard = (props) => {
  return (
    <Paper sx={{flex: '1 1 content', padding: 2, margin: 5, marginLeft: 2}}>
      {keys.map((key) => (
        <>
          <Typography sx={{fontWeight: 'bold', display: 'inline-block', margin: 2, minWidth: 200}}>{key}</Typography>
          <StudentInformationRow data = {{key: key, value: props.data[key]}}/>
          <Divider/>
        </>
      ))}
    </Paper>
  );
}