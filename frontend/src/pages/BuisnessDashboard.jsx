import React from 'react';
import { FaBuilding, FaUsers, FaBriefcase, FaEnvelope, FaChartBar, FaShieldAlt } from 'react-icons/fa';

export default function BusinessDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-blue-950/20 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-gray-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Enterprise <span className="text-blue-400">Control Hub</span></h1>
          <p className="text-xs text-gray-400 mt-1">Manage corporate trade contracts, handle staff allocation, and multi-job tracking.</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full text-[11px] font-bold text-blue-400 uppercase tracking-wider">
          <FaShieldAlt /> Company Tier Profile
        </div>
      </div>

      {/* ENTERPRISE METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Active Sub-Contractors", val: "14 Crew Members", icon: <FaUsers />, color: "from-blue-500 to-cyan-500" },
          { label: "Commercial Tenders", val: "4 Active", icon: <FaBriefcase />, color: "from-indigo-500 to-purple-500" },
          { label: "Monthly Gross Revenue", val: "$34,200 AUD", icon: <FaChartBar />, color: "from-emerald-500 to-teal-500" },
          { label: "Pending Claims", val: "2 Flags", icon: <FaEnvelope />, color: "from-red-500 to-orange-500" }
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

      {/* CORE INTERFACE CONTROL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Worker & Team Management */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                <FaUsers className="text-blue-400" /> Active Staff Deployments
              </h2>
              <button className="text-[10px] font-black uppercase tracking-wider text-blue-400 hover:underline">+ Provision Worker</button>
            </div>
            <div className="space-y-3">
              {[
                { name: "Marcus Vance", trade: "Senior Electrician", assignment: "Site 4 - Commercial Fitout", load: "Allocated" },
                { name: "Liam O'Connor", trade: "Apprentice Carpenter", assignment: "Unassigned / Available", load: "Bench" }
              ].map((worker, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex justify-between items-center hover:border-blue-500/20 transition-all">
                  <div>
                    <h4 className="text-sm font-bold text-white">{worker.name}</h4>
                    <p className="text-xs text-gray-400">{worker.trade} • <span className="text-gray-500 italic">{worker.assignment}</span></p>
                  </div>
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${worker.load === 'Allocated' ? 'bg-blue-500/10 text-blue-400' : 'bg-gray-500/10 text-gray-400'}`}>{worker.load}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Corporate Profile Settings */}
        <div className="space-y-6">
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-4 flex items-center gap-2">
              <FaBuilding className="text-blue-400" /> Corporate Registry
            </h2>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl">
                <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Company Name</p>
                <p className="font-bold text-white mt-0.5">Apex Electrical Solutions Pty Ltd</p>
              </div>
              <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl">
                <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Active ABN Target</p>
                <p className="font-bold text-white mt-0.5">45 109 238 456</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}