import { Button } from "@mui/material";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { UserProfileMenu } from "./UserProfileMenu";

export const AuthButtons = () =>{

  const [userLogged, setUserLogged] = useState(null);

  onAuthStateChanged(auth, (user) => {
    setUserLogged(user);
    console.log(userLogged);
  })

  if(!userLogged){
    return(
      <>
      <Button component={RouterLink} to="/sign-in" color="secondary">Sign In</Button>
      <Button component={RouterLink} to="/sign-up" color="secondary">Sign Up</Button>
      </>
    )
  } else {
    return(
      <UserProfileMenu user={userLogged}/>
    );
  }
};