import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

function Layout({ title, children }: LayoutProps) {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(true);
  const [refreshUser, setRefreshUser] = useState(0);

  useEffect(() => {
    fetch(`${apiUrl}/users/current-user`, {
      method: "GET",
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          setLoggedIn(false);
          setUsername(null);
          return;
        }
        const data = await response.json();
        setLoggedIn(true);
        setUsername(data.username);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiUrl, refreshUser]);

  const logout = () => {
    fetch(`${apiUrl}/users/logout`, {
      method: "POST",
      credentials: "include",
    }).then((response) => {
      if (response.ok) {
        setLoggedIn(false);
        setUsername(null);
        window.location.reload();
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="bg-[#1a001f] border-b border-purple-900 shadow-lg">
        <div className="max-w-5xl mx-auto flex justify-between items-center p-4 relative">
          <Link
            to="/"
            className="text-2xl font-semibold text-[#b39ddb] hover:text-[#d1c4e9] transition"
          >
            Creech
          </Link>

          <h3 className="absolute left-1/2 transform -translate-x-1/2 text-white text-xl">
            {title}
          </h3>

          {!loading && !loggedIn && (
            <nav className="flex gap-6">
              <Link to="/login" className="hover:text-[#b39ddb] transition">
                Login
              </Link>
            </nav>
          )}

          {!loading && loggedIn && (
            <nav className="flex gap-6 items-center">
              {username && (
                <span className="text-[#b39ddb] opacity-80">{username}</span>
              )}
              <button
                onClick={logout}
                className="hover:text-[#fb3d3d] transition"
              >
                Logout
              </button>
            </nav>
          )}
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-8">{children}</main>

      <footer className="bg-[#1a001f] border-t border-purple-900 text-center py-3 text-sm text-gray-400"></footer>
    </div>
  );
}

export default Layout;