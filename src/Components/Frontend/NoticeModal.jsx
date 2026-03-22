import React, { useState, useEffect } from "react";
import { X, Bell, ExternalLink, Calendar, Megaphone } from "lucide-react";

const NoticeModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Automatically show the popup after 1.5 seconds for maximum impact
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const upcomingNotices = [
    {
      tag: "New",
      date: "March 15, 2026",
      text: "Phase X Beneficiary List for Higher Secondary students to be released.",
      link: "#",
    },
    {
      tag: "Urgent",
      date: "March 20, 2026",
      text: "Last date for School Verification under the 2026 cycle.",
      link: "#",
    },
    {
      tag: "Update",
      date: "April 02, 2026",
      text: "State-level distribution ceremony schedule at Netaji Indoor Stadium.",
      link: "#",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
      {/* Backdrop with Blur */}
      <div
        className="absolute inset-0 bg-[#065f46]/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        {/* Top Header Section */}
        <div className="bg-[#065f46] p-8 text-white relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center text-[#065f46] shadow-lg">
              <Megaphone size={24} fill="currentColor" />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight">
                Latest Updates
              </h3>
              <p className="text-emerald-200 text-xs font-bold uppercase tracking-widest">
                Upcoming Notices & Alerts
              </p>
            </div>
          </div>
        </div>

        {/* Notices List */}
        <div className="p-8 space-y-6">
          {upcomingNotices.map((notice, i) => (
            <div
              key={i}
              className="group cursor-pointer flex gap-4 items-start"
            >
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mb-2"></div>
                <div className="w-px h-full bg-slate-100 group-last:bg-transparent"></div>
              </div>

              <div className="flex-1 pb-4">
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter ${
                      notice.tag === "Urgent"
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {notice.tag}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                    <Calendar size={12} /> {notice.date}
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-700 leading-snug group-hover:text-[#065f46] transition-colors">
                  {notice.text}
                </p>
                <a
                  href={notice.link}
                  className="inline-flex items-center gap-1 text-[10px] font-black text-[#065f46] uppercase mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  View Details <ExternalLink size={10} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Button */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-center">
          <button
            onClick={() => setIsOpen(false)}
            className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] hover:text-[#065f46] transition-colors"
          >
            Dismiss for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeModal;
