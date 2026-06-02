import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const API_BASE_URL = window.location.hostname === "localhost" 
    ? "http://localhost:5000" 
    : "https://mernrenovate-17.onrender.com";

const api = axios.create({ baseURL: API_BASE_URL });

const RegisterDetails = () => {
    const location = useLocation();
    const email = location.state?.email || ''; 
    const navigate = useNavigate();

    // 1. Loading state add kiya taaki redirect control kar sakein
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState('customer');
    const [formData, setFormData] = useState({ 
        name: '', phone: '', location: '', 
        specialization: '', businessName: '', teamSize: '', documents: null 
    });

    useEffect(() => {
        // Agar email nahi hai, toh seedha login par bhejo
        if (!email) {
            navigate('/login');
        }
    }, [email, navigate]);

    const handleSubmit = async () => {
        setLoading(true);
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        data.append('email', email);
        data.append('role', role);

        try {
            // Backend call
            const res = await api.post('/api/complete-profile', data);
            
            // Success hone par localStorage set karein
            if (res.data.success) {
                localStorage.setItem('user', JSON.stringify(res.data.user));
                // Redirect karein
                navigate(`/dashboard/${role}`, { replace: true });
            }
        } catch (err) { 
            console.error(err);
            alert("Error saving profile! Check console."); 
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Complete Your Profile</h2>
                
                {/* Role Tabs */}
                <div className="flex gap-4 mb-8">
                    {['customer', 'tradie', 'owner'].map((r) => (
                        <button key={r} onClick={() => setRole(r)} 
                            className={`flex-1 py-3 rounded-lg font-bold capitalize transition ${role === r ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}>
                            {r}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <input className="p-3 border rounded-lg col-span-2" placeholder="Full Name" onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    <input className="p-3 border rounded-lg" placeholder="Phone" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                    <input className="p-3 border rounded-lg" placeholder="Location" onChange={(e) => setFormData({...formData, location: e.target.value})} />
                </div>

                {(role === 'tradie' || role === 'owner') && (
                    <div className="mt-6 border-t pt-6">
                        <h4 className="font-bold mb-4">Professional Details</h4>
                        {role === 'owner' && (
                            <div className="grid grid-cols-2 gap-4">
                                <input className="p-3 border rounded-lg" placeholder="Business Name" onChange={(e) => setFormData({...formData, businessName: e.target.value})} />
                                <input className="p-3 border rounded-lg" placeholder="Team Size" onChange={(e) => setFormData({...formData, teamSize: e.target.value})} />
                            </div>
                        )}
                        {role === 'tradie' && <input className="w-full p-3 border rounded-lg" placeholder="Specialization" onChange={(e) => setFormData({...formData, specialization: e.target.value})} />}
                        <div className="mt-4"><label className="block text-sm font-semibold mb-2">Upload Documents</label>
                        <input type="file" className="w-full p-2 border rounded-lg" onChange={(e) => setFormData({...formData, documents: e.target.files[0]})} /></div>
                    </div>
                )}
                
                <button 
                    onClick={handleSubmit} 
                    disabled={loading}
                    className={`w-full mt-8 py-4 rounded-xl font-bold text-white ${loading ? 'bg-gray-400' : 'bg-orange-600 hover:bg-orange-700'}`}
                >
                    {loading ? "Saving..." : "Submit Details"}
                </button>
            </div>
        </div>
    );
};
export default RegisterDetails;