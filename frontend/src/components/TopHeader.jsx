import React from "react";
import { Link } from "react-router-dom";
import { FiPhone } from "react-icons/fi"; // Call icon ke liye

export default function TopHeader() {
  return (
    // py-1 ya sm:py-1.5 se height ekdum slim (kam chauda) rahegi mobile par bhi
    <div className="bg-[#0f172a] text-white py-1 sm:py-1.5 px-4 border-b border-slate-800 sticky top-0 z-50">
      <div className="mx-auto flex flex-row max-w-7xl items-center justify-between gap-2">
        
        {/* LEFT SECTION: Text aur Number mobile par upar-neeche aur left-aligned rahenge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-0.5 sm:gap-4">
          {/* Main text ko tiny kiya aur uppercase tracking tight rakhi */}
          <div className="tracking-wide text-slate-300 uppercase font-medium text-[9px] sm:text-[11px] whitespace-nowrap leading-none">
            Verified Australian Tradies & Team
          </div>
          
          {/* Phone Number - Left aligned, just below the text on mobile */}
          <a 
            href="tel:1300745837" 
            className="flex items-center gap-1 text-orange-400 hover:text-orange-300 transition-colors font-bold whitespace-nowrap text-[10px] sm:text-xs leading-none"
          >
            <FiPhone size={11} className="stroke-[2.5]" />
            <span>1300 SILVER (745 837)</span>
          </a>
        </div>

        {/* RIGHT SECTION: Links ka size left wale se thoda bada hai (text-[12px] aur sm:text-xs) */}
        <div className="flex items-center gap-2 sm:gap-4 text-slate-300 text-[12px] sm:text-xs whitespace-nowrap">
          <Link to="/for-business" className="hover:text-white transition-colors">For Business</Link>
          <span className="text-slate-700 text-[10px]">|</span>
          <Link to="/franchise" className="hover:text-white transition-colors">Franchise</Link>
          <span className="text-slate-700 text-[10px]">|</span>
          <Link to="/help" className="hover:text-white transition-colors">Help</Link>
        </div>

      </div>
    </div>
  );
}