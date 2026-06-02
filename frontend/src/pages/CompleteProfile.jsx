import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const CompleteProfile = () => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('customer'); // default value
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email; // Login page se email pass hua

   // CompleteProfile.js ke handleSubmit mein:
const handleSubmit = async () => {
    try {
        const res = await axios.post('/api/complete-profile', { email, name, role });
        
        // Role ko local storage mein store karein taaki app yaad rakhe
        localStorage.setItem('userRole', role);
        
        // Role ke hisaab se redirect karein
        navigate(`/${role}-dashboard`); 
    } catch (error) {
        alert("Error!");
    }
};

    return (
        <div>
            <h2>Complete Your Profile</h2>
            <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <select onChange={(e) => setRole(e.target.value)}>
                <option value="customer">Customer</option>
                <option value="tradie">Tradie</option>
                <option value="owner">Owner</option>
            </select>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};
export default CompleteProfile