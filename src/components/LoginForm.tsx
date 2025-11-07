import { useState, type FC, type FormEvent } from "react";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";

export const LoginForm: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

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
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error("Login Failed:", error);
        setLoggedIn(false);
      });
  };

  const doSecretEndpoint = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/users/secret`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to reach secret");
        }
      })
      .then(() => {
        console.log("You were able to reach the secret!!");
      })
      .catch((error) => {
        console.error("Failed to reach secret:", error);
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        backgroundColor: "black", // full black background
        color: "white",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        textAlign="center"
        sx={{ mb: 2, color: "white" }}
      >
        Login
      </Typography>

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
              borderColor: "#90caf9", // soft blue hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#1976d2", // primary blue focus
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
          bgcolor: "#1976d2",
          "&:hover": {
            bgcolor: "#1565c0",
          },
        }}
      >
        Submit
      </Button>
      {loggedIn && <><Alert severity="success">You have been logged in!</Alert></>}
      <Button
        variant="contained"
        sx={{
          mt: 2,
          width: "150px",
          bgcolor: "#1976d2",
          "&:hover": {
            bgcolor: "#1565c0",
          },
        }}
        onClick={doSecretEndpoint}
      >
        Access Secret Endpoint
      </Button>
    </Box>

  );
};
