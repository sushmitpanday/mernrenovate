import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Jobs from './components/Jobs'
import Footer from './components/Footer'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import GetStarted from './pages/GetStarted'
import BusinessDashboard from './pages/BuisnessDashboard'
import CustomerDashboard from './pages/CustomerDashboard'
import CustomerBookingsPage from './pages/CustomerBooking'

// Layout component jo Header aur Footer ke saath pages dikhayega
function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}

function Home() {
  return <><Hero /><Jobs /></>
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages with Header & Footer */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/login" element={<MainLayout><LoginPage /></MainLayout>} />
        <Route path="/register" element={<MainLayout><RegisterPage /></MainLayout>} />
        <Route path="/dashboard/business" element={<MainLayout><BusinessDashboard /></MainLayout>} />
        <Route path="/dashboard/customer" element={<MainLayout><CustomerDashboard /></MainLayout>} />
        <Route path="/dashboard/customer/bookings" element={<MainLayout><CustomerBookingsPage /></MainLayout>} />

        {/* Full screen page without Header & Footer */}
        <Route path="/get-started" element={<GetStarted />} />
      </Routes>
    </Router>
  )
}

export default App