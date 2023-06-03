import { Avatar, Paper, Typography } from "@mui/material";

export const ProfileCard = (props) => {
  return (
    <Paper
      sx={{
        flex: "0.2 1 auto",
        padding: 10,
        maxHeight: 250,
        textAlign: "center",
      }}
    >
      <Avatar
        alt={props.data.Nev}
        src="https://picsum.photos/200"
        sx={{ width: 150, height: 150, margin: "auto" }}
      />
      {props.osztalyfonok && (
        <Typography sx={{ marginTop: 4 }}>Osztályfőnök</Typography>
      )}
      <Typography sx={{ marginTop: 4 }}>{props.data.Nev}</Typography>
    </Paper>
  );
};
