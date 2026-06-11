import React, { useState } from "react";
import axios from "axios";
import SearchBox from '../components/SearchBox';
import {useNavigate} from 'react-router-dom'

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://mernrenovate-19.onrender.com";

export default function PostJob() {
  const [formData, setFormData] = useState({
    area: "",
    service: "",
    title: "",
    description: "",
    startDate: "",
    images: []
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      images: [...e.target.files]
    });
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  if (!token) {
    localStorage.setItem(
      "pendingJob",
      JSON.stringify(formData)
    );

    navigate("/login");
    return;
  }

  try {
    await axios.post(
      `${API_BASE_URL}/api/customer/create`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Job posted successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to post job");
  }
};




  return (
    <div className="min-h-screen bg-orange-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-orange-600 mb-2">
          Post a Job
        </h1>

        <p className="text-gray-500 mb-8">
          Describe your job and receive quotes from providers.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
        <div>
  <label className="block mb-2 font-semibold text-gray-700">
    Area / Location
  </label>

  <SearchBox
    onSelect={(value) =>
      setFormData({
        ...formData,
        area: value,
      })
    }
  />
</div>

          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 focus:outline-none focus:border-orange-500"
            required
          >
            <option value="">Select Service</option>
            <option value="cleaning">Cleaning</option>
            <option value="carpenter">Carpenter</option>
            <option value="plumber">Plumber</option>
            <option value="electrician">Electrician</option>
            <option value="painting">Painting</option>
          </select>

          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 focus:outline-none focus:border-orange-500"
          />

          <textarea
            name="description"
            placeholder="Describe your job in detail..."
            rows="6"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 focus:outline-none focus:border-orange-500"
          />

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 focus:outline-none focus:border-orange-500"
            required
          />

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Upload Images
            </label>

            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full border rounded-xl p-3"
            />
          </div>
<button
  type="submit"
  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition"
>
  Post Job
</button>
  
        </form>
      </div>
    </div>
  );
}