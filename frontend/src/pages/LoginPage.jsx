import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBuilding } from "react-icons/fa";

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("customer"); // Default role

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = window.location.hostname === "localhost" 
    ? "http://localhost:5000" 
    : "https://mernrenovate-7.onrender.com";

  async function handleSendOTP(e) {
    e.preventDefault();
    if (phone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/send-otp`, { phone });
      if (response.data.success) {
        setStep(2);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOTP(e) {
    e.preventDefault();
    if (otp.length < 4) { 
      setError("Please enter a valid OTP.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/verify-otp`, { phone, otp });
      const data = response.data;

      if (data.token) localStorage.setItem("token", data.token);

      if (data.isNewUser) {
        setStep(3);
      } else {
        window.dispatchEvent(new Event("auth-changed"));
        redirectUser(data.role);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  }

  async function handleOnboarding(e) {
    e.preventDefault();
    if (!name || !email) {
      setError("Name and Email are required.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/complete-onboarding`,
        { name, email, role },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        if (response.data.token) localStorage.setItem("token", response.data.token);
        window.dispatchEvent(new Event("auth-changed"));
        redirectUser(response.data.role);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Profile setup failed.");
    } finally {
      setLoading(false);
    }
  }

  function redirectUser(userRole) {
    const roleRedirects = {
      customer: "/dashboard/customer",
      tradie: "/dashboard/business", 
      business_owner: "/dashboard/business"
    };
    navigate(roleRedirects[userRole] || "/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-orange-50/30 flex items-center justify-center p-4">
      <div className="w-full max-w-[1250px] bg-white rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-1/2 bg-[#0f172a] p-12 flex flex-col justify-end">
          <img src="/image copy.png" alt="Workspace" className="w-full h-full object-cover opacity-80" />
        </div>

        <div className="w-full lg:w-1/2 p-12 bg-white flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h1 className="text-2xl font-black mb-6">
              {step === 1 ? "Verify Mobile" : step === 2 ? "Enter OTP Code" : "Complete Setup"}
            </h1>
            {error && <div className="p-3 mb-4 text-xs text-red-700 bg-red-50 rounded-xl font-bold">⚠️ {error}</div>}

            {step === 1 && (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <input type="text" className="w-full p-3 bg-gray-50 border rounded-xl" placeholder="10 Digit Number" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} required />
                <button className="w-full py-3 bg-orange-500 text-white font-bold rounded-xl">Get Code</button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <input type="text" maxLength={8} className="w-full p-3 bg-gray-50 border rounded-xl text-center tracking-[0.5em]" placeholder="••••••••" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} required />
                <button className="w-full py-3 bg-orange-500 text-white font-bold rounded-xl">Verify</button>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleOnboarding} className="space-y-4">
                <input type="text" className="w-full p-3 bg-gray-50 border rounded-xl" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" className="w-full p-3 bg-gray-50 border rounded-xl" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                
                <div className="grid grid-cols-3 gap-2">
                  {["customer", "tradie", "business_owner"].map((r) => (
                    <div key={r} onClick={() => setRole(r)} className={`p-3 border rounded-xl cursor-pointer text-center text-xs font-bold ${role === r ? "border-orange-500 bg-orange-50" : "border-gray-200"}`}>
                      {r === "customer" ? "👤 Customer" : r === "tradie" ? "🛠️ Tradie" : "🏢 Owner"}
                    </div>
                  ))}
                </div>
                <button className="w-full py-3 bg-[#0f172a] text-white font-bold rounded-xl">Setup Dashboard</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}