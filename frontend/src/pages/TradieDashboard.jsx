import React from 'react';

const TradieDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user')) || {};

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800">Tradie Portal: {user.name}</h1>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-xl shadow-md">
                    <h3 className="font-bold text-gray-500">Specialization</h3>
                    <p className="text-xl font-bold text-blue-600">{user.specialization || 'Not Set'}</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-md">
                    <h3 className="font-bold text-gray-500">Verification</h3>
                    <p className="text-xl font-bold text-green-600">Documents Uploaded</p>
                </div>
            </div>
        </div>
    );
};
export default TradieDashboard;