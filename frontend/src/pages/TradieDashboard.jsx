import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  LayoutDashboard, Users, LogOut, PlusCircle, Briefcase, MapPin, Phone, Edit3
} from 'lucide-react';

const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'https://mernrenovate-21.onrender.com';

export default function TradieDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
  const fetchJobs = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/customer/jobs`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
console.log("Jobs:", res.data)
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchJobs();
}, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login', { state: { redirectTo: '/dashboard/tradie' } });
        return;
      }
      try {
        const res = await axios.get(`${API_BASE_URL}/api/provider/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        if (err.response?.status !== 404) console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('providerId');
    navigate('/login');
  };

  return (
   <div className="flex min-h-screen bg-gradient-to-br from-orange-50 to-white">

  {/* SIDEBAR */}
  <aside className="w-64 bg-[#0f172a] text-white p-6 hidden md:flex flex-col">
    <h1 className="text-xl font-black mb-10">
      <span className="text-gray-400">Silver</span>
      <span className="text-orange-500">Bricks</span>
    </h1>

    <nav className="space-y-2 flex-1">

      <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl bg-orange-500/20 text-orange-400 font-semibold">
        <LayoutDashboard size={18} /> Dashboard
      </button>

      <button
        onClick={() => setShowProfile(!showProfile)}
        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-white/10"
      >
        <Users size={18} /> My Profile
      </button>

      <button
        onClick={() => navigate('/register-provider')}
        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-blue-300 hover:bg-white/10"
      >
        <Edit3 size={18} /> {profile ? 'Edit Profile' : 'New Profile'}
      </button>

    </nav>

    <button
      onClick={handleLogout}
      className="flex items-center gap-3 text-red-400 mt-6 px-3 py-2"
    >
      <LogOut size={18} /> Logout
    </button>
  </aside>

  {/* MAIN */}
  <main className="flex-1 p-4 md:p-10">

    {/* HEADER */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          Welcome back{user?.name ? `, ${user.name}` : ''}
        </h2>
        <p className="text-gray-500">Manage jobs & profile</p>
      </div>

      <button
        onClick={() => navigate('/register-provider')}
        className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 flex items-center gap-2"
      >
        <PlusCircle size={18} /> {profile ? 'Edit Profile' : 'New Profile'}
      </button>
    </div>

    {/* PROFILE */}
    {showProfile && profile && (
      <div className="grid md:grid-cols-2 gap-6 mb-8">

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-lg font-bold text-orange-600 mb-3">
            Service Details
          </h3>

          <p><b>Service:</b> {profile?.serviceTitle || '-'}</p>
          <p className="mt-2"><b>Description:</b> {profile?.description || '-'}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-2">
          <div className="flex items-center gap-2">
            <MapPin size={16} /> {profile?.serviceArea || '-'}
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} /> {profile?.mobile1 || '-'}
          </div>

          <p className="text-sm text-gray-500">
            Status: {profile?.status || 'Pending'}
          </p>
        </div>

      </div>
    )}

    {/* JOBS */}
   <div className="bg-white rounded-2xl border shadow-sm p-5">
  <h3 className="text-xl font-bold text-orange-600 mb-4">
    Available Jobs
  </h3>

  <div className="grid gap-4">

    {(jobs || []).length === 0 ? (
      <p className="text-gray-400">No jobs available</p>
    ) : (
      jobs.map((job) => (
        <div
          key={job._id}
          className="border-l-4 border-orange-500 bg-orange-50 p-5 rounded-xl"
        >

          {/* TITLE */}
          <h4 className="text-lg font-bold text-gray-900">
            {job.service || job.title || "Job Request"}
          </h4>

          {/* DETAILS GRID */}
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">

            {job.area && (
              <p><span className="font-semibold">Area:</span> {job.area}</p>
            )}

            {job.startDate && (
              <p><span className="font-semibold">Start Date:</span> {job.startDate}</p>
            )}

            {job.cleaningType && (
              <p><span className="font-semibold">Cleaning Type:</span> {job.cleaningType}</p>
            )}

            {job.bedrooms && (
              <p><span className="font-semibold">Bedrooms:</span> {job.bedrooms}</p>
            )}

            {job.description && (
              <p className="md:col-span-2">
                <span className="font-semibold">Description:</span> {job.description}
              </p>
            )}

          </div>

          {/* ACTION */}
          <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600">
            View Details
          </button>

        </div>
      ))
    )}

  </div>
</div>

  </main>
</div>
  );
}