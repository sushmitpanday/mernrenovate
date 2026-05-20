import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const quickActions = [
  { label: "Post a Job", icon: "📋", href: "/jobs/new", desc: "Get quotes from tradespeople" },
  { label: "Browse Trades", icon: "⚡", href: "/trades", desc: "Find skilled professionals" },
  { label: "My Bookings", icon: "📅", href: "/dashboard/customer/bookings", desc: "View all bookings" },
  { label: "My Jobs", icon: "🗓️", href: "/dashboard/customer/jobs", desc: "Track your job posts" },
];

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
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

    // 1. Fetch Profile (Fixed URL to /api/users/me)
    fetch("http://localhost:5000/api/users/me", { method: "GET", headers })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });

    // 2. Fetch Jobs (Token appended)
    fetch("http://localhost:5000/api/jobs", { method: "GET", headers })
      .then((res) => res.json())
      .then((data) => setJobs(data?.items || data || []))
      .catch(() => setJobs([]));

    // 3. Fetch Bookings (Token appended)
    fetch("http://localhost:5000/api/bookings", { method: "GET", headers })
      .then((res) => res.json())
      .then((data) => {
        setBookings(data || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setBookings([]);
      });
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = "/login"; // Force refresh headers state
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-xl font-bold text-blue-600">
            SilverBricks Connect
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/profile" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
              Profile
            </Link>
            <button
              onClick={handleSignOut}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">Good day, {user?.name || "Customer"}!</h1>
          <p className="mt-2 text-base text-slate-500">What can we help you with today?</p>
        </div>

        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className="mb-4 text-lg font-bold text-slate-800">Quick Actions</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((a) => (
              <Link key={a.label} to={a.href} className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="mb-4 text-4xl w-fit">{a.icon}</div>
                  <div className="font-semibold text-slate-900 group-hover:text-blue-600 text-base">{a.label}</div>
                  <div className="text-sm text-slate-500 mt-1">{a.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Jobs */}
        <section className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">Recent Jobs</h2>
            <Link to="/jobs/new" className="text-sm font-semibold text-blue-600 hover:underline">+ Post new job</Link>
          </div>

          {loading ? (
            <div className="rounded-xl border border-slate-200 bg-white py-12 text-center text-slate-400">Loading jobs…</div>
          ) : jobs.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white text-center py-16 px-4">
              <p className="font-semibold text-slate-800 text-lg">No jobs yet</p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {jobs.slice(0, 5).map((job) => (
                <div key={job.id || job._id} className="rounded-xl border border-slate-200 bg-white p-5 flex items-center justify-between gap-4 shadow-sm">
                  <div>
                    <div className="font-semibold text-slate-900 text-base">{job.title}</div>
                    <div className="text-sm text-slate-500 mt-1">{job.suburb || "Remote"}</div>
                  </div>
                  <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase bg-blue-50 text-blue-700 border border-blue-200">
                    {job.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Upcoming Bookings */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">Upcoming Bookings</h2>
            <Link to="/dashboard/customer/bookings" className="text-sm font-semibold text-blue-600 hover:underline">View all bookings →</Link>
          </div>

          {loading ? (
            <div className="rounded-xl border border-slate-200 bg-white py-12 text-center text-slate-400">Loading bookings…</div>
          ) : bookings.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white text-center py-12 px-4 shadow-sm">
              <p className="font-medium text-slate-700">No upcoming bookings found</p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {bookings.map((b) => (
                <div key={b.id || b._id} className="rounded-xl border border-slate-200 bg-white p-5 flex items-center justify-between gap-4 shadow-sm">
                  <div>
                    <div className="font-semibold text-slate-900">Booking #{b.id || b._id}</div>
                    <div className="text-sm text-slate-500 mt-1">{new Date(b.slot_datetime).toLocaleString()}</div>
                  </div>
                  <span className="rounded-full bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 text-xs font-semibold uppercase">
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