import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://mernrenovate-19.onrender.com";

const CustomerDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/customer/my-jobs`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setJobs(res.data);
            } catch (err) {
                console.error("Error fetching jobs", err);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    return (
        <div className="p-10 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
            <p className="text-gray-500 mt-1">Your posted jobs and service requests</p>

            <div className="mt-8">
                {loading ? (
                    <p className="text-gray-400">Loading your jobs...</p>
                ) : jobs.length === 0 ? (
                    <div className="border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-500">
                        <p>No jobs posted yet.</p>
                        <p className="text-sm mt-1">Go to the homepage and post a task to get started.</p>
                    </div>
                ) : (
                    jobs.map((job) => (
                        <div key={job._id} className="border p-5 mb-4 shadow-sm rounded-xl bg-white">
                            <h3 className="font-bold text-lg capitalize text-orange-600">{job.service}</h3>
                            <div className="mt-3 space-y-1 text-sm text-gray-700">
                                {job.area && <p><span className="font-semibold">Area:</span> {job.area}</p>}
                                {job.description && <p><span className="font-semibold">Description:</span> {job.description}</p>}
                                {job.startDate && <p><span className="font-semibold">Start Date:</span> {job.startDate}</p>}
                                {job.cleaningType && <p><span className="font-semibold">Cleaning Type:</span> {job.cleaningType}</p>}
                                {job.bedrooms && <p><span className="font-semibold">Bedrooms:</span> {job.bedrooms}</p>}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
export default CustomerDashboard;
