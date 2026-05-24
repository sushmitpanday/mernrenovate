import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBox from './SearchBox';

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const API_BASE_URL = window.location.hostname === "localhost" 
    ? "http://localhost:5000" 
    : "https://mernrenovate-5.onrender.com";

  const fetchUserData = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${API_BASE_URL}/api/users/me`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }
      })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => { localStorage.removeItem("token"); setUser(null); });
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchUserData();
    window.addEventListener("auth-changed", fetchUserData);
    return () => window.removeEventListener("auth-changed", fetchUserData);
  }, [fetchUserData]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between px-4 py-3 gap-3">
        
        {/* LOGO */}
        <Link to="/" className="text-lg md:text-xl font-bold text-blue-600 whitespace-nowrap">
          SilverBricks Connect
        </Link>

        {/* SEARCH: Mobile pe sabse niche */}
        <div className="w-full md:w-80 order-3 md:order-none">
          <SearchBox onLocationSelect={(loc) => console.log("Selected:", loc)} />
        </div>

        {/* USER MENU */}
        <div className="flex items-center gap-2 md:gap-3">
          {user ? (
            <>
              <span className="text-xs md:text-sm font-semibold text-gray-700 truncate max-w-[70px]">
                👋 {user.name?.split(" ")[0]}
              </span>
              <Link to={user.role === "business" ? "/dashboard/business" : "/dashboard/customer"} 
                    className="text-xs md:text-sm font-medium text-blue-600 border border-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-50">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="text-xs md:text-sm font-medium text-white bg-rose-600 px-3 py-1.5 rounded-lg hover:bg-rose-700">
                Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-xs md:text-sm font-medium text-gray-600 hover:text-blue-600">Log in</Link>
              <Link to="/register" className="text-xs md:text-sm font-medium text-white bg-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-700">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}