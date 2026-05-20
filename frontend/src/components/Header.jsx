import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // 🛠️ CHANGED: Header me bhi local aur live render URL ka environment check lagaya hai
  const API_BASE_URL = window.location.hostname === "localhost" 
    ? "http://localhost:5000" 
    : "https://mernrenovate-2.onrender.com";

  // Check karo user logged in hai ya nahi jab page load ho
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // 🛠️ CHANGED: URL ko hardcoded localhost se hata kar `${API_BASE_URL}` ke sath dynamic kiya hai
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
          setUser(data); // User data state me set ho gaya (name, role, etc.)
        })
        .catch(() => {
          // Agar token kharab hai to clear kar do
          localStorage.removeItem("token");
          setUser(null);
        });
    }
  }, [API_BASE_URL]); // 🛠️ CHANGED: Dependency array me API_BASE_URL ko clean build ke liye pass kiya

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
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
            // --- AGAR USER LOGGED IN HAI ---
            <>
              <span className="text-sm font-semibold text-gray-700 capitalize">
                👋 Hello, {user.name.split(" ")[0]}
              </span>
              
              {/* Role ke hisab se sahi dashboard par bhejo */}
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
            // --- AGAR USER LOGGED IN NAHI HAI ---
            <>
              <Link 
                to="/login" 
                className="text-sm font-medium text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg transition-colors"
              >
                Log in
              </Link>
              
              <Link 
                to="/register" 
                className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors shadow-sm inline-block"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}