import React from 'react';
import { 
  Droplets, 
  Zap, 
  Home, 
  Brush, 
  Flower2, 
  Laptop, 
  Users, 
  Palette 
} from 'lucide-react';

const CategorySection = () => {
  const categories = [
    {
      title: "Plumbing",
      desc: "Emergency repairs, hot water, drainage, gas fitting & more.",
      count: "1,240 providers",
      price: "From $89",
      icon: <Droplets className="w-6 h-6 text-[#F97316]" />,
    },
    {
      title: "Electrical",
      desc: "Licensed sparkies, solar, EV chargers, smart home installation.",
      count: "980 providers",
      price: "From $95",
      icon: <Zap className="w-6 h-6 text-[#F97316]" />,
    },
    {
      title: "Renovations",
      desc: "Bathroom, kitchen, full home, extensions & custom builds.",
      count: "620 teams",
      price: "From $8k",
      icon: <Home className="w-6 h-6 text-[#F97316]" />,
    },
    {
      title: "Cleaning",
      desc: "End-of-lease, commercial, carpet, pressure wash & ongoing services.",
      count: "1,820 providers",
      price: "From $45",
      icon: <Brush className="w-6 h-6 text-[#F97316]" />,
    },
    {
      title: "Gardening",
      desc: "Lawn mowing, landscaping, green waste removal, and hedge trimming.",
      count: "1,410 providers",
      price: "From $60",
      icon: <Flower2 className="w-6 h-6 text-[#F97316]" />,
    },
    {
      title: "IT & Tech",
      desc: "Smart home setup, Wi-Fi troubleshooting, device repair & tech support.",
      count: "750 specialists",
      price: "From $110",
      icon: <Laptop className="w-6 h-6 text-[#F97316]" />,
    },
    {
      title: "Labour Hire",
      desc: "Site assistants, heavy lifters, event crew, and general hands on demand.",
      count: "530 teams",
      price: "From $40/hr",
      icon: <Users className="w-6 h-6 text-[#F97316]" />,
    },
    {
      title: "Creative",
      desc: "Local photography, custom web styling, branding, and design experts.",
      count: "890 creators",
      price: "From $75",
      icon: <Palette className="w-6 h-6 text-[#F97316]" />,
    },
  ];

  const filterTabs = ["All Services", "Trades", "Home Services", "Professional", "Labour Hire", "Freelance & Creative"];
  const brands = ["The Australian", "SMH", "news.com.au", "Domain", "Realestate", "ABC News"];

  return (
    <div className="w-full bg-white">
      {/* FIXED: Top "As Featured In" White Patti */}
      <div className="w-full bg-white border-b border-gray-100 py-6 md:py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 whitespace-nowrap">
            As Featured In
          </span>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 text-gray-800 font-serif font-medium text-sm md:text-base">
            {brands.map((brand) => (
              <span key={brand} className="hover:text-[#F97316] cursor-pointer transition-colors whitespace-nowrap">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Categories Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          {/* Header Text */}
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 block">
            Browse Categories
          </span>
          <h2 className="text-[#0f172a] text-3xl md:text-5xl font-black mb-6">
            From a quick fix to a <span className="text-[#F97316] italic font-serif font-normal">full renovation</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto mb-12 font-medium">
            200+ service categories across trades, home services, professional work, labour hire, and creative talent. Verified providers in every Australian capital.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16">
            {filterTabs.map((tab, idx) => (
              <button
                key={tab}
                className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${
                  idx === 0 
                  ? "bg-[#0f172a] text-white shadow-lg shadow-gray-200" 
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-100"
                }`}
              >
                {tab} {idx === 0 && <span className="ml-1 text-[10px] opacity-60">200+</span>}
              </button>
            ))}
          </div>

          {/* Categories Grid (Now showing 8 boxes perfectly) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-3xl border border-gray-100 text-left transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:border-[#F97316]/30 cursor-pointer relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Icon Box */}
                  <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    {cat.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-black text-[#0f172a] mb-3 group-hover:text-[#F97316] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 font-medium line-clamp-3">
                    {cat.desc}
                  </p>
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">
                    {cat.count}
                  </span>
                  <span className="text-[#0f172a] font-black text-sm">
                    {cat.price}
                  </span>
                </div>
                
                {/* Subtle hover background decoration */}
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-orange-50/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategorySection;