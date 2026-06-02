import React from 'react';

const BusinessDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user')) || {};

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800">Business: {user.businessName || 'Your Business'}</h1>
            <p className="text-gray-600">Owner: {user.name}</p>
            
            <div className="mt-8 p-6 bg-white rounded-xl shadow-lg border-t-4 border-indigo-600">
                <h3 className="font-bold text-xl mb-4">Business Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-indigo-50 rounded">
                        <p className="text-sm">Team Size</p>
                        <p className="text-2xl font-bold">{user.teamSize || '0'}</p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded">
                        <p className="text-sm">Business Email</p>
                        <p className="font-semibold">{user.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default BusinessDashboard;