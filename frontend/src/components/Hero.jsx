import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    // Background pure Tailwind Blue gradient me convert kiya hai
    <section className="bg-gradient-to-br from-blue-700 to-blue-950 px-4 py-24 text-white">
      <div className="mx-auto max-w-4xl text-center">
        
        {/* Heading text bada kiya aur Australia's ko extra bold aur highlight kiya */}
        <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
          <span className="block text-6xl font-extrabold mb-2 tracking-wide drop-shadow-sm">
            Australia's
          </span>
          All-in-One Services Marketplace
        </h1>
        
        <p className="mb-10 text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
          Connect with verified tradespeople, book appointments, and manage jobs — all in one place.
        </p>
        
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {/* Get Started Button pure Tailwind Yellow me */}
          <Link 
            to="/register" 
            className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-8 py-3.5 rounded-lg text-base shadow-lg transition-all transform hover:-translate-y-0.5 text-center"
          >
            Get Started Free
          </Link>
          
          {/* Browse Tradies Button */}
          <Link 
            to="/trades" 
            className="w-full sm:w-auto border border-white/60 text-white hover:bg-white/10 hover:border-white font-medium px-8 py-3.5 rounded-lg text-base transition-all text-center"
          >
            Browse Tradies
          </Link>
        </div>
        
      </div>
    </section>
  );
}