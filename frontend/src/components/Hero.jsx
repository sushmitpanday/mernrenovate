import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react"; 

export default function Hero() {
  const [showWizard, setShowWizard] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ area: "", service: "" });
  const [activeTab, setActiveTab] = useState("work"); // "work" or "grow"
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1 && formData.area) setStep(2);
    else if (step === 2 && formData.service) {
      navigate(`/job-form/${formData.service}?area=${formData.area}`);
      setShowWizard(false);
    }
  };

  return (
    // Yahan pt-16 ko pt-6 kiya hai taaki upar se space kam ho jaye
    <section className="relative w-full bg-[#fcfbfa] pt-6 pb-20 md:pt-12 md:pb-28 px-4 overflow-hidden border-b border-gray-100">
      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
        
        {/* LEFT SECTION: Branding & Search Logic */}
        <div className="flex-1 max-w-2xl text-left w-full">
          {/* Top Pill Alert */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-100 to-gray-50/50 text-gray-600 rounded-full px-4 py-1.5 text-xs font-semibold mb-6 shadow-sm border border-gray-200/50">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Over 5,000 verified trades & teams online now
          </div>

          {/* Upgraded Heading - text optimization with tight tracking and responsive leading */}
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

          {/* Upgraded Paragraph - Improved contrast, line-height, and font weights for a premium feel */}
          <p className="text-gray-600 text-sm sm:text-base md:text-[17px] font-medium leading-relaxed max-w-xl mb-8 tracking-wide">
            Australia’s smartest marketplace for trades, teams and labour hire. Whether you need work done or want more work —{" "}
            <span className="text-gray-900 font-bold border-b-2 border-[#F97316]/20">SilverBricks gets you matched, fast.</span>
          </p>

          {/* Embedded Custom Search Box */}
          <div className="flex items-center bg-white border border-gray-200 p-2 rounded-2xl shadow-xl max-w-md gap-2 group focus-within:border-[#F97316] focus-within:ring-4 focus-within:ring-orange-100 transition-all duration-300">
            <input 
              type="text"
              readOnly
              onClick={() => setShowWizard(true)}
              placeholder="What do you need done? e.g. bathroom reno" 
              className="flex-1 bg-transparent px-3 text-sm text-gray-700 outline-none placeholder-gray-400 cursor-pointer"
            />
            <button 
              onClick={() => navigate("/get-started")}
              className="flex items-center gap-2 bg-gradient-to-r from-[#F97316] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 tracking-wide whitespace-nowrap"
            >
              <Search size={16} className="stroke-[3]" />
              <span>get free quotes</span>
            </button>
          </div>

          {/* Stats Badges */}
          <div className="flex items-center gap-6 mt-8 border-t border-gray-100 pt-6">
            <div className="flex -space-x-2">
              <span className="w-8 h-8 rounded-full bg-orange-500 border-2 border-white"></span>
              <span className="w-8 h-8 rounded-full bg-slate-800 border-2 border-white"></span>
              <span className="w-8 h-8 rounded-full bg-emerald-600 border-2 border-white"></span>
              <span className="w-8 h-8 rounded-full bg-amber-400 border-2 border-white"></span>
            </div>
            <div>
              <p className="text-[#0f172a] font-bold text-sm">12,400+ jobs completed</p>
            </div>
            <div className="flex items-center gap-1 border-l border-gray-200 pl-6">
              <span className="text-amber-500 text-sm">★★★★★</span>
              <span className="text-gray-700 font-bold text-sm">4.9 / 5</span>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION: Main Actions Container without Floating Cards */}
        <div className="flex-1 max-w-xl w-full relative mt-12 lg:mt-0">
          
          {/* Main Action Box */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100/80 p-6 sm:p-8 w-full relative">
            
            {/* Tab Toggles */}
            <div className="flex bg-[#fbf9f6] p-1.5 rounded-2xl gap-2 mb-8">
              <button 
                onClick={() => setActiveTab("work")}
                className={`flex-1 text-center py-3 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === "work" ? "bg-white text-gray-900 shadow-md" : "text-gray-400 hover:text-gray-600"}`}
              >
                I need work done
              </button>
              <button 
                onClick={() => setActiveTab("grow")}
                className={`flex-1 text-center py-3 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === "grow" ? "bg-white text-gray-900 shadow-md" : "text-gray-400 hover:text-gray-600"}`}
              >
                I am a Provider
              </button>
            </div>

            {/* Dynamic Content based on selected Tab */}
            {activeTab === "work" ? (
              <div className="space-y-4">
                <span className="text-[11px] font-black tracking-wider text-gray-400 uppercase block mb-2">Select an Option</span>
                
                {/* Option 1: Post a job */}
                <button 
                  onClick={() => setShowWizard(true)}
                  className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-orange-200 hover:shadow-lg transition-all duration-300 text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-900 text-white p-3 rounded-xl group-hover:bg-[#F97316] transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base">Post a Job / Task</h4>
                      <p className="text-gray-400 text-xs mt-0.5">Describe what you need and receive free quotes.</p>
                    </div>
                  </div>
                  <span className="text-gray-300 group-hover:text-orange-500 font-bold transition-colors text-lg">➔</span>
                </button>

                {/* Option 2: Hire a trade */}
                <button 
                  onClick={() => { setShowWizard(true); setStep(1); }}
                  className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-orange-200 hover:shadow-lg transition-all duration-300 text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-900 text-white p-3 rounded-xl group-hover:bg-[#F97316] transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base">Hire a Trade</h4>
                      <p className="text-gray-400 text-xs mt-0.5">Find an individual certified professional for your task.</p>
                    </div>
                  </div>
                  <span className="text-gray-300 group-hover:text-orange-500 font-bold transition-colors text-lg">➔</span>
                </button>

                {/* Option 3: Hire a team */}
                <button 
                  onClick={() => { setShowWizard(true); setStep(1); }}
                  className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-orange-200 hover:shadow-lg transition-all duration-300 text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-900 text-white p-3 rounded-xl group-hover:bg-[#F97316] transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base">Hire a Team & Workforce</h4>
                      <p className="text-gray-400 text-xs mt-0.5">Find multiple professionals for big projects.</p>
                    </div>
                  </div>
                  <span className="text-gray-300 group-hover:text-orange-500 font-bold transition-colors text-lg">➔</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <span className="text-[11px] font-black tracking-wider text-gray-400 uppercase block mb-2">Grow Your Business</span>
                
                {/* Option 1: Become a Provider */}
                <button 
                  onClick={() => navigate("/get-started")}
                  className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-orange-200 hover:shadow-lg transition-all duration-300 text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-900 text-white p-3 rounded-xl group-hover:bg-[#F97316] transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base">Become a Provider</h4>
                      <p className="text-gray-400 text-xs mt-0.5">Join as a verified tradie and start receiving quality leads.</p>
                    </div>
                  </div>
                  <span className="text-gray-300 group-hover:text-orange-500 font-bold transition-colors text-lg">➔</span>
                </button>

                {/* Option 2: List your Business */}
                <button 
                  onClick={() => navigate("/get-started")}
                  className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-orange-200 hover:shadow-lg transition-all duration-300 text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-900 text-white p-3 rounded-xl group-hover:bg-[#F97316] transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0V11m0 5h2m2 0h2m-2-5a1 1 0 11-2 0 1 1 0 012 0zm-5 4a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base">List your Business</h4>
                      <p className="text-gray-400 text-xs mt-0.5">Put your company & whole team in front of ready-to-hire clients.</p>
                    </div>
                  </div>
                  <span className="text-gray-300 group-hover:text-orange-500 font-bold transition-colors text-lg">➔</span>
                </button>
              </div>
            )}

            {/* Bottom Info Note */}
            <div className="text-center mt-6 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 font-medium">
                No sign-up fees · <span className="text-orange-500 font-bold">Posting a task is always free</span>
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* WIZARD OVERLAY MODAL */}
      {showWizard && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white text-gray-800 p-6 sm:p-8 rounded-2xl w-full max-w-md shadow-2xl border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg sm:text-xl font-black text-[#0f172a]">
                {step === 1 ? "Where do you need service?" : "Select your service"}
              </h3>
              <button 
                onClick={() => { setShowWizard(false); setStep(1); }} 
                className="text-gray-400 hover:text-[#F97316] text-sm font-bold transition-colors"
              >
                Close
              </button>
            </div>

            {/* Step 1: Suburb */}
            {step === 1 && (
              <input 
                type="text" 
                placeholder="Enter suburb or postcode" 
                className="w-full p-3 border border-gray-200 rounded-xl mb-5 focus:border-[#F97316] outline-none text-sm transition-all"
                value={formData.area}
                onChange={(e) => setFormData({...formData, area: e.target.value})}
              />
            )}

            {/* Step 2: Dropdown */}
            {step === 2 && (
              <select 
                className="w-full p-3 border border-gray-200 rounded-xl mb-5 focus:border-[#F97316] outline-none text-sm bg-white transition-all"
                value={formData.service}
                onChange={(e) => setFormData({...formData, service: e.target.value})}
              >
                <option value="">Select Service</option>
                <option value="cleaning">Cleaning</option>
                <option value="carpenter">Carpenter</option>
                <option value="plumber">Plumber</option>
              </select>
            )}

            <button 
              onClick={handleNext}
              disabled={(step === 1 && !formData.area) || (step === 2 && !formData.service)}
              className="w-full bg-[#F97316] hover:bg-orange-600 disabled:bg-gray-200 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold transition-all text-sm shadow-md"
            >
              {step === 1 ? "Next Step" : "Finish & Book"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}