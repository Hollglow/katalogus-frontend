import { Box, Button } from "@mui/material";
import { Outlet, Link as RouterLink } from "react-router-dom";

export const Navbar = () => {
  return(
    <Box position="sticky">
      
      <Button component={RouterLink} to="/">Home</Button>
      <Button component={RouterLink} to="/data">Data</Button>
      <Outlet/>
    </Box>
  );
}