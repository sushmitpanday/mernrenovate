import React, { useState } from 'react';
import axios from 'axios';

const BusinessDashboard = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [view, setView] = useState('stats'); // 'stats' या 'edit'
    const [formData, setFormData] = useState({
        businessName: user.businessName || '',
        teamSize: user.teamSize || '',
        teamDetails: user.teamDetails || ''
    });

    const handleUpdate = async () => {
        try {
            const res = await axios.post('/api/profile/update', formData, {
                headers: { Authorization: localStorage.getItem('token') }
            });
            setUser(res.data); // नया डेटा सेट करें
            localStorage.setItem('user', JSON.stringify(res.data));
            alert("Profile Updated Successfully!");
            setView('stats');
        } catch (err) {
            alert("Error updating profile");
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Header with Toggle */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{user.businessName || 'Your Business'}</h1>
                    <p className="text-gray-600">Owner: {user.name}</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setView('stats')} className={`px-4 py-2 rounded ${view === 'stats' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>Stats</button>
                    <button onClick={() => setView('edit')} className={`px-4 py-2 rounded ${view === 'edit' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>Edit Profile</button>
                </div>
            </div>

            {/* Content Switcher */}
            {view === 'stats' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white rounded-xl shadow border-t-4 border-indigo-600">
                        <h3 className="font-bold text-xl mb-4">Business Stats</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-indigo-50 rounded">
                                <p className="text-sm">Team Size</p>
                                <p className="text-2xl font-bold">{user.teamSize || '0'}</p>
                            </div>
                            <div className="p-4 bg-indigo-50 rounded">
                                <p className="text-sm">Email</p>
                                <p className="font-semibold text-sm">{user.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="p-6 bg-white rounded-xl shadow max-w-lg">
                    <h3 className="font-bold text-xl mb-4">Edit Business Details</h3>
                    <input className="w-full p-3 border rounded mb-3" placeholder="Business Name" value={formData.businessName} onChange={(e) => setFormData({...formData, businessName: e.target.value})} />
                    <input type="number" className="w-full p-3 border rounded mb-3" placeholder="Team Size" value={formData.teamSize} onChange={(e) => setFormData({...formData, teamSize: e.target.value})} />
                    <textarea className="w-full p-3 border rounded mb-3" placeholder="Team Details / Expertise" value={formData.teamDetails} onChange={(e) => setFormData({...formData, teamDetails: e.target.value})} />
                    <button onClick={handleUpdate} className="w-full bg-indigo-600 text-white py-3 rounded font-bold hover:bg-indigo-700">Save Changes</button>
                </div>
            )}
        </div>
    );
};

export default BusinessDashboard;