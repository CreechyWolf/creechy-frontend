import Layout from "../components/Layout";
import PageContentButtons from "../components/PageContentButtons";
import Button from "../components/Button";

function Home() {
  return (
    <Layout title="Gaze upon some random stuff">
      <PageContentButtons>
        <Button to="iq-leaderboard">IQ Leaderboard</Button>
        <Button to="projects">Projects</Button>
        <Button to="stats">Stats</Button>
        <Button to="login">Login</Button>
      </PageContentButtons>
    </Layout>
  );
}

export default Home;