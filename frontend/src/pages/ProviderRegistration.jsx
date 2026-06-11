import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  User, Phone, MapPin, Briefcase, FileText, Plus, Trash2, ArrowLeft, Save, Users
} from 'lucide-react';

const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'https://mernrenovate-21.onrender.com';

export default function ProviderRegistration() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [prefillLoading, setPrefillLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    serviceTitle: '',
    mobile1: '',
    mobile2: '',
    serviceArea: '',
    description: '',
  });
  const [teamMembers, setTeamMembers] = useState([{ name: '', role: '' }]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { redirectTo: '/register-provider' } });
      return;
    }

    const loadExisting = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/provider/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const p = res.data;
        setFormData({
          firstName: p.firstName || '',
          middleName: p.middleName || '',
          lastName: p.lastName || '',
          serviceTitle: p.serviceTitle || '',
          mobile1: p.mobile1 || '',
          mobile2: p.mobile2 || '',
          serviceArea: p.serviceArea || '',
          description: p.description || '',
        });
        if (p.teamMembers?.length) setTeamMembers(p.teamMembers);
      } catch (err) {
        if (err.response?.status !== 404) console.error(err);
      } finally {
        setPrefillLoading(false);
      }
    };
    loadExisting();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateMember = (index, field, value) => {
    const updated = [...teamMembers];
    updated[index][field] = value;
    setTeamMembers(updated);
  };

  const addMember = () => setTeamMembers([...teamMembers, { name: '', role: '' }]);

  const removeMember = (index) => {
    if (teamMembers.length === 1) return;
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        `${API_BASE_URL}/api/provider/register`,
        { ...formData, teamMembers: teamMembers.filter(m => m.name.trim()) },
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
      );
      navigate('/dashboard/tradie');
    } catch (err) {
      alert('Registration failed: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (prefillLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400">
        Loading form...
      </div>
    );
  }

  const inputClass =
    'w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-gray-800';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/dashboard/tradie')}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 mb-6 font-medium transition-colors"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-[#0f172a] to-gray-800 px-8 py-8 text-white">
            <p className="text-orange-400 text-sm font-semibold uppercase tracking-wider mb-1">Provider Setup</p>
            <h1 className="text-2xl md:text-3xl font-black">Build Your Tradie Profile</h1>
            <p className="text-gray-300 mt-2 text-sm">Fill in your details so customers can find and hire you.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
            {/* Personal Info */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <User className="text-orange-500" size={20} />
                <h2 className="font-bold text-lg text-gray-800">Personal Information</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">First Name *</label>
                  <input name="firstName" value={formData.firstName} onChange={handleChange} className={inputClass} required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Middle Name</label>
                  <input name="middleName" value={formData.middleName} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Last Name *</label>
                  <input name="lastName" value={formData.lastName} onChange={handleChange} className={inputClass} required />
                </div>
              </div>
            </section>

            {/* Service Info */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="text-orange-500" size={20} />
                <h2 className="font-bold text-lg text-gray-800">Service Details</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Service Title *</label>
                  <input name="serviceTitle" value={formData.serviceTitle} onChange={handleChange}
                    placeholder="e.g. Licensed Electrician, Plumber, Carpenter" className={inputClass} required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Service Area</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input name="serviceArea" value={formData.serviceArea} onChange={handleChange}
                      placeholder="e.g. Sydney, Melbourne CBD" className={`${inputClass} pl-10`} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Description</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <textarea name="description" value={formData.description} onChange={handleChange}
                      placeholder="Tell customers about your experience, certifications, and services..."
                      className={`${inputClass} pl-10 h-32 resize-none`} />
                  </div>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Phone className="text-orange-500" size={20} />
                <h2 className="font-bold text-lg text-gray-800">Contact</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Mobile *</label>
                  <input name="mobile1" value={formData.mobile1} onChange={handleChange}
                    placeholder="04XX XXX XXX" className={inputClass} required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Secondary Mobile</label>
                  <input name="mobile2" value={formData.mobile2} onChange={handleChange}
                    placeholder="Optional" className={inputClass} />
                </div>
              </div>
            </section>

            {/* Team Members */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="text-orange-500" size={20} />
                  <h2 className="font-bold text-lg text-gray-800">Team Members</h2>
                </div>
                <button type="button" onClick={addMember}
                  className="inline-flex items-center gap-1 text-sm text-orange-600 font-semibold hover:text-orange-700">
                  <Plus size={16} /> Add Member
                </button>
              </div>
              <div className="space-y-3">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <input value={member.name} onChange={(e) => updateMember(index, 'name', e.target.value)}
                      placeholder="Name" className={`${inputClass} flex-1`} />
                    <input value={member.role} onChange={(e) => updateMember(index, 'role', e.target.value)}
                      placeholder="Role" className={`${inputClass} flex-1`} />
                    <button type="button" onClick={() => removeMember(index)}
                      className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-500/25 hover:from-orange-600 hover:to-orange-700 disabled:opacity-60 transition-all"
            >
              {loading ? 'Saving...' : (
                <>
                  <Save size={20} /> Save & Go to Dashboard
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
