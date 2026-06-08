import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  LayoutDashboard, Users, LogOut, PlusCircle, Briefcase, MapPin, Phone, Edit3
} from 'lucide-react';

const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'https://mernrenovate-19.onrender.com';

export default function TradieDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

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
    <div className="flex min-h-screen bg-gray-50">
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
            onClick={() => navigate('/my-profile')}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-white/10 transition-colors"
          >
            <Users size={18} /> My Profile
          </button>
          <button
            onClick={() => navigate('/register-provider')}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-blue-300"
          >
            <Edit3 size={18} /> {profile ? 'Update Details' : 'Add New'}
          </button>
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-400 hover:text-red-300 mt-6 px-3 py-2"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Welcome back{user.name ? `, ${user.name}` : ''}
            </h2>
            <p className="text-gray-500 mt-1">Manage your tradie profile and business details</p>
          </div>
          <button
            onClick={() => navigate('/register-provider')}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-orange-500/25 hover:from-orange-600 hover:to-orange-700 transition-all"
          >
            <PlusCircle size={20} />
            Add New
          </button>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl p-10 text-center text-gray-400">Loading...</div>
        ) : profile ? (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white rounded-2xl border shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <Briefcase className="text-orange-600" size={22} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Service</p>
                  <p className="font-bold text-lg">{profile.serviceTitle}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{profile.description || 'No description added yet.'}</p>
            </div>

            <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="text-gray-400" size={18} />
                <div>
                  <p className="text-xs text-gray-400">Service Area</p>
                  <p className="font-semibold">{profile.serviceArea || '—'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-gray-400" size={18} />
                <div>
                  <p className="text-xs text-gray-400">Mobile</p>
                  <p className="font-semibold">{profile.mobile1 || '—'}</p>
                </div>
              </div>
              <div className="pt-2">
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
                  profile.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {profile.status || 'Pending'}
                </span>
              </div>
            </div>

            <div className="md:col-span-2 bg-white rounded-2xl border shadow-sm p-6 flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/my-profile')}
                className="px-5 py-2.5 border-2 border-orange-500 text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-colors"
              >
                View Full Profile
              </button>
              <button
                onClick={() => navigate('/register-provider')}
                className="px-5 py-2.5 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
              >
                Edit Details
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PlusCircle className="text-orange-500" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No profile yet</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Create your tradie profile to start receiving job requests from customers in your area.
            </p>
            <button
              onClick={() => navigate('/register-provider')}
              className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors"
            >
              <PlusCircle size={20} /> Add New Profile
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
