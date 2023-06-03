import { Container, Typography } from "@mui/material";
import { useContext } from "react";
import PermissionContext from "../components/PermissionContext";

export const WelcomePage = () => {
  const { permissions } = useContext(PermissionContext);
  return (
    <Container sx={{ margin: "auto", textAlign: "center", paddingTop: 10 }}>
      <Typography variant="h2">Üdvözöljük oldalunkon!</Typography>
      {(permissions === undefined || permissions.loggedOut) && (
        <Typography variant="h2">Kérjük jelentkezzen be.</Typography>
      )}
    </Container>
  );
};
