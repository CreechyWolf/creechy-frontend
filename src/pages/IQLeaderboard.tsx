import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
  Alert,
} from "@mui/material";
import Layout from "../components/Layout";

interface LeaderboardEntry {
  username: string;
  amount: number;
}

const IQLeaderboard: React.FC = () => {
  const [iq, setIq] = useState<number>(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/users/current-user`, { credentials: "include" })
      .then((res) => {
        if (res.ok) setLoggedIn(true);
        else setLoggedIn(false);
      });
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem("guest_iq");
    if (!loggedIn && stored) {
      setIq(parseInt(stored, 10));
    }
  }, [loggedIn]);

  const fetchCurrentIq = () => {
    fetch(`${apiUrl}/iq/current`, {
      method: "GET",
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Failed to fetch IQ");
        const json = await response.json();
        setIq(json.amount ?? 0);
        setError(null);
      })
      .catch((err) => {
        console.error("IQ fetch failed:", err);
      });
  };

  const fetchLeaderboard = () => {
    fetch(`${apiUrl}/iq/leaderboard`, {
      method: "GET",
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Failed to fetch leaderboard");
        const json = await response.json();
        const list = Array.isArray(json)
          ? json
          : Array.isArray(json.data)
            ? json.data
            : [];

        setLeaderboard(list);
        setError(null);
      })
      .catch((err) => {
        console.error("Leaderboard fetch failed:", err);
        setError("Failed to load leaderboard");
      });
  };

  const updateIQ = () => {
    if (!loggedIn) {
      const newIq = iq + 1;
      setIq(newIq);
      sessionStorage.setItem("guest_iq", String(newIq));
      return;
    }
    fetch(`${apiUrl}/iq/update`, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to update IQ");
        fetchCurrentIq();
        fetchLeaderboard();
      })
      .catch((err) => {
        console.error("IQ update failed:", err);
        setError("Failed to update IQ");
      });
  };

  useEffect(() => {
    fetchCurrentIq();
    fetchLeaderboard();
  }, []);

  return (
    <Layout title="IQ Leaderboard">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "100%",
            maxWidth: "900px",
            color: "white",
            padding: 4,
            gap: 6,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              flex: 1,
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Your IQ
            </Typography>
            {!loggedIn && (
              <Typography sx={{ fontStyle: "italic", opacity: 0.6, mb: -1 }}>
                An account is required to save your points.
              </Typography>
            )}
            <Button
              variant="contained"
              onClick={updateIQ}
              sx={{
                width: "180px",
                height: "60px",
                fontSize: "1.1rem",
                bgcolor: "#6a1b9a",
                "&:hover": { bgcolor: "#4a148c" },
              }}
            >
              IQ is {iq}
            </Button>
            {error && <Alert severity="error">{error}</Alert>}
          </Box>
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#1a1a1a",
              borderRadius: 2,
              padding: 3,
              boxShadow: "0 0 10px rgba(255,255,255,0.1)",
              maxWidth: "350px",
            }}
          >
            <Typography variant="h5" sx={{ mb: 1, textAlign: "center" }}>
              Leaderboard
            </Typography>
            <Divider sx={{ bgcolor: "white", mb: 2 }} />
            <List>
              {leaderboard.length > 0 ? (
                leaderboard.map((entry, index) => (
                  <ListItem key={index} sx={{ color: "white" }}>
                    <ListItemText
                      primary={`${index + 1}. ${entry.username}`}
                      secondary={`IQ: ${entry.amount}`}
                      secondaryTypographyProps={{ color: "#b39ddb" }}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography textAlign="center" color="gray">
                  No data available
                </Typography>
              )}
            </List>
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Button
                variant="contained"
                onClick={fetchLeaderboard}
                sx={{
                  bgcolor: "#6a1b9a",
                  "&:hover": { bgcolor: "#4a148c" },
                }}
              >
                Refresh
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default IQLeaderboard;