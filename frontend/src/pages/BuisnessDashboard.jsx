import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "https://mernrenovate-3.onrender.com";

const actions = [
  { label: "Bookings", icon: "📅", href: "/dashboard/business/bookings", desc: "Manage client bookings" },
  { label: "Services", icon: "🛎️", href: "/dashboard/business/services", desc: "Update your offerings" },
  { label: "Staff", icon: "👥", href: "/dashboard/business/staff", desc: "Manage your team" },
  { label: "Analytics", icon: "📊", href: "/dashboard/business/analytics", desc: "View business growth" },
];

export default function BusinessDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }

    const headers = { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" };

    // Fetch Profile
    fetch(`${API_URL}/api/users/me`, { method: "GET", headers })
      .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
      .then((data) => setUser(data))
      .catch(() => { localStorage.removeItem("token"); navigate("/login"); });

    // Fetch Bookings
    fetch(`${API_URL}/api/bookings/my-bookings`, { method: "GET", headers })
      .then((res) => res.json())
      .then((data) => { setBookings(data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [navigate]);

  const handleSignOut = () => { localStorage.clear(); window.location.href = "/login"; };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-xl font-bold text-blue-600">SilverBricks Connect</Link>
          <button onClick={handleSignOut} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">Sign out</button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="text-3xl font-extrabold">{user?.name || "Business"}'s Dashboard</h1>
        {/* ... Rest of your UI remains same ... */}
      </main>
    </div>
  );
}