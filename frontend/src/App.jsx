import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TopHeader from './components/TopHeader' 
import Header from './components/Header'
import Hero from './components/Hero'
import CategorySection from './components/AboutUs' 
import Jobs from './components/Jobs'
import Footer from './components/Footer'
import GetStarted from './pages/GetStarted'
import QuickJobFlow from './pages/QuickJobFlow' 
import BusinessDashboard from './pages/BuisnessDashboard' // Note: Check spelling 'Buisness' vs 'Business' in your file name
import CustomerDashboard from './pages/CustomerDashboard'
import TradieDashboard from './pages/TradieDashboard' // <-- 1. Tradie Dashboard Imported
import LoginPage from './pages/LoginPage'

function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopHeader /> 
      <Header /> 
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}

function Home() {
  return (
    <>
      <Hero />
      <Jobs />
      <CategorySection />
    </>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        
        {/* Login Page (Full Screen Glassmorphic View) */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Dashboards Layer with Standard Layout Header/Footer */}
        <Route path="/dashboard/business" element={<MainLayout><BusinessDashboard /></MainLayout>} />
        <Route path="/dashboard/customer" element={<MainLayout><CustomerDashboard /></MainLayout>} />
        <Route path="/dashboard/tradie" element={<MainLayout><TradieDashboard /></MainLayout>} /> {/* <-- 2. Tradie Route Added Successfully */}

        {/* Full screen onboarding/flow pages */}
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/quick-start" element={<QuickJobFlow />} /> 
      </Routes>
    </Router>
  )
}

export default App;