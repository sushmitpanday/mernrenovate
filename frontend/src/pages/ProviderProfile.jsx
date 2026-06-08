import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  User, Phone, MapPin, Briefcase, Mail, ArrowLeft, Edit3, Users, Shield
} from 'lucide-react';

const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'https://mernrenovate-19.onrender.com';

export default function ProviderProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { redirectTo: '/my-profile' } });
      return;
    }

    axios.get(`${API_BASE_URL}/api/provider/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch(err => {
        if (err.response?.status === 404) {
          setError('no_profile');
        } else if (err.response?.status === 403) {
          setError('access_denied');
        } else {
          setError('unknown');
        }
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400">
        Loading your profile...
      </div>
    );
  }

  if (error === 'no_profile') {
    return (
      <div className="max-w-lg mx-auto p-10 text-center">
        <p className="text-gray-600 mb-4">You haven't created a provider profile yet.</p>
        <button
          onClick={() => navigate('/register-provider')}
          className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600"
        >
          Create Profile
        </button>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="max-w-lg mx-auto p-10 text-center text-red-500">
        Could not load profile. Please try again.
      </div>
    );
  }

  const fullName = [profile.firstName, profile.middleName, profile.lastName].filter(Boolean).join(' ');

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/dashboard/tradie')}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 mb-6 font-medium"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>

        <div className="bg-white rounded-3xl shadow-xl border overflow-hidden">
          <div className="bg-gradient-to-r from-[#0f172a] to-gray-800 px-8 py-10 text-white relative">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <p className="text-orange-400 text-sm font-semibold uppercase tracking-wider">My Profile</p>
                <h1 className="text-3xl font-black mt-1">{fullName}</h1>
                <p className="text-gray-300 mt-1 flex items-center gap-2">
                  <Briefcase size={16} /> {profile.serviceTitle}
                </p>
              </div>
              <span className={`self-start inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full ${
                profile.status === 'Verified'
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                  : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
              }`}>
                <Shield size={14} /> {profile.status || 'Pending'}
              </span>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <InfoCard icon={<User size={18} />} label="Full Name" value={fullName} />
              <InfoCard icon={<Briefcase size={18} />} label="Service Title" value={profile.serviceTitle} />
              <InfoCard icon={<Mail size={18} />} label="Email" value={profile.email} />
              <InfoCard icon={<Phone size={18} />} label="Mobile" value={profile.mobile1} />
              {profile.mobile2 && (
                <InfoCard icon={<Phone size={18} />} label="Secondary Mobile" value={profile.mobile2} />
              )}
              <InfoCard icon={<MapPin size={18} />} label="Service Area" value={profile.serviceArea || '—'} />
            </div>

            {profile.description && (
              <div className="mb-8">
                <h3 className="font-bold text-gray-800 mb-2">About</h3>
                <p className="bg-gray-50 p-5 rounded-2xl text-gray-700 leading-relaxed">{profile.description}</p>
              </div>
            )}

            {profile.teamMembers?.length > 0 && (
              <div className="mb-8">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Users size={18} className="text-orange-500" /> Team Members
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {profile.teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                        {member.name?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => navigate('/register-provider')}
              className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors"
            >
              <Edit3 size={18} /> Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
      <div className="text-orange-500 mt-0.5">{icon}</div>
      <div>
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{label}</p>
        <p className="font-semibold text-gray-800 mt-0.5">{value}</p>
      </div>
    </div>
  );
}
