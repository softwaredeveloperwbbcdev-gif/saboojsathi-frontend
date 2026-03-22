import React from "react";
import { Link } from "react-router-dom"; // Import Link
import {
  Bike,
  MessageSquare,
  Radio,
  UserCheck,
  ArrowRight,
} from "lucide-react";

const QuickLinks = () => {
  const links = [
    {
      title: "Bicycle Distribution",
      desc: "Check phase-wise distribution schedules and stock availability.",
      icon: <Bike className="text-[#065f46]" size={28} />,
      bgColor: "bg-emerald-50",
      accent: "bg-emerald-600",
      path: "reports/search-beneficiary", // Path to your existing page
    },
    {
      title: "Grievance Redressal",
      desc: "Report issues regarding bicycle quality or non-receipt of units.",
      icon: <MessageSquare className="text-amber-600" size={28} />,
      bgColor: "bg-amber-50",
      accent: "bg-amber-500",
      path: "/grievance", // Add paths as you build them
    },
    {
      title: "Communications",
      desc: "Official notices, press releases, and government orders (GOs).",
      icon: <Radio className="text-blue-600" size={28} />,
      bgColor: "bg-blue-50",
      accent: "bg-blue-600",
      path: "#",
    },
    {
      title: "Student Corner",
      desc: "Beneficiary login, maintenance tips, and safety guidelines.",
      icon: <UserCheck className="text-purple-600" size={28} />,
      bgColor: "bg-purple-50",
      accent: "bg-purple-600",
      path: "/student-login",
    },
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="absolute top-0 left-0 w-full h-px bg-slate-100"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-slate-900 font-black text-4xl tracking-tighter uppercase relative inline-block">
            Quick <span className="text-[#065f46]">Access Hub</span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-yellow-400 rounded-full"></div>
          </h2>
          <p className="text-slate-500 font-bold text-sm uppercase tracking-[0.15em] max-w-xl mx-auto pt-4">
            Unified portals for students, parents, and officials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {links.map((link, index) => (
            /* Wrapped the card in a Link component */
            <Link
              to={link.path}
              key={index}
              className="group bg-white p-8 rounded-[40px] border border-slate-100 hover:border-emerald-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(6,95,70,0.1)] hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden block"
            >
              <div
                className={`w-16 h-16 ${link.bgColor} rounded-[24px] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}
              >
                {link.icon}
              </div>

              <h3 className="text-slate-900 font-black text-xl mb-3 tracking-tight group-hover:text-[#065f46] transition-colors">
                {link.title}
              </h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-10">
                {link.desc}
              </p>

              <div className="flex items-center gap-3 text-slate-400 group-hover:text-[#065f46] font-black text-xs uppercase tracking-widest transition-all">
                <div
                  className={`w-8 h-1 ${link.accent} rounded-full opacity-30 group-hover:opacity-100 group-hover:w-12 transition-all`}
                ></div>
                Open Link
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-20 bg-[#065f46] rounded-[48px] p-8 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:scale-125 transition-transform duration-700"></div>

          <div className="relative z-10 space-y-3 text-center lg:text-left">
            <div className="bg-yellow-400 text-[#065f46] inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mb-2">
              Support active
            </div>
            <h4 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
              Having trouble? <br />
              <span className="text-emerald-300">We're here to help.</span>
            </h4>
            <p className="text-emerald-100/70 font-medium max-w-md">
              Reach out to our state-level grievance cell for any scheme related
              queries.
            </p>
          </div>

          <button className="relative z-10 bg-white text-[#065f46] px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-yellow-400 hover:scale-105 active:scale-95 transition-all shadow-xl">
            Contact Helpdesk
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
