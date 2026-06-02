import React, { useState } from 'react';
import axios from 'axios';

const TradieDashboard = () => {
    const [view, setView] = useState('profile'); // 'profile' या 'bookings'
    const [formData, setFormData] = useState({ firstName: '', specialization: '', phone: '' });

    const handleUpdate = async () => {
        await axios.post('/api/profile/update', formData, { headers: { Authorization: localStorage.getItem('token') }});
        alert("Updated!");
    };

    return (
        <div className="p-8">
            <div className="flex gap-4 mb-6">
                <button onClick={() => setView('profile')} className="p-3 bg-blue-500 text-white rounded">Edit Profile</button>
                <button onClick={() => setView('bookings')} className="p-3 bg-green-500 text-white rounded">View Bookings</button>
            </div>

            {view === 'profile' ? (
                <div className="bg-white p-6 shadow-lg rounded-xl">
                    <h2 className="text-xl font-bold mb-4">Complete Your Profile</h2>
                    <input className="w-full border p-2 mb-3" placeholder="First Name" onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                    <input className="w-full border p-2 mb-3" placeholder="Specialization" onChange={(e) => setFormData({...formData, specialization: e.target.value})} />
                    <button onClick={handleUpdate} className="bg-orange-500 text-white p-2 rounded">Save Details</button>
                </div>
            ) : (
                <div className="bg-white p-6 shadow-lg rounded-xl">
                    <h2 className="text-xl font-bold mb-4">Available Jobs</h2>
                    {/* यहाँ API से आई हुई bookings को Map करें */}
                </div>
            )}
        </div>
    );
};
export default TradieDashboard;