import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Jobs() {
  // Sample Marketplace Jobs Data
  const initialJobs = [
    { id: 1, title: "Emergency Plumbing Needed", category: "Plumbing", location: "Sydney, NSW", budget: "$150 - $250", status: "Urgent", time: "2 mins ago" },
    { id: 2, title: "Kitchen Renovation & Cabinetry", category: "Carpentry", location: "Melbourne, VIC", budget: "$3,000+", status: "Active", time: "1 hour ago" },
    { id: 3, title: "Garden Clean-up & Retaining Wall", category: "Outdoor", location: "Brisbane, QLD", budget: "$500 - $800", status: "Active", time: "3 hours ago" },
    { id: 4, title: "Full House Rewiring", category: "Electrical", location: "Adelaide, SA", budget: "$1,500 - $2,200", status: "Active", time: "5 hours ago" },
    { id: 5, title: "Home Security Camera Installation", category: "Security", location: "Perth, WA", budget: "$400", status: "Urgent", time: "1 day ago" },
    { id: 6, title: "Commercial Office Cleaning", category: "Cleaning", location: "Sydney, NSW", budget: "$300/week", status: "Active", time: "2 days ago" },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  // Search filter logic
  const filteredJobs = initialJobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-slate-50 px-4 py-16 border-b border-gray-200">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">Marketplace</span>
            <h2 className="text-3xl font-extrabold text-gray-950 mt-1 md:text-4xl">
              Latest Active Jobs
            </h2>
            <p className="text-gray-500 mt-2 text-base">
              Real-time project leads available across Australia. Quote now to secure the job.
            </p>
          </div>
          <Link 
            to="/jobs" 
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 group whitespace-nowrap"
          >
            View All Marketplace Jobs <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>

        {/* Search Bar & Micro Filters - Pure Tailwind */}
        <div className="mb-8 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search jobs by title or location (e.g., Plumbing, Sydney)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-800"
            />
          </div>
          <select className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:border-blue-500">
            <option>All Categories</option>
            <option>Plumbing</option>
            <option>Electrical</option>
            <option>Carpentry</option>
            <option>Outdoor</option>
          </select>
        </div>

        {/* Jobs Grid Layout */}
        {filteredJobs.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className="group border border-gray-200/80 rounded-2xl p-6 hover:border-blue-300 hover:shadow-md transition-all bg-white flex flex-col justify-between"
              >
                <div>
                  {/* Status Badges & Budget */}
                  <div className="flex items-center justify-between mb-4">
                    <span 
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        job.status === "Urgent" 
                          ? "bg-rose-50 text-rose-600 ring-1 ring-rose-600/10" 
                          : "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-600/10"
                      }`}
                    >
                      {job.status}
                    </span>
                    <span className="text-base font-extrabold text-gray-900">{job.budget}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-950 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {job.title}
                  </h3>

                  {/* Category Chip */}
                  <span className="inline-block bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-0.5 rounded mb-4">
                    {job.category}
                  </span>

                  {/* Location & Time Stamp */}
                  <div className="flex items-center justify-between text-gray-500 text-xs border-t border-gray-100 pt-4 mb-5">
                    <span className="flex items-center gap-1 font-medium">
                      📍 {job.location}
                    </span>
                    <span className="flex items-center gap-1 text-gray-400">
                      🕒 {job.time}
                    </span>
                  </div>
                </div>

                {/* Button Action in Pure Tailwind Blue */}
                <Link 
                  to={`/jobs/${job.id}`} 
                  className="w-full text-center py-2.5 px-4 bg-white border border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all text-sm block shadow-sm shadow-blue-100"
                >
                  Quote on Job
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 font-medium">No active jobs found matching your search.</p>
          </div>
        )}

      </div>
    </section>
  );
}