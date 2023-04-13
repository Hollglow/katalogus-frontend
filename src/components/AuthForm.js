import { TextField, Container, Box, Button, Paper, Divider, Typography} from "@mui/material";
import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleIcon } from '../assets/icons/GoogleIcon'
import { Link as RouterLink, useNavigate } from "react-router-dom";

export const AuthForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const signIn = async () => {
    try{
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch(err) {
      console.error(err)
    }
  };

  const signInGoogle = async () => {
    try{
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch(err) {
      console.error(err)
    }
  };

  return(
    
      <Box
        component= "form"
        autoComplete="off"
        >
          <Container component={Paper} sx={{display: 'flex', flexDirection: 'column', gap: 2 , alignItems: 'center', p: 4}} maxWidth='sm'>
            <TextField sx={{width: 'inherit'}} required label="E-mail" variant="outlined" onChange={(event) => {setEmail(event.target.value)}}></TextField>
            <TextField sx={{width: 'inherit'}} required type="password" label="Password" variant="outlined" onChange={(event) => {setPassword(event.target.value)}}></TextField>
            <Button sx={{width: 'fit-content'}} onClick={signIn} variant="contained">Sign In</Button>
          
          <Divider sx={{width: 'inherit'}} variant="middle"><Typography color='gray'>New User?</Typography></Divider>
          <Button sx={{width: 'fit-content' }} component={RouterLink} variant="contained" to="/sign-up">Sign Up</Button>
          <Divider sx={{width: 'inherit'}} variant="middle"><Typography color='gray'>Or</Typography></Divider>
          
          <Typography>Sign In With</Typography>
          <Button sx={{width: 'fit-content' }} onClick={signInGoogle} variant="contained" startIcon={<GoogleIcon/>}>Google</Button>
          </Container>
      </Box>
    
  );
}