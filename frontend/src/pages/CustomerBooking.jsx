import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const STATUS_TABS = ["all", "confirmed", "pending", "completed", "cancelled"];

export default function CustomerBookingsPage() {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState("all");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    const baseUrl = activeStatus === "all" ? "http://localhost:5000/api/bookings" : `http://localhost:5000/api/bookings?status=${activeStatus}`;
    
    fetch(baseUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setBookings(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeStatus, navigate]);

  const handleCancel = (bookingId) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to cancel?")) return;

    fetch(`http://localhost:5000/api/bookings/${bookingId}/cancel`, { 
      method: "POST",
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then((res) => {
        if (res.ok) {
          setBookings(bookings.map(b => (b.id === bookingId || b._id === bookingId) ? { ...b, status: "cancelled" } : b));
        }
      });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-xl font-bold text-blue-600">
            SilverBricks Connect
          </Link>
          <Link to="/dashboard/customer" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 bg-white shadow-sm">
            Dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="mb-6 text-3xl font-extrabold text-slate-900">My Bookings</h1>

        <div className="mb-8 flex gap-2 overflow-x-auto pb-1">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveStatus(tab)}
              className={`rounded-full px-5 py-2 text-sm font-semibold capitalize border transition-all ${
                activeStatus === tab
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="rounded-xl border border-slate-200 bg-white py-16 text-center text-slate-400">
            Loading bookings…
          </div>
        ) : bookings.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white py-20 text-center text-slate-400">
            <div className="text-5xl mb-4">📭</div>
            <p className="font-bold text-slate-800 text-lg">No bookings found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => {
              const bId = b.id || b._id;
              return (
                <div key={bId} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-6 flex-wrap sm:flex-nowrap">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-900 text-lg">Booking #{bId}</span>
                        <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase bg-blue-50 text-blue-700 border border-blue-200">
                          {b.status}
                        </span>
                      </div>
                      <div className="mt-4 space-y-2.5 text-sm text-slate-600">
                        <div>📅 {new Date(b.slot_datetime).toLocaleString()}</div>
                        <div>⏱ {b.duration_minutes} minutes duration</div>
                        {b.price && <div className="font-semibold text-slate-800">💰 Total Price: ${b.price}</div>}
                      </div>
                    </div>
                    {b.status !== "cancelled" && b.status !== "completed" && (
                      <button
                        onClick={() => handleCancel(bId)}
                        className="rounded-lg border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50"
                      >
                        Cancel Slot
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}