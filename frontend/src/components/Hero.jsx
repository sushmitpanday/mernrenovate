import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Hero() {
  const [showWizard, setShowWizard] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ area: "", service: "" });
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1 && formData.area) setStep(2);
    else if (step === 2 && formData.service) {
      navigate(`/job-form/${formData.service}?area=${formData.area}`);
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-700 to-blue-950 px-4 py-24 text-white">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-6 text-4xl md:text-6xl font-bold leading-tight">
          Australia's All-in-One Services Marketplace
        </h1>

        {/* Buttons */}
        <div className="flex justify-center gap-3">
         <Link to="/get-started" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-8 py-3 rounded-lg">
  Get Started
</Link>
          <Link to="/trades" className="border border-white/60 text-white hover:bg-white/10 px-8 py-3 rounded-lg">
            Browse Tradies
          </Link>
        </div>
      </div>

      {/* WIZARD OVERLAY */}
      {showWizard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white text-gray-800 p-8 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">{step === 1 ? "Where do you need service?" : "Select your service"}</h3>
              <button onClick={() => setShowWizard(false)} className="text-gray-500">Close</button>
            </div>

            {/* Step 1: Area Selection */}
            {step === 1 && (
              <input 
                type="text" 
                placeholder="Enter suburb" 
                className="w-full p-3 border rounded-lg mb-4"
                onChange={(e) => setFormData({...formData, area: e.target.value})}
              />
            )}

            {/* Step 2: Service Selection */}
            {step === 2 && (
              <select 
                className="w-full p-3 border rounded-lg mb-4"
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
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold"
            >
              {step === 1 ? "Next" : "Finish & Book"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}