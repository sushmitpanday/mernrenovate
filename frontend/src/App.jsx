import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout & Components
import TopHeader from './components/TopHeader';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Jobs from './components/Jobs';
import AboutUs from './components/AboutUs';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterDetails from './pages/RegisterDetails';
import GetStarted from './pages/GetStarted';
import QuickJobFlow from './pages/QuickJobFlow';
import CustomerDashboard from './pages/CustomerDashboard';
import ProviderRegistration from './pages/ProviderRegistration';
import TradieDashboard from './pages/TradieDashboard';
import ProviderProfile from './pages/ProviderProfile';


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
      <AboutUs />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/login" element={<LoginPage />} />
         <Route path="/register-details" element={<RegisterDetails />} />
        <Route path="/get-started" element={<GetStarted />} />
                <Route path="/quick-start" element={<QuickJobFlow />} />
          <Route path="/dashboard/customer" element={<CustomerDashboard />} />
        {/* Provider Routes */}
        <Route path="/register-provider" element={<MainLayout><ProviderRegistration /></MainLayout>} />
        <Route path="/dashboard/tradie" element={<MainLayout><TradieDashboard /></MainLayout>} />
        <Route path="/my-profile" element={<MainLayout><ProviderProfile /></MainLayout>} />
        <Route path="/my-profile/:id" element={<MainLayout><ProviderProfile /></MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;