import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🛠️ CHANGED: Admin dashboard ki tarah yahan local aur live render URL ka logic add kiya hai
  const API_BASE_URL = window.location.hostname === "localhost" 
    ? "http://localhost:5000" 
    : "https://shining-12.onrender.com";

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 🛠️ CHANGED: Ab URL directly localhost nahi hit karegi, balki `${API_BASE_URL}` ke mutabik dynamic hit karegi
      const response = await axios.post(`${API_BASE_URL}/api/users/login`, {
        email,
        password,
      });

      const data = response.data;

      // Token instantly local storage me save karo
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      
      const roleRedirects = {
        customer: "/dashboard/customer",
        business: "/dashboard/business"
      };
      
      // Sahi dashboard par redirect karo tabhi refresh hoga layout
      const targetRoute = roleRedirects[data.user.role] || "/";
      
      // 🛠️ CHANGED: navigate() ki jagah window.location.href kiya taaki header naya token read kare aur dashboard load hote hi logout na kare
      window.location.href = targetRoute; 

    } catch (err) {
      if (err.response?.status === 404 || err.response?.status === 400) {
        setError(err.response.data?.message || "Invalid email or password. Please try again.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            SilverBricks Connect
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-500">Sign in to your account</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 font-medium border border-red-100">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-end">
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button 
              type="submit" 
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:bg-blue-400 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Log in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-blue-600 hover:underline">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}