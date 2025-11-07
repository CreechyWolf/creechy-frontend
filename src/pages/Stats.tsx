import Layout from "../components/Layout";
import PageContentButtons from "../components/PageContentButtons";
import Button from "../components/Button";

function Stats() {
  return (
    <Layout title="Stats">
      <PageContentButtons>
        <Button to="stats">Stats</Button>
        <Button to="iq-leaderboard">IQ Leaderboard</Button>
        <Button to="projects">Projects</Button>
      </PageContentButtons>
    </Layout>
  );
}

export default Stats;