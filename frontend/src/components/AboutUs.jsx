import React from 'react';
import { 
  Search, Droplets, Zap, Home, Brush, 
  Edit3, MessageCircle, CreditCard, CheckCircle,
  ArrowRight, Star
} from 'lucide-react';

const SilverBricksLanding = () => {
  return (
    <div className="font-sans text-[#0f172a] bg-[#fcfbfa]">
      
      {/* 1. HIRE A TEAM SECTION - NOW ON TOP (Image 1000075439 & 440) */}
      <section className="py-24 bg-[#0f172a] text-white px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#F97316] text-[10px] font-black uppercase tracking-widest mb-4">Find a Team</p>
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Hire a whole crew, <span className="text-[#F97316] italic font-serif font-normal">not just one person</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-16">
            For renovations and multi-trade projects, hire verified teams with bundled pricing and one point of accountability.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sterling Bathrooms Co.", area: "Sydney NSW", price: "From $18,500", color: "bg-[#7c7267]", tag: "Premium Verified" },
              { name: "Heritage Build Group", area: "Melbourne VIC", price: "From $85,000", color: "bg-[#1d8cf8]", tag: "Top Rated" },
              { name: "Outback Outdoor Co.", area: "Brisbane QLD", price: "From $12,000", color: "bg-[#64844c]", tag: "Verified" }
            ].map((team, i) => (
              <div key={i} className="group bg-[#1e293b] rounded-3xl overflow-hidden border border-gray-800 hover:border-[#F97316]/50 transition-all duration-500 cursor-pointer hover:-translate-y-3">
                <div className={`${team.color} h-48 p-6 relative`}>
                  <span className="bg-yellow-400/90 text-black text-[9px] font-black px-2 py-1 rounded uppercase absolute top-6 left-6">{team.tag}</span>
                </div>
                <div className="p-8 text-left">
                  <h4 className="text-xl font-bold mb-1">{team.name}</h4>
                  <p className="text-gray-400 text-xs mb-6 flex items-center gap-1">📍 {team.area}</p>
                  <div className="flex gap-2 flex-wrap mb-8">
                    {['Tiling', 'Plumbing', 'Design'].map(t => (
                      <span key={t} className="text-[10px] border border-gray-700 px-2 py-1 rounded bg-gray-800/50">{t}</span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-800 pt-6">
                    <div className="flex text-yellow-400 text-xs"><Star size={12} fill="currentColor"/> 4.9 <span className="text-gray-500 ml-1">(247)</span></div>
                    <span className="font-black text-orange-500">{team.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-16 bg-orange-100/10 text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#F97316] transition-all">Explore All Teams →</button>
        </div>
      </section>

      {/* 2. HOW IT WORKS (Image 1000075441) */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-4">How it works</p>
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            From posted to <span className="text-[#F97316] italic font-serif font-normal">paid</span>, in four steps
          </h2>
          <p className="text-gray-500 mb-20 max-w-2xl mx-auto font-medium">
            Secure escrow payments, verified providers, and AI-powered matching make hiring quick, safe, and stress-free.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative">
             {/* Simple Step Connector Line (Desktop) */}
             <div className="hidden lg:block absolute top-12 left-0 w-full h-[1px] bg-gray-100 -z-0"></div>
             
             {[
               { title: "Post Your Job", icon: <Edit3 />, desc: "Our AI helps refine your brief in under 60 seconds." },
               { title: "Compare Quotes", icon: <MessageCircle />, desc: "Get matched with verified tradies. Chat and shortlist." },
               { title: "Pay Securely", icon: <CreditCard />, desc: "Fund escrow. Your money is protected until job is done." },
               { title: "Job Done", icon: <CheckCircle />, desc: "Confirm completion. Funds release. Leave a review." }
             ].map((step, i) => (
               <div key={i} className="relative z-10 group cursor-pointer">
                 <div className="w-24 h-24 bg-white border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:border-[#F97316] group-hover:scale-110 transition-all duration-300">
                    <div className="text-[#F97316]">{step.icon}</div>
                    <span className="absolute -top-2 -left-2 text-6xl font-black text-gray-50 opacity-0 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                 </div>
                 <h4 className="font-black text-xl mb-3">{step.title}</h4>
                 <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 3. PRICING SECTION (Image 1000075442 & 443) */}
      <section className="py-24 px-4 bg-[#fcfbfa]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#F97316] text-[10px] font-black uppercase tracking-widest mb-4">For Tradies & Teams</p>
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Grow your business with <span className="text-[#F97316]">SilverBricks</span>
          </h2>
          <p className="text-gray-500 mb-16">Choose a plan that fits how you work. Get matched with quality leads.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Plan 1 */}
            <div className="bg-white p-10 rounded-[40px] border border-gray-100 text-left hover:shadow-2xl transition-all duration-500">
              <h4 className="font-black text-2xl mb-2">Starter</h4>
              <p className="text-gray-400 text-sm mb-8">For new tradies finding their feet</p>
              <div className="mb-10">
                <span className="text-5xl font-black">$29</span>
                <span className="text-gray-400 text-sm">/month</span>
              </div>
              <ul className="space-y-4 mb-12">
                {['Up to 10 quotes per month', 'Basic verified profile', 'Standard email support', 'Mobile provider app'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm font-medium"><CheckCircle size={16} className="text-emerald-500" /> {f}</li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-2xl border-2 border-gray-900 font-black hover:bg-gray-900 hover:text-white transition">Start Free Trial</button>
            </div>

            {/* Plan 2 - Featured */}
            <div className="bg-white p-10 rounded-[40px] border-2 border-[#F97316] text-left shadow-2xl relative scale-105 z-10">
              <span className="bg-[#F97316] text-white text-[10px] font-black px-4 py-1.5 rounded-full absolute -top-4 left-1/2 -translate-x-1/2 uppercase tracking-tighter">Most Popular</span>
              <h4 className="font-black text-2xl mb-2">Professional</h4>
              <p className="text-gray-400 text-sm mb-8">For growing tradie businesses</p>
              <div className="mb-10">
                <span className="text-5xl font-black">$99</span>
                <span className="text-gray-400 text-sm">/month</span>
              </div>
              <ul className="space-y-4 mb-12">
                {['Up to 50 quotes per month', '25 lead credits included', 'Built-in CRM & calendar sync', 'Basic analytics dashboard', 'Priority chat support'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm font-medium"><CheckCircle size={16} className="text-emerald-500" /> {f}</li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-2xl bg-[#F97316] text-white font-black shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition">Start Free Trial</button>
            </div>

            {/* Plan 3 */}
            <div className="bg-white p-10 rounded-[40px] border border-gray-100 text-left hover:shadow-2xl transition-all duration-500">
              <h4 className="font-black text-2xl mb-2">Team Pro</h4>
              <p className="text-gray-400 text-sm mb-8">For multi-person teams & agencies</p>
              <div className="mb-10">
                <span className="text-5xl font-black">$399</span>
                <span className="text-gray-400 text-sm">/month</span>
              </div>
              <ul className="space-y-4 mb-12">
                {['Unlimited quotes & leads', 'Team CRM & allocation', 'Premium Verified badge', 'Faster T+1 payouts', 'Dedicated success manager'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm font-medium"><CheckCircle size={16} className="text-emerald-500" /> {f}</li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-2xl border-2 border-gray-900 font-black hover:bg-gray-900 hover:text-white transition">Talk to Sales</button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default SilverBricksLanding;