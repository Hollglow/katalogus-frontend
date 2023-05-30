import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

import { Outlet, Link as RouterLink } from "react-router-dom";
import { AuthButtons } from './AuthButtons';
import Restricted from './Restricted';
import { useContext } from 'react';
import PermissionContext from './PermissionContext';



export const Navbar = () => {

  const {permissions} = useContext(PermissionContext);
  return (
    <>
    <AppBar position="static">      
        <Toolbar>
            <Button component={RouterLink} to="/test" color="success">Test</Button>
          <Restricted to={["diak"]}>
            {permissions && <Button sx={{ flex: 1 , justifyContent: "left"}} component={RouterLink} to={`/students/${permissions.torzsszam}`} color="success">Saját Oldal</Button>}
          </Restricted>
          <Restricted to={["tanar"]}>
            <Button sx={{ flex: 1 , justifyContent: "left"}} component={RouterLink} to="/classes" color="success">Osztályok</Button>
            <Button sx={{ flex: 1 , justifyContent: "left"}} component={RouterLink} to="/students" color="success">Diákok</Button>
          </Restricted>

            <Button sx={{ flex: 1 , justifyContent: "left"}} component={RouterLink} to="/upload" color="success">Adat Feltöltés</Button>
          <AuthButtons/>
        </Toolbar>
    </AppBar>
    <Outlet/>
    </>
  );
}
