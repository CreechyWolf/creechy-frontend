import Layout from "../components/Layout";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";

interface Project {
  title: string;
  description: string;
  image: string;
  url: string;
}

interface Section {
  heading: string;
  subheading: string;
  items: Project[];
}

const sections: Section[] = [
  {
    heading: "Game a Week",
    subheading: "Made as part of a uni course where only a week was given to create a game from scratch.",
    items: [
      {
        title: "Trap Simulator",
        description: "Escape from a room by solving puzzles.",
        image: "/game-images/trap-simulator.png",
        url: "https://creechywolf.itch.io/trap-simulator",
      },
      {
        title: "The Light Line",
        description: "Walk across a room on the correct path.",
        image: "/game-images/the-light-line.png",
        url: "https://creechywolf.itch.io/the-light-line",
      },
      {
        title: "Strafe: Alpha",
        description: "Fight a boss, combine elements to break the immunity shields to progress.",
        image: "/game-images/strafe.PNG",
        url: "https://creechywolf.itch.io/strafe-alpha",
      },

    ],
  },
  {
    heading: "Other Uni",
    subheading: "These were made as part of other uni projects.",
    items: [
      {
        title: "The Spectator",
        description: "Literally just clicking on the screen. Made for a 20 second Game Jam.",
        image: "/game-images/the-spectator.PNG",
        url: "https://creechywolf.itch.io/the-spectator",
      },
      {
        title: "Spark",
        description: "A sort of 2D Sidescroller/Platformer type mixed with a Rhythm game mechanism. Final year project.",
        image: "/game-images/spark.png",
        url: "https://creechywolf.itch.io/spark",
      },
    ],
  },
  {
    heading: "Other",
    subheading: "Other random projects I've done",
    items: [
      {
        title: "Verity Simulator",
        description: "A simulator for the Verity encounter from the Destiny 2 raid: Salvations Edge.",
        image: "/game-images/verity.png",
        url: "https://creechywolf.itch.io/verity-sim",
      },
    ],
  },
];

function Projects() {
  return (
    <Layout title="Projects">
      <Box sx={{ p: 4, color: "white", textAlign: "left", alignItems: "flex-start" }}>
        {sections.map((section, sIdx) => (
          <Box key={sIdx} sx={{ mb: 8 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {section.heading}
              </Typography>
              <Typography variant="body1" sx={{ color: "#b39ddb", maxWidth: 600 }}>
                {section.subheading}
              </Typography>
            </Box>

            {/* Card Grid */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 4,
                justifyContent: "flex-start",
              }}
            >
              {section.items.map((p, i) => (
                <Card
                  key={i}
                  sx={{
                    width: 300,
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "#1e1e1e",
                    color: "white",
                    borderRadius: 3,
                    boxShadow: "0 0 12px rgba(255,255,255,0.1)",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={p.image}
                    alt={p.title}
                    sx={{ height: 270, objectFit: "cover" }}
                  />
                  <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <Typography variant="h6" gutterBottom>
                      {p.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, color: "#b39ddb" }}>
                      {p.description}
                    </Typography>

                    <Stack sx={{ mt: "auto" }}>
                      <Button
                        variant="contained"
                        fullWidth
                        href={p.url}
                        target="_blank"
                        sx={{
                          bgcolor: "#6a1b9a",
                          "&:hover": { bgcolor: "#4a148c" },
                        }}
                      >
                        Go
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Layout>
  );
}

export default Projects;
