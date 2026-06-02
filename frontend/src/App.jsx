import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TopHeader from './components/TopHeader';
import Header from './components/Header';
import Hero from './components/Hero';
import CategorySection from './components/AboutUs';
import Jobs from './components/Jobs';
import Footer from './components/Footer';
import GetStarted from './pages/GetStarted';
import QuickJobFlow from './pages/QuickJobFlow';
import BusinessDashboard from './pages/BuisnessDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import TradieDashboard from './pages/TradieDashboard';
import LoginPage from './pages/LoginPage';
import RegisterDetails from './pages/RegisterDetails'; // Naya import

// Protected Route Component
const ProtectedRoute = ({ children, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" />;
  }
  
  return children;
};

// Main Layout Wrapper
function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopHeader />
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

// Home Component
function Home() {
  return (
    <>
      <Hero />
      <Jobs />
      <CategorySection />
    </>
  );
}

// Main App Component
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-details" element={<RegisterDetails />} /> {/* Naya Route */}
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/quick-start" element={<QuickJobFlow />} />



        {/* Protected Dashboard Routes */}
        <Route path="/dashboard/business" element={
          <ProtectedRoute allowedRole="owner">
            <MainLayout><BusinessDashboard /></MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/customer" element={
          <ProtectedRoute allowedRole="customer">
            <MainLayout><CustomerDashboard /></MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/tradie" element={
          <ProtectedRoute allowedRole="tradie">
            <MainLayout><TradieDashboard /></MainLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;