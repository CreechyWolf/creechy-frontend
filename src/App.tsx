import "./index.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import IQLeaderboard from "./pages/IQLeaderboard";
import { LoginForm } from "./components/LoginForm";
import Projects from "./pages/Projects";
import Visitors from "./pages/Visitors";
import Home from "./pages/Home";
import { CreateForm } from "./components/CreateForm";
import { trackVisitor } from "./utils/trackVisitors";

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    trackVisitor(apiUrl);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route index element={<Home />} />
        <Route path="iq-leaderboard" element={<IQLeaderboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="visitors" element={<Visitors />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="create" element={<CreateForm />} />
      </Routes>
    </div>
  );
}

export default App;