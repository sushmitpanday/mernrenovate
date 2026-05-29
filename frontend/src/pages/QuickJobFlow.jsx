import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function QuickJobFlow() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Header se aaye hue area ko nikalenge, agar nahi mila to default empty string
  const initialArea = location.state?.selectedArea || "";

  // Kyuki Area pehle se mil chuka hai, ye flow direct Step 1 (jo ki yahan Service hai) se shuru hoga
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false); 
  const [formData, setFormData] = useState({ 
    area: initialArea, 
    service: "", 
    startDate: "", 
    cleaningType: "", 
    bedrooms: "" 
  });

  // Agar koi seedhe URL hit kare bina area ke, to use home par bhej de
  useEffect(() => {
    if (!initialArea) {
      navigate("/");
    }
  }, [initialArea, navigate]);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else {
      navigate(`/job-form/${formData.service}?area=${formData.area}`);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigate("/"); // Pehle step se back karne par home page
  };

  // Total 4 steps hain ab (Service, Date, Type, Bedrooms)
  const progress = (step / 4) * 100;

  const services = [
    { value: "cleaning", label: "Cleaning" },
    { value: "carpenter", label: "Carpenter" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg relative">
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-1.5 mb-8 rounded-full overflow-hidden">
          <div className="bg-[#F97316] h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>

        {/* Location Tag Badge */}
        <div className="inline-block bg-orange-50 text-[#F97316] text-xs font-bold px-3 py-1 rounded-full mb-4">
          📍 Location: {formData.area}
        </div>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {step === 1 && "What service do you need?"}
          {step === 2 && "When would you like the job to start?"}
          {step === 3 && "Type of cleaning job"}
          {step === 4 && "How many bedrooms need cleaning?"}
        </h2>

        {/* Step 1: Service Dropdown */}
        {step === 1 && (
          <div className="relative mb-6">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full p-4 border border-gray-200 rounded-xl bg-white text-left flex justify-between items-center focus:border-[#F97316] focus:ring-2 focus:ring-orange-100 outline-none text-gray-800 transition-all duration-200"
            >
              <span>
                {formData.service 
                  ? services.find(s => s.value === formData.service)?.label 
                  : "Select a service"
                }
              </span>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-lg max-h-60 overflow-y-auto p-1.5 inside-dropdown">
                <div
                  onClick={() => {
                    setFormData({ ...formData, service: "" });
                    setIsOpen(false);
                  }}
                  className="p-3 text-sm text-gray-400 cursor-pointer rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Select a service
                </div>
                {services.map((item) => (
                  <div
                    key={item.value}
                    onClick={() => {
                      setFormData({ ...formData, service: item.value });
                      setIsOpen(false);
                    }}
                    className={`p-3 text-sm font-medium rounded-lg cursor-pointer transition-colors ${
                      formData.service === item.value
                        ? "bg-orange-50 text-[#F97316]"
                        : "text-gray-700 hover:bg-orange-50/70 hover:text-[#F97316]"
                    }`}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 2: Start Date */}
        {step === 2 && (
          <div className="space-y-3 mb-6">
            {["I'm flexible", "ASAP", "Emergency", "Next few days"].map((opt) => (
              <label key={opt} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:border-[#F97316] transition">
                <input 
                  type="radio" 
                  name="start" 
                  value={opt} 
                  checked={formData.startDate === opt}
                  className="accent-[#F97316] w-4 h-4" 
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})} 
                />
                {opt}
              </label>
            ))}
          </div>
        )}

        {/* Step 3: Type of Cleaning */}
        {step === 3 && (
          <div className="space-y-3 mb-6">
            {["End of lease clean", "One off clean", "Regular clean"].map((opt) => (
              <label key={opt} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:border-[#F97316] transition">
                <input 
                  type="radio" 
                  name="type" 
                  value={opt} 
                  checked={formData.cleaningType === opt}
                  className="accent-[#F97316] w-4 h-4" 
                  onChange={(e) => setFormData({...formData, cleaningType: e.target.value})} 
                />
                {opt}
              </label>
            ))}
          </div>
        )}

        {/* Step 4: Bedrooms */}
        {step === 4 && (
          <div className="space-y-3 mb-6">
            {["1", "2", "3", "4 or more"].map((opt) => (
              <label key={opt} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:border-[#F97316] transition">
                <input 
                  type="radio" 
                  name="beds" 
                  value={opt} 
                  checked={formData.bedrooms === opt}
                  className="accent-[#F97316] w-4 h-4" 
                  onChange={(e) => setFormData({...formData, bedrooms: e.target.value})} 
                />
                {opt}
              </label>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button onClick={handleBack} className="flex-1 py-3 border rounded-xl font-bold text-gray-700 hover:bg-gray-100">
            Back
          </button>
          <button 
            onClick={handleNext}
            disabled={step === 1 && !formData.service}
            className="flex-1 py-3 bg-[#F97316] hover:bg-orange-600 disabled:bg-gray-200 disabled:cursor-not-allowed text-white rounded-xl font-bold transition"
          >
            {step === 4 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}