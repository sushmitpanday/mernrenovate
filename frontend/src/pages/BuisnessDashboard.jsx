import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    if (!token) {
      navigate("/login");
      return;
    }

    const headers = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };

    // 1. User Profile Fetch Karo (Fixed to /api/users/me)
    fetch("http://localhost:5000/api/users/me", { method: "GET", headers })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });

    // 2. Bookings Fetch Karo (Token applied)
    fetch("http://localhost:5000/api/bookings/my-bookings", { method: "GET", headers })
      .then((res) => res.json())
      .then((data) => {
        setBookings(data || []);
        loading && setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = "/login"; // Force state cleanup
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-xl font-bold tracking-tight text-blue-600">
            SilverBricks Connect
          </Link>
          <div className="flex items-center gap-4">
            <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 border border-emerald-200">
              Business Account
            </span>
            <button onClick={handleSignOut} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">{user?.name || "Business"}'s Dashboard</h1>
          <p className="mt-2 text-slate-500">Manage bookings, services, and your business profile.</p>
        </div>

        {/* Tools */}
        <section className="mb-12">
          <h2 className="mb-4 text-lg font-bold text-slate-800">Management Tools</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {actions.map((item) => (
              <Link key={item.label} to={item.href} className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="text-4xl mb-4 w-fit">{item.icon}</div>
                  <div className="font-semibold text-slate-900 group-hover:text-blue-600 text-base">{item.label}</div>
                  <div className="text-sm text-slate-500 mt-1">{item.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mb-12 grid grid-cols-3 gap-5">
          <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
            <div className="text-3xl font-black text-blue-600">{bookings.length}</div>
            <div className="text-xs font-semibold text-slate-400 uppercase mt-1.5">Total Bookings</div>
          </div>
        </section>

        {/* Recent Bookings List */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">Recent Bookings</h2>
            <Link to="/dashboard/business/bookings" className="text-sm font-semibold text-blue-600 hover:underline">
              View all bookings →
            </Link>
          </div>

          {loading ? (
            <div className="rounded-xl border border-slate-200 bg-white py-12 text-center text-slate-400">
              Loading bookings…
            </div>
          ) : bookings.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white text-center py-16 px-4">
              <div className="text-4xl mb-3">✨</div>
              <p className="font-semibold text-slate-800 text-lg">No bookings yet</p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {bookings.map((b) => (
                <div key={b.id || b._id} className="rounded-xl border border-slate-200 bg-white p-5 flex items-center justify-between gap-4 shadow-sm">
                  <div>
                    <div className="font-semibold text-slate-900">Booking #{b.id || b._id}</div>
                    <div className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                      <span>{new Date(b.slot_datetime).toLocaleString()}</span>
                      {b.price && <span>• ${b.price}</span>}
                    </div>
                  </div>
                  <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase bg-blue-50 text-blue-700 border border-blue-200">
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}