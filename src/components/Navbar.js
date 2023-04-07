import { AppBar, Toolbar, Button, IconButton, Avatar, Tooltip, Menu, MenuItem, Divider } from "@mui/material";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Outlet, Link as RouterLink } from "react-router-dom";
import { auth } from "../config/firebase";
import { useState } from "react";

export const Navbar = () => {

  const [user, setUser] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if(user){
      setUser(user);
      //console.log(user);
    }
    else{
      setUser(null);
      //console.log(user);
    }
  })

  const handleOpenUserMenu = (event) =>{
    setMenuAnchor(event.currentTarget);
    console.log("opened");
  };

  const handleCloseUserMenu = () =>{
    setMenuAnchor(null)
    console.log("closed");
  };

  const logOut = async () => {
    try{
      await signOut(auth);
    } catch(err) {
      console.error(err)
    }
  };

  return(
    <>
      <AppBar  position="sticky">
        <Toolbar>
        <Button component={RouterLink} to="/" color="secondary">Home</Button>
        <Button sx={{ flex: 1 , justifyContent: "left"}} component={RouterLink} to="/data" color="secondary">Data</Button>
        {!user && 
          <>
          <Button component={RouterLink} to="/sign-in" color="secondary">Sign In</Button>
          <Button component={RouterLink} to="/sign-up" color="secondary">Sign Up</Button>
          </>
        }
        {user && (
          <div> 
          <Tooltip title="Open Settings">
            <IconButton
            onClick={handleOpenUserMenu}
            aria-controls="menu-appbar"
            aria-haspopup="true"
            >
              <Avatar alt={user.displayName} src={user.photoURL}/>
            </IconButton>
          </Tooltip>
          <Menu
          id="menu-appbar"
          anchorEl={menuAnchor}
          onClose={handleCloseUserMenu}
          open={Boolean(menuAnchor)}
          >
            <MenuItem onClick={handleCloseUserMenu}>
            Profile
            </MenuItem>
            <Divider/>
            <MenuItem onClick={handleCloseUserMenu}>
              hey
            
            </MenuItem>
          </Menu>
          </div>
        )}
        
        </Toolbar>
      </AppBar>
      <Outlet/>
    </>
  );
}