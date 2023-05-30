import { Button } from "@mui/material";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserProfileMenu } from "./UserProfileMenu";

export const AuthButtons = () =>{

  const [userLogged, setUserLogged] = useState(null);

  useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    setUserLogged(user);
    console.log(userLogged);
  })
  },[userLogged]);
  if(!userLogged){
    return(
      <>
      <Button component={RouterLink} to="/sign-in" color="secondary">Bejelentkezés</Button>
      </>
    )
  } else {
    return(
      <UserProfileMenu user={userLogged}/>
    );
  }
};