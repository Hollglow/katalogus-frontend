import { TextField, Container, Box, Button, Paper } from "@mui/material";
import { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithCustomToken } from "firebase/auth";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export const AuthForm = () => {

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const customToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTY4NTEwNjk1MSwiZXhwIjoxNjg1MTEwNTUxLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1uNWJua0BzemFrZG9nYS1hOGZiOS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLW41Ym5rQHN6YWtkb2dhLWE4ZmI5LmlhbS5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoiZWR1X0pTX2lzYnIiLCJjbGFpbXMiOnsidGVhY2hlciI6dHJ1ZX19.SgFlqdOKqxKlW7O20JRomhzuRDw799VyPbNxOhYW7F-te2aqZGADii8p96ekmOhS90g_Q-pVsMvRpPZwiDItUFJjPQx5Y_AhLVRLFa8L_qoLpAiFgfmwZC7l-rHjYuJODxNUYwssV_wsD4zyeiVIsS0IhKYo2-5JPlgPLw5Kuq3ByZP6AkmAKeJ5gh5ftHCgppTTQdrU8g6GxaJ-rmkvN-OfS726f2PlDwSeLai5fK20b_qqjKxwlf4xO3fivEeJI95JS9OXmxJleyeGSozjz3aUHmPEgdhyZ2LyQtm43gGccU7AmiHdhvGh6HGcOJeO50JF8KeoJ2V386G6AT7p-A"

  
  
  const navigate = useNavigate();

  const signIn = async () => {
    try{
      await signInWithCustomToken(auth, customToken);
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
            <TextField sx={{width: 'inherit'}} required label="Felhasználónév" variant="outlined" onChange={(event) => {setUser(event.target.value)}}></TextField>
            <TextField sx={{width: 'inherit'}} required type="password" label="Password" variant="outlined" onChange={(event) => {setPassword(event.target.value)}}></TextField>
            <Button sx={{width: 'fit-content'}} onClick={signIn} variant="contained">Sign In</Button>
          </Container>
      </Box>
    
  );
}