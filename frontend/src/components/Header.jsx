import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import SearchBox from './SearchBox';

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsSidebarOpen(false);
    navigate("/");
  };

  const navLinks = [
    { name: "Shop", path: "/shop" },
    { name: "Add Stores", path: "/add-store" },
    { name: "Products", path: "/products" },
    { name: "Categories", path: "/categories" },
  ];

  return (
    <>
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 gap-3">
          
          {/* LEFT: Hamburger + Logo + Main Nav Links */}
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
              <FiMenu size={24} className="text-gray-700" />
            </button>
            <Link to="/" className="text-xl font-bold text-blue-600 whitespace-nowrap">SilverBricks</Link>
            
            {/* Desktop Main Nav Links */}
            <div className="hidden lg:flex items-center gap-4 ml-4">
              {navLinks.map(link => (
                <Link key={link.name} to={link.path} className="text-sm font-medium text-gray-600 hover:text-blue-600">{link.name}</Link>
              ))}
            </div>
          </div>

          {/* CENTER: Search */}
          <div className="hidden md:block flex-1 max-w-sm px-4">
            <SearchBox onSelect={(loc) => console.log("Selected:", loc)} />
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <Link to="/find-trades" className="text-sm font-medium text-gray-700 hover:text-blue-600">Find Trades</Link>
              <Link to="/post-task" className="text-sm font-medium text-gray-700 hover:text-blue-600">Post Task</Link>
              <Link to="/hire" className="text-sm font-medium bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700">Hire a Team</Link>
              
              {!user ? (
                <>
                  <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600">Login</Link>
                  <Link to="/register" className="text-sm font-medium text-blue-600 border border-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-50">Sign up</Link>
                </>
              ) : (
                <button onClick={handleLogout} className="text-sm text-rose-600 font-medium">Out</button>
              )}
            </div>
          </div>
        </div>

        {/* MOBILE SEARCH BAR */}
        <div className="md:hidden px-4 pb-3">
          <SearchBox />
        </div>
      </nav>

      {/* SIDEBAR */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-transparent" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="relative w-64 h-full bg-white p-5 shadow-2xl flex flex-col border-r">
            <button className="self-end mb-6" onClick={() => setIsSidebarOpen(false)}><FiX size={24} /></button>
            <div className="flex flex-col gap-5">
              {navLinks.map(link => (
                <Link key={link.name} to={link.path} className="text-lg font-medium text-gray-700" onClick={() => setIsSidebarOpen(false)}>{link.name}</Link>
              ))}
              <hr />
              <Link to="/find-trades" onClick={() => setIsSidebarOpen(false)}>Find Trades</Link>
              <Link to="/post-task" onClick={() => setIsSidebarOpen(false)}>Post Task</Link>
              <Link to="/hire" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center" onClick={() => setIsSidebarOpen(false)}>Hire a Team</Link>
              
              {!user ? (
                <div className="flex flex-col gap-3 mt-4">
                  <Link to="/login" className="text-blue-600 font-bold" onClick={() => setIsSidebarOpen(false)}>Login</Link>
                  <Link to="/register" className="text-blue-600 font-bold" onClick={() => setIsSidebarOpen(false)}>Sign up</Link>
                </div>
              ) : (
                <button onClick={handleLogout} className="mt-4 text-rose-600 font-bold text-left">Logout</button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}