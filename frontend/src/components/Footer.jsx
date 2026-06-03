import React from 'react';
// import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="font-sans">
      {/* 1. ORANGE CTA SECTION */}
      <div className="bg-[#bc3908] text-white py-16 px-6 md:px-20 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Got a job? Get matched with the right crew in minutes.
          </h2>
          <p className="text-lg opacity-90">
            Whether it's an emergency repair or a full home renovation — find verified Australian tradies and teams, secured by escrow.
          </p>
        </div>
        
        <div className="flex flex-col gap-4 w-full md:w-80">
          <button className="bg-white text-[#bc3908] py-4 px-6 rounded-md font-bold text-sm uppercase tracking-wider hover:bg-gray-100 transition-colors">
            Post a Job — It's Free →
          </button>
          <button className="border border-white text-white py-4 px-6 rounded-md font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-colors">
            I'm a Tradie — Join Free
          </button>
        </div>
      </div>

      {/* 2. MAIN BLUE FOOTER */}
      <div className="bg-[#0a1d37] text-white pt-16 pb-8 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          
          {/* Logo & Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-white p-1 rounded">
                <div className="w-6 h-6 bg-[#0a1d37]"></div> {/* Placeholder for Logo Icon */}
              </div>
              <div>
                <h3 className="font-bold text-xl leading-none">SilverBricks</h3>
                <span className="text-[10px] uppercase tracking-widest opacity-60">Australia</span>
              </div>
            </div>
            <p className="text-sm opacity-70 leading-relaxed mb-8">
              Australia's smartest marketplace for trades, teams, and talent. Verified providers, escrow payments, AI-powered matching.
            </p>
            <div className="space-y-3">
              <button className="flex items-center gap-3 bg-[#1e2e45] w-full p-2 rounded-lg border border-white/10 hover:bg-[#253954]">
                <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center"></div>
                <div className="text-left"><p className="text-[10px] opacity-60 leading-none">Download on the</p><p className="text-sm font-semibold">App Store</p></div>
              </button>
              <button className="flex items-center gap-3 bg-[#1e2e45] w-full p-2 rounded-lg border border-white/10 hover:bg-[#253954]">
                <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">▶</div>
                <div className="text-left"><p className="text-[10px] opacity-60 leading-none">Get it on</p><p className="text-sm font-semibold">Google Play</p></div>
              </button>
            </div>
          </div>

          {/* Links Sections */}
          {[
            { title: "For Customers", links: ["Post a Job", "Browse Tradies", "Find a Team", "Categories", "How It Works", "Customer App"] },
            { title: "For Providers", links: ["Join as a Tradie", "Join as a Team", "Membership Plans", "Lead Marketplace", "Verification", "Provider App"] },
            { title: "Company", links: ["About Us", "For Business", "Franchise Opportunities", "Blog & Resources", "Press", "Careers"] },
            { title: "Support", links: ["Help Centre", "Contact Us", "Trust & Safety", "Dispute Resolution", "Insurance", "Report an Issue"] }
          ].map((section) => (
            <div key={section.title}>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">{section.title}</h4>
              <ul className="space-y-4 text-sm opacity-70">
                {section.links.map(link => (
                  <li key={link} className="hover:opacity-100 cursor-pointer transition-opacity">{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-4 text-xs opacity-60">
            <span>© 2026 SilverBricks Pvt Ltd</span>
            <span>•</span>
            <span>ABN 12 345 678 901</span>
            <span>•</span>
            <span>Made in Australia 🇦🇺</span>
            <span className="hover:opacity-100 cursor-pointer ml-4">Privacy</span>
            <span className="hover:opacity-100 cursor-pointer">Terms</span>
            <span className="hover:opacity-100 cursor-pointer">Cookies</span>
          </div>
          
          <div className="flex gap-4">

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;