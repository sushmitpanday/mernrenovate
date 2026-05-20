import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 px-4 py-12 text-sm text-gray-600">
      <div className="mx-auto max-w-7xl">
        
        {/* Main Grid Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 pb-8 border-b border-gray-200">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-3">
            <Link to="/" className="text-xl font-bold text-blue-600 tracking-tight">
              SilverBricks Connect
            </Link>
            <p className="text-gray-500 text-xs leading-relaxed max-w-xs">
              Australia's premium all-in-one services marketplace connecting top-tier verified tradies with property owners.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/about" className="text-gray-500 hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-blue-600 transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="text-gray-500 hover:text-blue-600 transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Column 3: Marketplaces */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Explore</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/trades" className="text-gray-500 hover:text-blue-600 transition-colors">Find a Tradie</Link></li>
              <li><Link to="/hire" className="text-gray-500 hover:text-blue-600 transition-colors">Hire Now</Link></li>
              <li><Link to="/book" className="text-gray-500 hover:text-blue-600 transition-colors">Book Easy Hub</Link></li>
              <li><Link to="/jobs" className="text-gray-500 hover:text-blue-600 transition-colors">Active Jobs</Link></li>
            </ul>
          </div>

          {/* Column 4: Legal & Policy */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/privacy" className="text-gray-500 hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-500 hover:text-blue-600 transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-gray-500 hover:text-blue-600 transition-colors">Cookie Settings</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© 2026 SilverBricks Connect Pty Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-blue-600 cursor-pointer">🇦🇺 Built for Australia</span>
          </div>
        </div>

      </div>
    </footer>
  );
}