import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import SearchBox from "../components/SearchBox";

export default function HireTrade() {
  const navigate = useNavigate();

  const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://mernrenovate-21.onrender.com";

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    trade: "",
    startDate: "",
    area: "",
    quoteType: "",
    hours: ""
  });
  const handleSubmit = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    localStorage.setItem(
      "pendingTradeHire",
      JSON.stringify(formData)
    );

    navigate("/login");
    return;
  }

  try {
    await axios.post(
      `${API_BASE_URL}/api/customer/trade-request`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Trade request submitted successfully");
    navigate("/tradie-dashboard");

  } catch (err) {
    console.error(err);
    alert("Failed to submit request");
  }
};

  const nextStep = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      localStorage.setItem(
        "pendingTradeHire",
        JSON.stringify(formData)
      );

      handleSubmit()
      
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-orange-600 mb-2">
          Hire a Trade
        </h1>

        <p className="text-gray-500 mb-8">
          Find qualified tradespeople near you.
        </p>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Describe the Trade
            </h2>

            <select
              value={formData.trade}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  trade: e.target.value
                })
              }
              className="w-full border rounded-xl p-3"
            >
              <option value="">Select Trade</option>
              <option value="Cleaner">Cleaner</option>
              <option value="Carpenter">Carpenter</option>
              <option value="Painter">Painter</option>
              <option value="Plumber">Plumber</option>
              <option value="Electrician">Electrician</option>
            </select>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              When do you need it?
            </h2>

            <select
              value={formData.startDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  startDate: e.target.value
                })
              }
              className="w-full border rounded-xl p-3"
            >
              <option value="">Select</option>
              <option value="ASAP">As Soon As Possible</option>
              <option value="This Week">This Week</option>
              <option value="Next Week">Next Week</option>
              <option value="Flexible">Flexible</option>
            </select>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Where do you need the trade?
            </h2>

            <SearchBox
              onSelect={(value) =>
                setFormData({
                  ...formData,
                  area: value
                })
              }
            />
          </>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Do you need a Quote or a Trade?
            </h2>

            <select
              value={formData.quoteType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  quoteType: e.target.value
                })
              }
              className="w-full border rounded-xl p-3"
            >
              <option value="">Select</option>
              <option value="Need Quote First">
                Need Quote First
              </option>
              <option value="Need Trade Immediately">
                Need Trade Immediately
              </option>
              <option value="Both">
                Both
              </option>
            </select>
          </>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              How many hours do you need?
            </h2>

            <select
              value={formData.hours}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hours: e.target.value
                })
              }
              className="w-full border rounded-xl p-3"
            >
              <option value="">Select Hours</option>
              <option value="1-2 Hours">1-2 Hours</option>
              <option value="3-5 Hours">3-5 Hours</option>
              <option value="Half Day">Half Day</option>
              <option value="Full Day">Full Day</option>
              <option value="Multiple Days">Multiple Days</option>
            </select>
          </>
        )}

        {/* STEP 6 */}
        {step === 6 && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Review Details
            </h2>

            <div className="space-y-2 bg-orange-50 p-4 rounded-xl">
              <p><b>Trade:</b> {formData.trade}</p>
              <p><b>When:</b> {formData.startDate}</p>
              <p><b>Area:</b> {formData.area}</p>
              <p><b>Requirement:</b> {formData.quoteType}</p>
              <p><b>Hours:</b> {formData.hours}</p>
            </div>
          </>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <button
              onClick={prevStep}
              className="px-6 py-3 border rounded-xl"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={nextStep}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold"
          >
            {step === 6 ? "Submit Request" : "Next"}
          </button>
        </div>

      </div>
    </div>
  );
}