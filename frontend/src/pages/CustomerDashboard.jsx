import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://mernrenovate-21.onrender.com";

const CustomerDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [providers, setProviders] = useState([]);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

useEffect(() => {
    const fetchProviders = async () => {
        try {
            const providerRes = await axios.get(
                `${API_BASE_URL}/api/customer/matching-providers`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            setProviders(providerRes.data);
        } catch (err) {
            console.error(err);
        }
    };

    fetchProviders();
}, []);

useEffect(() => {
    const fetchJobs = async () => {
        try {
            const res = await axios.get(
                `${API_BASE_URL}/api/customer/my-jobs`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            setJobs(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    fetchJobs();
}, []);

    return (
     <div className="min-h-screen bg-orange-50 p-4 md:p-10">

  {/* HEADER */}
  <div className="max-w-6xl mx-auto mb-6">
    <h1 className="text-3xl font-bold text-orange-600">
      Welcome, {user.name}
    </h1>
    <p className="text-gray-600">
      Your posted jobs and service requests
    </p>
  </div>

  {/* MAIN LAYOUT */}
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

    {/* LEFT - PROVIDERS (Desktop) / TOP on Mobile */}
    <div className="order-2 md:order-1 bg-white rounded-2xl shadow-sm border p-5 h-fit">

      <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
        Matching Providers
      </h2>

      {providers.length === 0 ? (
        <p className="text-gray-500 text-sm">No providers found</p>
      ) : (
        providers.map((provider) => (
          <div
            key={provider._id}
            className="border rounded-xl p-4 mb-4 bg-orange-50"
          >

            <p><strong>First Name:</strong> {provider.firstName}</p>

            {provider.middleName && (
              <p><strong>Middle Name:</strong> {provider.middleName}</p>
            )}

            {provider.lastName && (
              <p><strong>Last Name:</strong> {provider.lastName}</p>
            )}

            {provider.email && (
              <p><strong>Email:</strong> {provider.email}</p>
            )}

            {provider.mobile1 && (
              <p><strong>Mobile 1:</strong> {provider.mobile1}</p>
            )}

            {provider.mobile2 && (
              <p><strong>Mobile 2:</strong> {provider.mobile2}</p>
            )}

            {provider.serviceTitle && (
              <p><strong>Service:</strong> {provider.serviceTitle}</p>
            )}

            {provider.serviceArea && (
              <p><strong>Service Area:</strong> {provider.serviceArea}</p>
            )}

            {provider.description && (
              <p><strong>Description:</strong> {provider.description}</p>
            )}

            <p><strong>Status:</strong> {provider.status}</p>

            {provider.teamMembers?.length > 0 && (
              <div className="mt-2">
                <strong>Team Members:</strong>

                {provider.teamMembers.map((m, i) => (
                  <div key={i} className="ml-3 text-sm">
                    <p>Name: {m.name}</p>
                    <p>Role: {m.role}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>

    {/* RIGHT - JOBS (Desktop) / BOTTOM on Mobile */}
    <div className="md:col-span-2 order-1 space-y-4">

      {loading ? (
        <p className="text-gray-400">Loading your jobs...</p>
      ) : jobs.length === 0 ? (
        <div className="bg-white border border-dashed p-8 rounded-xl text-center text-gray-500">
          No jobs posted yet.
        </div>
      ) : (
        jobs.map((job) => {
          const serviceLabel = job.service
            ? job.service.charAt(0).toUpperCase() + job.service.slice(1)
            : "Job Request";

          return (
            <div
              key={job._id}
              className="bg-white border-l-4 border-orange-500 rounded-xl shadow-sm p-5"
            >

              <h3 className="text-lg font-bold text-orange-600">
                {serviceLabel}
              </h3>

              {/* YOUR DETAILS */}
              <div className="mt-4">
                <h4 className="font-bold text-gray-800 mb-2">
                  Your Details
                </h4>

                <div className="text-sm text-gray-700 space-y-1.5">

                  {job.area && (
                    <p><strong>Area:</strong> {job.area}</p>
                  )}

                  {job.service && (
                    <p><strong>Service:</strong> {serviceLabel}</p>
                  )}

                  {job.startDate && (
                    <p><strong>Start:</strong> {job.startDate}</p>
                  )}

                  {job.cleaningType && (
                    <p><strong>Cleaning Type:</strong> {job.cleaningType}</p>
                  )}

                  {job.bedrooms && (
                    <p><strong>Bedrooms:</strong> {job.bedrooms}</p>
                  )}

                  {job.description && (
                    <p><strong>Description:</strong> {job.description}</p>
                  )}

                </div>
              </div>

            </div>
          );
        })
      )}

    </div>

  </div>
</div>
    );
};
export default CustomerDashboard;
