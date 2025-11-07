import "./index.css";
import { Routes, Route } from "react-router-dom";
import IQLeaderboard from "./pages/IQLeaderboard";
import { LoginForm } from "./components/LoginForm";
import Projects from "./pages/Projects";
import Stats from "./pages/Stats";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route index element={<Home />} />
        <Route path="iq-leaderboard" element={<IQLeaderboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="stats" element={<Stats />} />
        <Route path="login" element={<LoginForm />} />
      </Routes>
    </div>
  );
}

export default App;
