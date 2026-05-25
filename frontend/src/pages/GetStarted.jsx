import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBox from '../components/SearchBox';

export default function GetStarted() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
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

  // Progress calculation for the blue line
  const progress = (step / 5) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg relative">
        {/* Progress Line */}
        <div className="w-full bg-gray-200 h-1.5 mb-8 rounded-full overflow-hidden">
          <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
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

        {/* Step 2: Service */}
        {step === 2 && (
          <select className="w-full p-4 border rounded-xl mb-6 bg-white outline-blue-600" onChange={(e) => setFormData({...formData, service: e.target.value})}>
            <option value="">Select a service</option>
            <option value="cleaning">Cleaning</option>
            <option value="carpenter">Carpenter</option>
          </select>
        )}

        {/* Step 3: When to start */}
        {step === 3 && (
          <div className="space-y-3 mb-6">
            {["I'm flexible", "ASAP", "Emergency", "Next few days"].map((opt) => (
              <label key={opt} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:border-blue-600 transition">
                <input type="radio" name="start" value={opt} onChange={(e) => setFormData({...formData, startDate: e.target.value})} />
                {opt}
              </label>
            ))}
          </div>
        )}

        {/* Step 4: Type of cleaning */}
        {step === 4 && (
          <div className="space-y-3 mb-6">
            {["End of lease clean", "One off clean", "Regular clean"].map((opt) => (
              <label key={opt} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:border-blue-600 transition">
                <input type="radio" name="type" value={opt} onChange={(e) => setFormData({...formData, cleaningType: e.target.value})} />
                {opt}
              </label>
            ))}
          </div>
        )}

        {/* Step 5: Bedrooms */}
        {step === 5 && (
          <div className="space-y-3 mb-6">
            {["1", "2", "3", "4 or more"].map((opt) => (
              <label key={opt} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:border-blue-600 transition">
                <input type="radio" name="beds" value={opt} onChange={(e) => setFormData({...formData, bedrooms: e.target.value})} />
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
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition"
          >
            {step === 5 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}