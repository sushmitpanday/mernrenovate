import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "https://mernrenovate-3.onrender.com";

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
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

    // Fetch Jobs & Bookings
    fetch(`${API_URL}/api/jobs`, { method: "GET", headers })
      .then((res) => res.json())
      .then((data) => setJobs(data?.items || data || []));

    fetch(`${API_URL}/api/bookings`, { method: "GET", headers })
      .then((res) => res.json())
      .then((data) => { setBookings(data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
       <h1 className="text-3xl font-extrabold">Good day, {user?.name || "Customer"}!</h1>
       {/* ... Rest of your UI remains same ... */}
    </div>
  );
}