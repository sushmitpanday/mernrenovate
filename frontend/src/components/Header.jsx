import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; 
import { FaBuilding, FaUserCircle } from "react-icons/fa";
import SearchBox from './SearchBox'; 

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // API Base URL Setup
  const API_BASE_URL = window.location.hostname === "localhost" 
    ? "http://localhost:5000" 
    : "https://mernrenovate-7.onrender.com";

  // 🔄 Auth status listen karne ke liye useEffect lagaya
 // useEffect ke andar update karein:
useEffect(() => {
  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Sirf local storage check karne ke bajaye server se verify karein
        const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: { "Content-Type": "application/json",
    "Authorization": `Bearer ${token}
            ` }
        });
        if (res.ok) {
          setUser({ loggedIn: true });
        } else {
          localStorage.removeItem("token");
          setUser(null);
        }
      } catch (e) {
        console.error("Auth check error:", e);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  checkAuth();
  window.addEventListener("auth-changed", checkAuth);
  return () => window.removeEventListener("auth-changed", checkAuth);
}, [API_BASE_URL]); // Ab API_BASE_URL use ho gaya

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsSidebarOpen(false);
    window.dispatchEvent(new Event("auth-changed"));
    navigate("/");
  };

  const leftLinks = [
    { name: "Find Trades", path: "/find-trades" },
    { name: "Find a Team", path: "/hire" },
    { name: "Categories", path: "/categories" },
    { name: "How it Works", path: "/how-it-works" },
    { name: "Membership", path: "/membership" },
  ];

  return (
    <>
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
        {/* Main Navbar Top Row */}
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 gap-3">
          
          {/* LEFT: Hamburger (Mobile) + Icon + Logo + Nav Links (Desktop) */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Mobile Hamburger Button */}
            <button className="lg:hidden p-1 text-gray-700 hover:text-orange-500 transition-colors" onClick={() => setIsSidebarOpen(true)}>
              <FiMenu size={26} />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-[#0f172a] to-gray-700 text-orange-500 p-2 rounded-xl shadow-md group-hover:scale-105 transition-transform">
                <FaBuilding size={20} />
              </div>
              <span className="text-xl font-black tracking-tight whitespace-nowrap text-[#0f172a] font-sans">
                <span className="text-gray-400">Silver</span>
                <span className="text-orange-500">Bricks</span>
              </span>
            </Link>
            
            {/* Desktop Left Links */}
            <div className="hidden lg:flex items-center gap-5 ml-2">
              {leftLinks.map(link => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT: Dynamic Actions Setup */}
          <div className="flex flex-wrap items-center justify-end gap-1.5 sm:gap-4 ml-auto">
            
            {/* Dynamic Link: Agar logged in nahi hai toh login bhejega, nahi toh join community */}
            <Link 
              to={user ? "/get-started" : "/login"} 
              className="text-[10px] sm:text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors whitespace-nowrap"
            >
              Become provider
            </Link>
            
            {!user ? (
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-4">
                {/* Fixed: Registration ya Dynamic startup layout target */}
                <Link 
                  to="/get-started" 
                  className="text-[10px] sm:text-sm font-bold bg-orange-500 text-white px-2 py-1.5 sm:px-4 rounded-lg hover:bg-orange-600 transition-colors shadow-sm whitespace-nowrap"
                >
                  List your business
                </Link>
                {/* Clean Separate Login Link */}
                <Link 
                  to="/login" 
                  className="text-[10px] sm:text-sm font-medium text-orange-500 border border-orange-500 px-1.5 py-1 sm:px-3 rounded-lg hover:bg-orange-50 transition-colors whitespace-nowrap"
                >
                  Login
                </Link>
              </div>
            ) : (
              // 🛠️ Dynamic Dashboard Icon/Link + Logout Option jab user log-in ho
              <div className="flex items-center gap-3">
                <Link 
                  to="/dashboard/customer" // Aap isko dynamic user.role ke sath bhi track kar sakte ho
                  className="flex items-center gap-1 text-sm font-semibold text-[#0f172a] hover:text-orange-500 transition-colors"
                >
                  <FaUserCircle size={18} className="text-orange-500" />
                  <span>Dashboard</span>
                </Link>
                <button onClick={handleLogout} className="text-[10px] sm:text-sm text-rose-600 font-medium hover:underline whitespace-nowrap ml-2">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM SEARCH BAR ROW */}
        <div className="border-t border-gray-100 bg-gray-50/50 py-2 px-4">
          <div className="mx-auto max-w-7xl flex justify-start lg:justify-center">
            <div className="w-full max-w-md lg:max-w-xs">
              <SearchBox onSelect={(loc) => navigate("/quick-start", {state: {selectedArea: loc}})} />
            </div>
          </div>
        </div>
      </nav>

      {/* SIDEBAR FOR MOBILE/TABLET */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="absolute left-0 top-0 w-72 h-full bg-white p-6 shadow-2xl flex flex-col justify-between border-r transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-8">
                <Link to="/" className="flex items-center gap-2" onClick={() => setIsSidebarOpen(false)}>
                  <div className="bg-[#0f172a] text-orange-500 p-2 rounded-xl">
                    <FaBuilding size={18} />
                  </div>
                  <span className="text-lg font-black text-[#0f172a]">
                    <span className="text-gray-400">Silver</span>
                    <span className="text-orange-500">Bricks</span>
                  </span>
                </Link>
                <button className="text-gray-500 hover:text-orange-500 transition-colors" onClick={() => setIsSidebarOpen(false)}>
                  <FiX size={26} />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {leftLinks.map(link => (
                  <Link 
                    key={link.name} 
                    to={link.path} 
                    className="text-base font-semibold text-gray-800 hover:text-orange-500 hover:bg-orange-50/50 px-3 py-2.5 rounded-xl transition-all"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar bottom dynamic controls */}
            <div className="border-t border-gray-100 pt-4">
              {user ? (
                <button 
                  onClick={handleLogout} 
                  className="w-full py-2.5 text-center text-sm font-medium text-rose-600 border border-rose-100 bg-rose-50 rounded-xl"
                >
                  Logout
                </button>
              ) : (
                <Link 
                  to="/login" 
                  className="block w-full py-2.5 text-center text-sm font-bold bg-orange-500 text-white rounded-xl"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}