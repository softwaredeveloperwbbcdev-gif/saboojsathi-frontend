import React, { useState } from "react";
import {
  ChevronRight,
  ShieldCheck,
  Search,
  X,
  CheckCircle2,
  School,
  UserCircle,
  MapPin,
} from "lucide-react";
import HeroBanner from "../../assets/images/Slider/wsis_prize_2020.jpg";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const eligibilityCriteria = [
    {
      icon: <UserCircle className="text-emerald-600" />,
      title: "Academic Grade",
      desc: "Must be a student currently studying in Class IX (9th Standard).",
    },
    {
      icon: <School className="text-emerald-600" />,
      title: "Institution Type",
      desc: "Enrolled in Government, Govt-Aided, or Govt-Sponsored schools/Madrasahs.",
    },
    {
      icon: <MapPin className="text-emerald-600" />,
      title: "State Resident",
      desc: "Must be a permanent resident of West Bengal.",
    },
    {
      icon: <CheckCircle2 className="text-emerald-600" />,
      title: "One-Time Benefit",
      desc: "The student should not have received a bicycle from this scheme previously.",
    },
  ];

  return (
    <section className="relative w-full h-[650px] flex items-center overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={HeroBanner}
          alt="Sabooj Sathi Students"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#064e3b] via-[#064e3b]/40 to-transparent"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8 animate-in slide-in-from-left duration-700">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-[#064e3b] px-4 py-1.5 rounded-full shadow-xl">
            <ShieldCheck size={16} strokeWidth={3} />
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">
              Global Recognition: WSIS 2020
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tighter uppercase">
              Pedaling Towards <br />
              <span className="text-yellow-400">A Brighter Future</span>
            </h1>
            <p className="text-xl md:text-2xl font-bold text-emerald-50/90 leading-tight">
              Empowering Students Across the State.
            </p>
          </div>

          <p className="max-w-lg text-white text-sm md:text-base font-semibold leading-relaxed border-l-4 border-yellow-400 pl-6 py-2 drop-shadow-md">
            The Sabooj Sathi scheme provides bicycles to Class IX students,
            helping them travel the distance between home and school while
            promoting eco-friendly transportation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-3 bg-white text-[#064e3b] px-10 py-5 rounded-2xl font-black tracking-widest hover:bg-yellow-400 hover:scale-105 transition-all shadow-2xl shadow-black/20"
            >
              CHECK ELIGIBILITY
              <ChevronRight size={20} />
            </button>

            {/* <button className="flex items-center gap-3 bg-transparent border-2 border-white/50 text-white px-10 py-5 rounded-2xl font-black tracking-widest hover:bg-white/10 backdrop-blur-md transition-all">
              <Search size={20} />
              TRACK STATUS
            </button> */}
          </div>
        </div>
      </div>

      {/* ELIGIBILITY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#064e3b]/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal Card */}
          <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            {/* Header */}
            <div className="bg-[#064e3b] p-8 text-white relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
              <h2 className="text-3xl font-black uppercase tracking-tighter italic">
                Eligibility Criteria
              </h2>
              <p className="text-emerald-200/80 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">
                Sabooj Sathi Bicycle Distribution Scheme
              </p>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {eligibilityCriteria.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100"
                  >
                    <div className="mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-black text-slate-800 text-xs uppercase tracking-wider mb-1">
                        {item.title}
                      </h4>
                      <p className="text-slate-600 text-sm font-semibold leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Note Section */}
              <div className="bg-yellow-50 border-2 border-yellow-200 p-5 rounded-2xl">
                <h5 className="font-black text-yellow-800 text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
                  <ShieldCheck size={14} /> Important Note
                </h5>
                <p className="text-yellow-900 text-xs font-bold leading-relaxed">
                  Students who missed the distribution in Class IX are eligible
                  to receive their cycles in Classes X, XI, or XII, provided
                  they are enrolled in a qualifying institution.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 pt-0 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-[#064e3b] text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-800 transition-colors"
              >
                Got It, Thanks!
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
