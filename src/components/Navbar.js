import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

import { Outlet, Link as RouterLink } from "react-router-dom";
import { AuthButtons } from './AuthButtons';



export const Navbar = () => {

  return (
    <>
    <AppBar position="static">      
        <Toolbar>
          <Button component={RouterLink} to="/" color="secondary">Home</Button>
          <Button sx={{ flex: 1 , justifyContent: "left"}} component={RouterLink} to="/classes" color="secondary">Classes</Button>
          <Button sx={{ flex: 1 , justifyContent: "left"}} component={RouterLink} to="/students" color="secondary">Students</Button>
          <Button sx={{ flex: 1 , justifyContent: "left"}} component={RouterLink} to="/upload" color="secondary">Adat Feltöltés</Button>
          <AuthButtons/>
        </Toolbar>
    </AppBar>
    <Outlet/>
    </>
  );
}
