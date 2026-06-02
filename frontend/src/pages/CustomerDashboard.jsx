import React from 'react';

const CustomerDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user')) || {};

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800">Hello, {user.name || 'Customer'}!</h1>
            <p className="text-gray-600">Email: {user.email}</p>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-xl shadow-md border-l-4 border-blue-500">
                    <h3 className="font-bold text-xl">My Profile</h3>
                    <p>Phone: {user.phone}</p>
                    <p>Location: {user.location}</p>
                </div>
            </div>
        </div>
    );
};
export default CustomerDashboard;