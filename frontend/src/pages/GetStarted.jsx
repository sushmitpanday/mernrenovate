import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchBox from '../components/SearchBox';

const API_BASE_URL = window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://mernrenovate-19.onrender.com";

export default function GetStarted() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ 
    area: "", service: "", startDate: "", cleaningType: "", bedrooms: "", description: "" 
  });

  const handleNext = async () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      console.log("Saving Data:", formData); // DEBUG: देख कि सारा डेटा भर गया है या नहीं
      const token = localStorage.getItem("token");

      if (token) {
        try {
          await axios.post(`${API_BASE_URL}/api/customer/create`, formData, {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
          });
          navigate("/dashboard/customer");
        } catch (err) { alert("Error saving job: " + (err.response?.data?.error || err.message)); }
      } else {
        localStorage.setItem("pendingJob", JSON.stringify(formData));
        navigate("/login");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Step {step}: Tell us about the job</h2>
        
        {step === 1 && <SearchBox onSelect={(val) => setFormData({...formData, area: val})} />}
        {step === 2 && <input className="w-full p-3 border rounded" placeholder="Service (e.g. Deep Cleaning)" onChange={(e) => setFormData({...formData, service: e.target.value})} />}
        {step === 3 && <input type="date" className="w-full p-3 border rounded" onChange={(e) => setFormData({...formData, startDate: e.target.value})} />}
        {step === 4 && <input className="w-full p-3 border rounded" placeholder="Cleaning Type" onChange={(e) => setFormData({...formData, cleaningType: e.target.value})} />}
        {step === 5 && <input type="number" className="w-full p-3 border rounded" placeholder="Bedrooms" onChange={(e) => setFormData({...formData, bedrooms: e.target.value})} />}
        {step === 6 && <textarea className="w-full p-3 border rounded" placeholder="Job Description" onChange={(e) => setFormData({...formData, description: e.target.value})} />}
        
        <button onClick={handleNext} className="w-full mt-6 bg-orange-500 text-white p-3 rounded-lg font-bold">
          {step === 6 ? "Finish & Continue" : "Next"}
        </button>
      </div>
    </div>
  );
}