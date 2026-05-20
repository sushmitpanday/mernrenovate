import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Jobs from './components/Jobs'
import Footer from './components/Footer'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'

// Teeno nayi files ko yahan import kiya hai (Aap apne folder structure ke hisab se path check kar lena)
import BusinessDashboard from './pages/BuisnessDashboard'
import CustomerDashboard from './pages/CustomerDashboard'
import CustomerBookingsPage from './pages/CustomerBooking'

// Ek Home component jo main sections ko hold karega
function Home() {
  return (
    <>
      <Hero />
      <Jobs />
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Header har page par dikhega */}
        <Header /> 

        {/* Main content area jisme pages switch honge */}
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Business Dashboard Route */}
            <Route path="/dashboard/business" element={<BusinessDashboard />} />
            
            {/* Customer Dashboard Routes */}
            <Route path="/dashboard/customer" element={<CustomerDashboard />} />
            <Route path="/dashboard/customer/bookings" element={<CustomerBookingsPage />} />
          </Routes>
        </main>

        {/* Footer har page par dikhega */}
        <Footer />
      </div>
    </Router>
  )
}

export default App