import { useEffect, useState, type FC, type FormEvent } from "react";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

export const LoginForm: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  // Redirect if logged in already
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/users/me`, { credentials: "include" })
      .then((res) => res.ok && navigate("/"));
  }, [navigate]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/users/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed");
        }
      })
      .then(() => {
        console.log("LOGGED IN!!");
        const guestIq = sessionStorage.getItem("guest_iq");
        if (guestIq) {
          fetch(`${apiUrl}/iq/upload-session`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: parseInt(guestIq, 10) }),
          }).finally(() => {
            sessionStorage.removeItem("guest_iq");
          });
        }
        setLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        console.error("Login Failed:", error);
        setLoggedIn(false);
      });
  };

  return (
    <Layout title="Login">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          backgroundColor: "black",
          color: "white",
        }}
      >

        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          sx={{
            width: "300px",
            input: {
              color: "white",
              backgroundColor: "transparent",
            },
            label: {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "#90caf9",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1976d2",
              },
            },
          }}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={{
            width: "300px",
            input: {
              color: "white",
              backgroundColor: "transparent",
            },
            label: {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "#90caf9",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1976d2",
              },
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            width: "150px",
            bgcolor: "#6a1b9a",
            "&:hover": {
              bgcolor: "#4a148c",
            },
          }}
        >
          Submit
        </Button>
        {loggedIn && <Alert severity="success">You have been logged in!</Alert>}
        <Typography sx={{ mt: 2, opacity: 0.7, fontStyle: "italic" }}>
          Don't have an account?
        </Typography>
        <Button
          variant="outlined"
          href="/create"
          sx={{ width: "180px", color: "white", borderColor: "white" }}
        >
          Create Account
        </Button>
      </Box>
    </Layout>
  );
};
