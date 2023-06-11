import {
  TextField,
  Container,
  Box,
  Button,
  Paper,
  Collapse,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithCustomToken } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const AuthForm = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);

  const navigate = useNavigate();

  const xhr = new XMLHttpRequest();

  const SendAuthRequest = (uid, pass) => {
    xhr.onreadystatechange = async () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log(xhr);
          await signInWithCustomToken(auth, xhr.responseText);
          navigate("/");
        } else {
          setErrorAlert(true);
        }
      }
    };

    xhr.open("POST", "http://localhost:8080");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(
      new URLSearchParams({
        uid: uid,
        pass: pass,
      })
    );
  };

  const signIn = async () => {
    try {
      SendAuthRequest(user, password);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ margin: 2 }} component="form" autoComplete="off">
      <Collapse in={errorAlert}>
        <Alert severity="error">
          <AlertTitle>Hiba!</AlertTitle>
          Helytelen jelszó vagy felhasználónév
        </Alert>
      </Collapse>
      <Container
        component={Paper}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          p: 4,
        }}
        maxWidth="sm"
      >
        <TextField
          sx={{ width: "inherit" }}
          required
          label="Felhasználónév"
          variant="outlined"
          onChange={(event) => {
            setUser(event.target.value);
          }}
        ></TextField>
        <TextField
          sx={{ width: "inherit" }}
          required
          type="password"
          label="Password"
          variant="outlined"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        ></TextField>
        <Button
          sx={{ width: "fit-content" }}
          onClick={signIn}
          variant="contained"
        >
          Sign In
        </Button>
      </Container>
    </Box>
  );
};
