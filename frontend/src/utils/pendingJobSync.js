import axios from 'axios';

const API_BASE_URL = window.location.hostname === 'localhost' ?
    'http://localhost:5000' :
    'https://mernrenovate-19.onrender.com';

export function getPendingJobData() {
    const raw = localStorage.getItem('pendingJob') || localStorage.getItem('pendingBooking');
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

export function savePendingJobData(data) {
    localStorage.setItem('pendingJob', JSON.stringify(data));
}

export function clearPendingJobData() {
    localStorage.removeItem('pendingJob');
    localStorage.removeItem('pendingBooking');
}

export async function syncPendingJobToServer(token) {
    const jobData = getPendingJobData();
    console.log("Pending Job Data:", jobData);

    if (!jobData || !token) return;

    await axios.post(
        `${API_BASE_URL}/api/customer/create`,
        jobData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    clearPendingJobData();
}