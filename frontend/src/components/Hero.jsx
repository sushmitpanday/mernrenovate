import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react"; 
import SearchBox from '../components/SearchBox'; // Sirf ye add kiya

export default function Hero() {
  const [showWizard, setShowWizard] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ area: "", service: "", description: "" });
  const [activeTab, setActiveTab] = useState("work"); 
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1 && formData.area) setStep(2);
    else if (step === 2 && formData.service) setStep(3);
    else if (step === 3 && formData.description) {
      localStorage.setItem("pendingJob", JSON.stringify(formData));
      navigate("/login"); 
      setShowWizard(false);
      setStep(1); 
    }
  };

  return (
    <section className="relative w-full bg-[#fcfbfa] pt-6 pb-20 md:pt-12 md:pb-28 px-4 overflow-hidden border-b border-gray-100">
      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
        
        {/* LEFT SECTION */}
        <div className="flex-1 max-w-2xl text-left w-full">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-100 to-gray-50/50 text-gray-600 rounded-full px-4 py-1.5 text-xs font-semibold mb-6 shadow-sm border border-gray-200/50">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Over 5,000 verified trades & teams online now
          </div>

          <h1 className="text-[#0f172a] text-4xl sm:text-5xl md:text-[56px] font-black tracking-tight leading-[1.15] mb-6 font-sans">
            Post a task, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-orange-600 italic font-serif font-normal">hire a trade,</span> <br />
            <span className="block mt-1">
              or list{" "}
              <span className="relative inline-block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-orange-600">
                your business.
                <span className="absolute left-0 bottom-2 w-full h-[6px] bg-gradient-to-r from-[#F97316]/20 to-orange-500/10 rounded-full"></span>
              </span>
            </span>
          </h1>

          <p className="text-gray-600 text-sm sm:text-base md:text-[17px] font-medium leading-relaxed max-w-xl mb-8 tracking-wide">
            Australia’s smartest marketplace for trades, teams and labour hire. Whether you need work done or want more work — {" "}
            <span className="text-gray-900 font-bold border-b-2 border-[#F97316]/20">SilverBricks gets you matched, fast.</span>
          </p>

          <div className="flex items-center bg-white border border-gray-200 p-2 rounded-2xl shadow-xl max-w-md gap-2 group focus-within:border-[#F97316] focus-within:ring-4 focus-within:ring-orange-100 transition-all duration-300">
            <input 
              type="text"
              readOnly
              onClick={() => setShowWizard(true)}
              placeholder="What do you need done? e.g. bathroom reno" 
              className="flex-1 bg-transparent px-3 text-sm text-gray-700 outline-none placeholder-gray-400 cursor-pointer"
            />
            <button 
              onClick={() => navigate("/post-job")}
              className="flex items-center gap-2 bg-gradient-to-r from-[#F97316] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 tracking-wide whitespace-nowrap"
            >
              <Search size={16} className="stroke-[3]" />
              <span>get free quotes</span>
            </button>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex-1 max-w-xl w-full relative mt-12 lg:mt-0">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100/80 p-6 sm:p-8 w-full relative">
            <div className="flex bg-[#fbf9f6] p-1.5 rounded-2xl gap-2 mb-8">
              <button onClick={() => setActiveTab("work")} className={`flex-1 text-center py-3 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === "work" ? "bg-white text-gray-900 shadow-md" : "text-gray-400 hover:text-gray-600"}`}>I need work done</button>
              <button onClick={() => setActiveTab("grow")} className={`flex-1 text-center py-3 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === "grow" ? "bg-white text-gray-900 shadow-md" : "text-gray-400 hover:text-gray-600"}`}>I am a Provider</button>
            </div>

            {activeTab === "work" ? (
              <div className="space-y-4">
                <button onClick={() => navigate("/post-job")} className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-orange-200 hover:shadow-lg transition-all duration-300 text-left group">
                  <div className="flex items-center gap-4"><div className="bg-slate-900 text-white p-3 rounded-xl group-hover:bg-[#F97316] transition-colors"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg></div><div><h4 className="font-bold text-gray-900 text-sm sm:text-base">Post a Job / Task</h4><p className="text-gray-400 text-xs mt-0.5">Describe what you need and receive free quotes.</p></div></div>
                  <span className="text-gray-300 group-hover:text-orange-500 font-bold transition-colors text-lg">➔</span>
                </button>
                <button onClick={() => setShowWizard(true)} className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-orange-200 hover:shadow-lg transition-all duration-300 text-left group">
                  <div className="flex items-center gap-4"><div className="bg-slate-900 text-white p-3 rounded-xl group-hover:bg-[#F97316] transition-colors"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></div><div><h4 className="font-bold text-gray-900 text-sm sm:text-base">Hire a Trade</h4><p className="text-gray-400 text-xs mt-0.5">Find an individual certified professional.</p></div></div>
                  <span className="text-gray-300 group-hover:text-orange-500 font-bold transition-colors text-lg">➔</span>
                </button>
                <button onClick={() => setShowWizard(true)} className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-orange-200 hover:shadow-lg transition-all duration-300 text-left group">
                  <div className="flex items-center gap-4"><div className="bg-slate-900 text-white p-3 rounded-xl group-hover:bg-[#F97316] transition-colors"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg></div><div><h4 className="font-bold text-gray-900 text-sm sm:text-base">Hire a Team & Workforce</h4><p className="text-gray-400 text-xs mt-0.5">Find multiple professionals for big projects.</p></div></div>
                  <span className="text-gray-300 group-hover:text-orange-500 font-bold transition-colors text-lg">➔</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                 <button onClick={() => navigate("/get-started")} className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-orange-200 hover:shadow-lg transition-all duration-300 text-left group">
                  <div className="flex items-center gap-4"><div className="bg-slate-900 text-white p-3 rounded-xl group-hover:bg-[#F97316] transition-colors"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg></div><div><h4 className="font-bold text-gray-900 text-sm sm:text-base">Become a Provider</h4><p className="text-gray-400 text-xs mt-0.5">Join as a verified tradie.</p></div></div>
                  <span className="text-gray-300 group-hover:text-orange-500 font-bold transition-colors text-lg">➔</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* WIZARD MODAL */}
      {showWizard && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white text-gray-800 p-6 sm:p-8 rounded-2xl w-full max-w-md shadow-2xl border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg sm:text-xl font-black text-[#0f172a]">
                {step === 1 ? "Where is the job?" : step === 2 ? "Select Service" : "Describe your problem"}
              </h3>
              <button onClick={() => { setShowWizard(false); setStep(1); }} className="text-gray-400 hover:text-[#F97316] text-sm font-bold">Close</button>
            </div>

            {/* Step 1 updated with SearchBox */}
            {step === 1 && (
              <div className="mb-5">
                <SearchBox onSelect={(val) => setFormData({...formData, area: val})} />
              </div>
            )}
            
            {step === 2 && (
              <select className="w-full p-3 border border-gray-200 rounded-xl mb-5 outline-none" value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})}>
                <option value="">Select Service</option>
                <option value="cleaning">Cleaning</option>
                <option value="carpenter">Carpenter</option>
                <option value="plumber">Plumber</option>
              </select>
            )}

            {step === 3 && (
              <textarea placeholder="Tell us what you need done in detail..." className="w-full p-3 border border-gray-200 rounded-xl mb-5 outline-none h-32" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
            )}

            <button onClick={handleNext} className="w-full bg-[#F97316] hover:bg-orange-600 text-white py-3 rounded-xl font-bold">
              {step === 3 ? "Continue to Login" : "Next Step"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}