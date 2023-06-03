import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import { Outlet, Link as RouterLink } from "react-router-dom";
import { AuthButtons } from "./AuthButtons";
import Restricted from "./Restricted";
import { useContext } from "react";
import PermissionContext from "./PermissionContext";

export const Navbar = () => {
  const { permissions } = useContext(PermissionContext);
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Restricted to={["diak"]}>
            {permissions && (
              <Button
                sx={{ flex: 1, justifyContent: "left", color: "white" }}
                component={RouterLink}
                to={`/students/${
                  permissions.torzsszam ? permissions.torzsszam : 1
                }`}
                color="success"
              >
                Saját Oldal
              </Button>
            )}
          </Restricted>
          <Restricted to={["tanar"]}>
            {permissions && (
              <Button
                sx={{ flex: 1, justifyContent: "left", color: "white" }}
                component={RouterLink}
                to={`/classes/${
                  permissions.osztalyfonoke ? permissions.osztalyfonoke : ""
                }`}
                color="success"
              >
                Osztályom
              </Button>
            )}
            <Button
              sx={{ flex: 1, justifyContent: "left", color: "white" }}
              component={RouterLink}
              to="/classes"
              color="success"
            >
              Osztályok
            </Button>
            <Button
              sx={{ flex: 1, justifyContent: "left", color: "white" }}
              component={RouterLink}
              to="/students"
              color="success"
            >
              Diákok
            </Button>
          </Restricted>

          <Restricted to={["admin"]}>
            <Button
              sx={{ flex: 1, justifyContent: "left", color: "white" }}
              component={RouterLink}
              to="/upload"
              color="success"
            >
              Adat Feltöltés
            </Button>
          </Restricted>
          <AuthButtons />
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};
