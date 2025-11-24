import { useEffect, useState, type FC, type FormEvent } from "react";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";

export const CreateForm: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/users/me`, { credentials: "include" })
      .then((res) => res.ok && navigate("/"));
  }, [navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const createResponse = await fetch(`${apiUrl}/users/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!createResponse.ok) {
        throw new Error("Account creation failed");
      }

      const loginResponse = await fetch(`${apiUrl}/users/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!loginResponse.ok) {
        throw new Error("Auto-login failed");
      }

      const guestIq = sessionStorage.getItem("guest_iq");
      if (guestIq) {
        await fetch(`${apiUrl}/iq/upload-session`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: parseInt(guestIq, 10) }),
        });
        sessionStorage.removeItem("guest_iq");
      }

      window.location.href = "/";

    } catch (err) {
      console.error(err);
      setError("Account creation failed. Please try again.");
    }
  };

  return (
    <Layout title="Create User">
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
            input: { color: "white", backgroundColor: "transparent" },
            label: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "#ce93d8" },
              "&.Mui-focused fieldset": { borderColor: "#6a1b9a" },
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
            input: { color: "white", backgroundColor: "transparent" },
            label: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "#ce93d8" },
              "&.Mui-focused fieldset": { borderColor: "#6a1b9a" },
            },
          }}
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          sx={{
            width: "300px",
            input: { color: "white", backgroundColor: "transparent" },
            label: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "#ce93d8" },
              "&.Mui-focused fieldset": { borderColor: "#6a1b9a" },
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
          Create
        </Button>

        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
    </Layout>
  );
};