import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "https://mernrenovate-3.onrender.com";
const STATUS_TABS = ["all", "confirmed", "pending", "completed", "cancelled"];

export default function CustomerBookingsPage() {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState("all");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }

    const url = activeStatus === "all" ? `${API_URL}/api/bookings` : `${API_URL}/api/bookings?status=${activeStatus}`;
    
    fetch(url, {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }
    })
      .then((res) => res.json())
      .then((data) => { setBookings(data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [activeStatus, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
       <h1 className="mb-6 text-3xl font-extrabold">My Bookings</h1>
       {/* ... Rest of your UI remains same ... */}
    </div>
  );
}