import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = window.location.hostname === "localhost" 
    ? "http://localhost:5000" 
    : "https://mernrenovate-18.onrender.com";

// यहाँ से withCredentials हटा दिया गया है
const api = axios.create({ baseURL: API_BASE_URL });

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const sendOTP = async () => {
        if (!email) return alert("Please enter email");
        setLoading(true);
        try {
            await api.post('/api/send-otp', { email });
            setStep(2);
        } catch (err) { alert("Failed to send OTP."); }
        finally { setLoading(false); }
    };

    const handleVerify = async () => {
        setLoading(true);
        try {
            const res = await api.post('/api/verify-otp', { email, otp });
            if (res.data.isNewUser) {
                navigate('/register-details', { state: { email } });
            } else {
                localStorage.setItem('user', JSON.stringify(res.data.user));
                navigate(`/dashboard/${res.data.user.role}`);
            }
        } catch (err) { alert("Invalid OTP!"); }
        finally { setLoading(false); }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">{step === 1 ? "Login" : "Verify OTP"}</h2>
                {step === 1 ? (
                    <><input className="w-full p-3 border rounded mb-4" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                      <button className="w-full bg-orange-500 text-white p-3 rounded" onClick={sendOTP}>Send OTP</button></>
                ) : (
                    <><input className="w-full p-3 border rounded mb-4" placeholder="Enter 6-digit OTP" onChange={(e) => setOtp(e.target.value)} />
                      <button className="w-full bg-orange-500 text-white p-3 rounded" onClick={handleVerify}>Verify & Login</button></>
                )}
            </div>
        </div>
    );
};
export default LoginPage;