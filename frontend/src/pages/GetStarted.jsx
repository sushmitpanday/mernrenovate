import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBox from '../components/SearchBox';

export default function GetStarted() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    area: "", 
    service: "", 
    startDate: "", 
    cleaningType: "", 
    bedrooms: "",
    description: "" 
  });

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      localStorage.setItem("pendingJob", JSON.stringify(formData));
      navigate("/login");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const progress = (step / 6) * 100;

  const services = [
    { value: "cleaning", label: "Cleaning" },
    { value: "carpenter", label: "Carpenter" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg relative">
        <div className="w-full bg-gray-200 h-1.5 mb-8 rounded-full overflow-hidden">
          <div className="bg-[#F97316] h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {step === 1 && "Where do you need service?"}
          {step === 2 && "What service do you need?"}
          {step === 3 && "When would you like the job to start?"}
          {step === 4 && "Type of cleaning job"}
          {step === 5 && "How many bedrooms need cleaning?"}
          {step === 6 && "Describe your job in detail"}
        </h2>

        {/* Step 1: Area */}
        {step === 1 && <div className="mb-6"><SearchBox onSelect={(val) => setFormData({...formData, area: val})} /></div>}

        {/* Step 2: Service */}
        {step === 2 && (
          <div className="relative mb-6">
            <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full p-4 border border-gray-200 rounded-xl bg-white text-left flex justify-between items-center focus:border-[#F97316] outline-none text-gray-800">
              <span>{formData.service ? services.find(s => s.value === formData.service)?.label : "Select a service"}</span>
              <svg className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {isOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-lg p-1.5">
                {services.map((item) => (
                  <div key={item.value} onClick={() => { setFormData({ ...formData, service: item.value }); setIsOpen(false); }} className={`p-3 text-sm font-medium rounded-lg cursor-pointer ${formData.service === item.value ? "bg-orange-50 text-[#F97316]" : "text-gray-700 hover:bg-orange-50"}`}>
                    {item.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Start Date */}
        {step === 3 && (
          <div className="space-y-3 mb-6">
            {["I'm flexible", "ASAP", "Emergency", "Next few days"].map((opt) => (
              <label key={opt} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:border-[#F97316]">
                <input type="radio" name="start" value={opt} className="accent-[#F97316] w-4 h-4" onChange={(e) => setFormData({...formData, startDate: e.target.value})} />
                {opt}
              </label>
            ))}
          </div>
        )}

        {/* Step 4: Cleaning Type */}
        {step === 4 && (
          <div className="space-y-3 mb-6">
            {["End of lease clean", "One off clean", "Regular clean"].map((opt) => (
              <label key={opt} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:border-[#F97316]">
                <input type="radio" name="type" value={opt} className="accent-[#F97316] w-4 h-4" onChange={(e) => setFormData({...formData, cleaningType: e.target.value})} />
                {opt}
              </label>
            ))}
          </div>
        )}

        {/* Step 5: Bedrooms */}
        {step === 5 && (
          <div className="space-y-3 mb-6">
            {["1", "2", "3", "4 or more"].map((opt) => (
              <label key={opt} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:border-[#F97316]">
                <input type="radio" name="beds" value={opt} className="accent-[#F97316] w-4 h-4" onChange={(e) => setFormData({...formData, bedrooms: e.target.value})} />
                {opt}
              </label>
            ))}
          </div>
        )}

        {/* Step 6: Description */}
        {step === 6 && (
          <div className="mb-6">
            <textarea className="w-full p-4 border border-gray-200 rounded-xl h-40 outline-none focus:border-[#F97316]" placeholder="Tell us more about the job..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          </div>
        )}

        <div className="flex gap-4">
          {step > 1 && <button onClick={handleBack} className="flex-1 py-3 border rounded-xl font-bold text-gray-700 hover:bg-gray-100">Back</button>}
          <button onClick={handleNext} className="flex-1 py-3 bg-[#F97316] hover:bg-orange-600 text-white rounded-xl font-bold transition">
            {step === 6 ? "Continue to Login" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}