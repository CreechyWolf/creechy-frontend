import Layout from "../components/Layout";
import ButtonList from "../components/ButtonList";
import Button from "../components/Button";
import PageContentButtons from "../components/PageContentButtons";
import { Typography } from "@mui/material";

function Home() {
  return (
    <Layout title="Home">
      <PageContentButtons>
        <ButtonList>
          <Typography
            variant="body2"
            sx={{ fontStyle: "italic", opacity: 0.6, mb: -1 }}>
            An account is required to save your points.
          </Typography>
          <Button to="iq-leaderboard">IQ Leaderboard</Button>
          <Button to="projects">Projects</Button>
          <Button to="visitors">Visitors</Button>
        </ButtonList>
      </PageContentButtons>
    </Layout>
  );
}

export default Home;