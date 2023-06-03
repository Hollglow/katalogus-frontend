import { Container, Typography } from "@mui/material";

export const ErrorPage = () => {
  return (
    <Container sx={{ margin: "auto", textAlign: "center", paddingTop: 10 }}>
      <Typography variant="h3">
        Sajnáljuk, valami hiba történt, vagy korlátozott tartalmat próbált
        elérni!
      </Typography>
    </Container>
  );
};
