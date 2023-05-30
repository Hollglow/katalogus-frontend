import { Container, Typography } from "@mui/material";

export const WelcomePage = () =>{
  return(
    <Container sx={{margin: 'auto', textAlign: 'center', paddingTop: 10}}>
      <Typography variant="h2">Üdvözöljük oldalunkon!</Typography>
      <Typography variant="h2">Kérjük jelentkezzen be.</Typography>
    </Container>
  );
}