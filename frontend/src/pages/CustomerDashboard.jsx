import React from 'react';
import { FaSearch, FaPlusCircle, FaWallet, FaShieldAlt, FaComments, FaHistory } from 'react-icons/fa';

export default function CustomerDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-orange-50/30 text-gray-900 font-sans p-4 sm:p-6 lg:p-8">
      
      {/* HEADER PANEL */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0f172a]">Find Expert <span className="text-orange-500">Local Trades</span></h1>
          <p className="text-xs text-gray-500 mt-1">Book individual premium tradies or hire full enterprise commercial teams.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all">
          <FaPlusCircle /> Post A New Job
        </button>
      </div>

      {/* CORE CAPABILITIES UTILITY METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { title: "Secure Escrow Holding", val: "$450.00 AUD", sub: "Held in Vault Protection", icon: <FaShieldAlt />, color: "text-orange-500 bg-orange-500/10 border-orange-500/20" },
          { title: "Open Postings", val: "2 Broadcasts", sub: "Receiving Competing Quotes", icon: <FaSearch />, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
          { title: "Provider Communications", val: "4 Active Chats", sub: "Direct Tradie Connections", icon: <FaComments />, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" }
        ].map((item, idx) => (
          <div key={idx} className={`bg-white border rounded-2xl p-4 flex items-center justify-between shadow-sm`}>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.title}</p>
              <h3 className="text-lg font-black text-[#0f172a] mt-0.5">{item.val}</h3>
              <p className="text-[10px] text-gray-500 mt-0.5 font-medium">{item.sub}</p>
            </div>
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-sm ${item.color}`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* CLIENT TRACKING MANAGEMENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Bookings Flow */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0f172a] mb-4 flex items-center gap-2">
              <FaHistory className="text-orange-500" /> Active Service Orders
            </h2>
            <div className="space-y-3">
              {[
                { provider: "Precision Electrical Solutions", service: "Full House Rewiring Phase 1", budget: "$1,200", badge: "Milestone Paid", date: "Scheduled: May 30" },
                { provider: "Tom Harrison (Independent)", service: "Emergency Hot Water Maintenance", budget: "$320", badge: "Awaiting Escrow", date: "Urgent Dispatch Requested" }
              ].map((order, i) => (
                <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:border-orange-500/30 transition-all">
                  <div>
                    <h4 className="text-sm font-bold text-[#0f172a]">{order.service}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Contractor: <span className="font-semibold text-gray-700">{order.provider}</span></p>
                    <p className="text-[10px] text-orange-600 font-bold mt-1 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-full inline-block">{order.date}</p>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto border-t sm:border-0 border-gray-200/60 pt-2 sm:pt-0 mt-2 sm:mt-0">
                    <span className="text-sm font-black text-gray-900">{order.budget}</span>
                    <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-900 text-white mt-1 tracking-wide">{order.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security / Verification Guidelines Sidebar */}
        <div className="space-y-6">
          <div className="bg-[#0f172a] text-white rounded-2xl p-5 shadow-xl relative overflow-hidden">
            <div className="absolute right-0 bottom-0 text-gray-800 translate-x-4 translate-y-4 font-black text-8xl pointer-events-none opacity-10">🇦🇺</div>
            <h2 className="text-xs font-black uppercase tracking-widest text-orange-400 mb-2 flex items-center gap-1.5">
              <FaWallet size={11} /> Escrow Protection
            </h2>
            <p className="text-xs text-gray-300 leading-relaxed font-medium">
              Every deposit is safely stored in our verified Australian Escrow channel. Funds are only transferred once you check and mark the job completion milestone.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}