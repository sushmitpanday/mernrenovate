import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react"; 
import SearchBox from '../components/SearchBox';

export default function GetStarted() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false); // Custom dropdown open/close state
  const [formData, setFormData] = useState({ 
    area: "", 
    service: "", 
    startDate: "", 
    cleaningType: "", 
    bedrooms: "" 
  });

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else {
      navigate(`/job-form/${formData.service}?area=${formData.area}`);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // Progress calculation for the orange line
  const progress = (step / 5) * 100;

  // Services array for custom dropdown mapping
  const services = [
    { value: "cleaning", label: "Cleaning" },
    { value: "carpenter", label: "Carpenter" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg relative">
        {/* Progress Line */}
        <div className="w-full bg-gray-200 h-1.5 mb-8 rounded-full overflow-hidden">
          <div className="bg-[#F97316] h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {step === 1 && "Where do you need service?"}
          {step === 2 && "What service do you need?"}
          {step === 3 && "When would you like the job to start?"}
          {step === 4 && "Type of cleaning job"}
          {step === 5 && "How many bedrooms need cleaning?"}
        </h2>

        {/* Step 1: Area */}
        {step === 1 && (
          <div className="mb-6">
            <SearchBox onSelect={(val) => setFormData({...formData, area: val})} />
          </div>
        )}

        {/* Step 2: Service (FIXED: Fully Custom Orange Hover Dropdown) */}
        {step === 2 && (
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

            {/* Custom Options List Menu */}
            {isOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-lg max-h-60 overflow-y-auto p-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
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

        {/* Step 3: When to start */}
        {step === 3 && (
          <div className="space-y-3 mb-6">
            {["I'm flexible", "ASAP", "Emergency", "Next few days"].map((opt) => (
              <label key={opt} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:border-[#F97316] transition">
                <input 
                  type="radio" 
                  name="start" 
                  value={opt} 
                  className="accent-[#F97316] w-4 h-4" 
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})} 
                />
                {opt}
              </label>
            ))}
          </div>
        )}

        {/* Step 4: Type of cleaning */}
        {step === 4 && (
          <div className="space-y-3 mb-6">
            {["End of lease clean", "One off clean", "Regular clean"].map((opt) => (
              <label key={opt} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:border-[#F97316] transition">
                <input 
                  type="radio" 
                  name="type" 
                  value={opt} 
                  className="accent-[#F97316] w-4 h-4" 
                  onChange={(e) => setFormData({...formData, cleaningType: e.target.value})} 
                />
                {opt}
              </label>
            ))}
          </div>
        )}

        {/* Step 5: Bedrooms */}
        {step === 5 && (
          <div className="space-y-3 mb-6">
            {["1", "2", "3", "4 or more"].map((opt) => (
              <label key={opt} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:border-[#F97316] transition">
                <input 
                  type="radio" 
                  name="beds" 
                  value={opt} 
                  className="accent-[#F97316] w-4 h-4" 
                  onChange={(e) => setFormData({...formData, bedrooms: e.target.value})} 
                />
                {opt}
              </label>
            ))}
          </div>
        )}

        <div className="flex gap-4">
          {step > 1 && (
            <button onClick={handleBack} className="flex-1 py-3 border rounded-xl font-bold text-gray-700 hover:bg-gray-100">Back</button>
          )}
          <button 
            onClick={handleNext}
            className="flex-1 py-3 bg-[#F97316] hover:bg-orange-600 text-white rounded-xl font-bold transition"
          >
            {step === 5 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}