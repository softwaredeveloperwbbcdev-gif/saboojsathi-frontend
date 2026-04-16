import { useState, useEffect } from "react";
import axios from "axios";
import { Bell, Calendar, ChevronRight, PlayCircle } from "lucide-react";

const MediaInsights = () => {
  const [notices, setNotices] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const host = window.location.hostname;
      const response = await axios.get(`http://${host}:8000/api/noticeList`);

      if (response.error) {
        toast.error("Failed to fetch stakeholder list");
      } else {
        console.log(response.data);
        setNotices(response.data);
      }
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="py-16 bg-slate-50 overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-6">
        <div className="text-center mb-14 space-y-4">
          <h2 className="text-slate-900 font-black text-4xl tracking-tighter uppercase relative inline-block">
            Media & Notice <span className="text-[#065f46]">Center</span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-yellow-400 rounded-full"></div>
          </h2>
          <p className="text-slate-500 font-bold text-sm uppercase tracking-[0.15em] max-w-xl mx-auto pt-4">
            Insight & Current Activities of the Programe
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* --- 1. YOUTUBE GALLERY (WITH YOUR NEW LINK) --- */}
          <div className="lg:col-span-8 flex flex-col h-[650px]">
            <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <PlayCircle size={22} className="text-red-500" />
                <h3 className="font-black text-xl uppercase tracking-tight text-slate-800">
                  Sabooj Sathi Overview
                </h3>
              </div>
              <div className="flex-1 rounded-[2rem] overflow-hidden bg-slate-100 border border-slate-100 relative">
                <iframe
                  className="w-full h-full border-0"
                  src="https://www.youtube.com/embed/3cGqmvn0oAE" // Your video ID here
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="mt-4 p-2">
                <p className="font-bold text-slate-800 text-lg uppercase italic leading-none">
                  Sabujsathi Impact
                </p>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">
                  2026 Documentary
                </p>
              </div>
            </div>
          </div>

          {/* --- 2. NOTICE BOARD --- */}
          <div className="lg:col-span-4 bg-[#065f46] p-8 rounded-[2.5rem] shadow-xl text-white flex flex-col h-[650px]">
            <div className="flex items-center gap-3 mb-8">
              <Bell size={22} className="text-yellow-400" />
              <h3 className="font-black text-xl uppercase tracking-tight">
                Notice Board
              </h3>
            </div>
            <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
              {notices.map((notice, i) => (
                <div
                  key={i}
                  className="group cursor-pointer border-b border-white/10 pb-4 last:border-0 hover:translate-x-1 transition-all"
                >
                  <div className="flex items-center gap-2 text-[9px] font-black text-emerald-300 uppercase mb-1">
                    <Calendar size={12} /> {notice.date}
                  </div>
                  <p className="text-[14px] font-bold leading-tight group-hover:text-yellow-400">
                    {notice.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .leaflet-container {
          z-index: 0 !important;
          background: transparent !important;
        }
        .district-label {
          background: none !important;
          border: none !important;
          pointer-events: none !important;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
};

export default MediaInsights;
