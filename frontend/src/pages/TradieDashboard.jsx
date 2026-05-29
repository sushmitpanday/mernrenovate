import React from 'react';
import { FaUser, FaTools, FaCalendarCheck, FaBell, FaCommentAlt, FaCheckCircle } from 'react-icons/fa';

export default function TradieDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-emerald-950/20 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-gray-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Tradie <span className="text-emerald-400">Workspace</span></h1>
          <p className="text-xs text-gray-400 mt-1">Manage your individual trade profile, availability, and client bookings.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
          <FaCheckCircle /> Verified Provider (ABN Active)
        </div>
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Active Bookings", val: "8 Jobs", icon: <FaCalendarCheck />, color: "from-emerald-500 to-teal-500" },
          { label: "Direct Requests", val: "3 New", icon: <FaTools />, color: "from-blue-500 to-indigo-500" },
          { label: "Unread Messages", val: "5 Chat", icon: <FaCommentAlt />, color: "from-amber-500 to-orange-500" },
          { label: "Total Earnings", val: "$2,450 AUD", icon: <FaCheckCircle />, color: "from-purple-500 to-pink-500" }
        ].map((stat, i) => (
          <div key={i} className="bg-white/[0.03] backdrop-blur-md border border-white/5 p-4 rounded-2xl shadow-xl">
            <div className={`w-8 h-8 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white text-sm mb-3 shadow-md`}>
              {stat.icon}
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
            <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">{stat.val}</h3>
          </div>
        ))}
      </div>

      {/* CORE SECTIONS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Jobs Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 sm:p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-4 flex items-center gap-2">
              <FaCalendarCheck className="text-emerald-400" /> Current Job Pipeline
            </h2>
            <div className="space-y-3">
              {[
                { client: "Dave Watson", service: "Leaking Tap Repair", date: "Today, 2:00 PM", status: "Confirmed", budget: "$180" },
                { client: "Sarah Jenkins", service: "Bathroom Tile Grouting", date: "Tomorrow, 9:00 AM", status: "Pending Escrow", budget: "$450" }
              ].map((job, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:border-emerald-500/20 transition-all">
                  <div>
                    <h4 className="text-sm font-bold text-white">{job.service}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">Client: {job.client} • <span className="text-emerald-400/80 font-medium">{job.date}</span></p>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto border-t sm:border-0 border-white/5 pt-2 sm:pt-0 mt-2 sm:mt-0">
                    <span className="text-sm font-black text-white">{job.budget}</span>
                    <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 mt-1">{job.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Profile & Notifications */}
        <div className="space-y-6">
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-4 flex items-center gap-2">
              <FaUser className="text-emerald-400" /> Service Settings
            </h2>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl flex justify-between">
                <span className="text-gray-400">Primary Trade</span>
                <span className="font-bold text-white">Plumbing</span>
              </div>
              <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl flex justify-between">
                <span className="text-gray-400">Hourly Base Rate</span>
                <span className="font-bold text-white">$85 AUD / hr</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}