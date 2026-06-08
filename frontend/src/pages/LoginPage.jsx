import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import imageone from '../assets/image copy.png';
import { syncPendingJobToServer } from '../utils/pendingJobSync';


const API_BASE_URL = window.location.hostname === "localhost" 
    ? "http://localhost:5000" 
    : "https://mernrenovate-19.onrender.com";

const api = axios.create({ baseURL: API_BASE_URL });

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location.state?.redirectTo;

    const sendOTP = async () => {
        if (!email) return alert("Please enter email");
        setLoading(true);
        try {
            await api.post('/api/send-otp', { email });
            alert("OTP successfully sent!");
            setStep(2);
        } catch (err) { alert("Failed to send OTP."); }
        finally { setLoading(false); }
    };

    const handleOtpChange = (index, value) => {
        if (value.length > 1) value = value.slice(0, 1);
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) document.getElementById(`otp-${index + 1}`).focus();
    };

const handleVerify = async () => {
    setLoading(true);
    try {
        const finalOtp = otp.join('');
        const res = await api.post('/api/verify-otp', { email, otp: finalOtp });
        
        if (res.data.isNewUser) {
            navigate('/register-details', { state: { email, redirectTo } });
        } else {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            localStorage.removeItem('providerId');
            
            try {
                await syncPendingJobToServer(res.data.token);
            } catch (err) {
                console.error("Failed to sync pending job:", err);
            }
            
            navigate(redirectTo || `/dashboard/${res.data.user.role}`);
        }
    } catch (err) { 
        console.error(err);
        alert("Invalid OTP!"); 
    }
    finally { setLoading(false); }
};

    return (
        // p-2 yahan padding kam ki hai mobile ke liye
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-2">
            {/* max-w-5xl se width badhai, min-h-[500px] se height fix ki */}
            <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-5xl min-h-[500px]">
                
                {/* Image Section - Padding hatayi */}
                <div className="w-full md:w-1/2 h-64 md:h-auto bg-orange-100 flex items-center justify-center">
                    <img src={imageone} alt="Auth" className="h-full w-full object-cover" />
                </div>

                {/* Form Section */}
                <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-8 text-gray-800">{step === 1 ? "Login" : "Verify OTP"}</h2>
                    
                    {step === 1 ? (
                        <input className="w-full p-4 border-2 rounded-xl mb-6 focus:border-orange-500 outline-none" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                    ) : (
                        <div className="flex justify-between gap-2 mb-8">
                            {otp.map((digit, i) => (
                                <input key={i} id={`otp-${i}`} type="text" maxLength="1" className="w-12 h-14 text-center text-xl border-2 rounded-xl focus:border-orange-500 outline-none" value={digit} onChange={(e) => handleOtpChange(i, e.target.value)} />
                            ))}
                        </div>
                    )}

                    <button className="w-full bg-orange-500 text-white p-4 rounded-xl font-bold text-lg flex items-center justify-center hover:bg-orange-600 transition" onClick={step === 1 ? sendOTP : handleVerify}>
                        {loading ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div> : (step === 1 ? "Send OTP" : "Verify")}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default LoginPage;