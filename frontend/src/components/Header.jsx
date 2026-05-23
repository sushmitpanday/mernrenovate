import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const API_BASE_URL = window.location.hostname === "localhost" 
    ? "http://localhost:5000" 
    : "https://mernrenovate-4.onrender.com";

  // Function ko useCallback mein rakha hai taaki useEffect mein stable rahe
  const fetchUserData = useCallback(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch(`${API_BASE_URL}/api/users/me`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
        .then((res) => {
          if (!res.ok) throw new Error("Token invalid");
          return res.json();
        })
        .then((data) => {
          setUser(data);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        });
    } else {
      setUser(null);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    // 1. Page load hone par check karo
    fetchUserData();

    // 2. Login event suno
    window.addEventListener("auth-changed", fetchUserData);

    // Cleanup
    return () => window.removeEventListener("auth-changed", fetchUserData);
  }, [fetchUserData]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    // Logout par bhi event fire karo taaki header turant 'Login' mode me aa jaye
    window.dispatchEvent(new Event("auth-changed"));
    navigate("/");
  };

  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold text-blue-600 tracking-tight hover:opacity-90 transition">
          SilverBricks Connect
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm font-semibold text-gray-700 capitalize">
                👋 Hello, {user.name ? user.name.split(" ")[0] : "User"}
              </span>
              <Link 
                to={user.role === "business" ? "/dashboard/business" : "/dashboard/customer"} 
                className="text-sm font-medium text-blue-600 border border-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
              >
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg transition-colors">
                Log in
              </Link>
              <Link to="/register" className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors shadow-sm inline-block">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}