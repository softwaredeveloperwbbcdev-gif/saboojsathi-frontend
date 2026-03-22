import React, { useState, useMemo } from "react";
import { MapContainer, GeoJSON, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapPin, Bell, Calendar, ChevronRight, PlayCircle } from "lucide-react";

// Your converted GeoJSON
import wbDistData from "../../Data/wb-districts.json";

const MediaInsights = () => {
  const [hoveredData, setHoveredData] = useState(null);

  const districtsStats = {
    bankura: { count: "4,20,500", growth: "+12%" },
    kolkata: { count: "8,50,000", growth: "+22%" },
    darjeeling: { count: "1,85,200", growth: "+8%" },
    nadia: { count: "3,92,400", growth: "+10%" },
    "purba medinipur": { count: "5,12,000", growth: "+15%" },
    "paschim medinipur": { count: "4,90,000", growth: "+11%" },
    howrah: { count: "6,15,000", growth: "+19%" },
    hooghly: { count: "5,42,000", growth: "+14%" },
    "north 24 parganas": { count: "9,25,000", growth: "+25%" },
    "south 24 parganas": { count: "8,80,000", growth: "+21%" },
    murshidabad: { count: "5,72,000", growth: "+13%" },
    purulia: { count: "3,20,000", growth: "+9%" },
    birbhum: { count: "3,85,000", growth: "+10%" },
    malda: { count: "4,10,000", growth: "+12%" },
    "uttar dinajpur": { count: "2,95,000", growth: "+7%" },
    "dakshin dinajpur": { count: "2,75,000", growth: "+6%" },
    "cooch behar": { count: "3,15,000", growth: "+8%" },
    alipurduar: { count: "2,45,000", growth: "+5%" },
    jalpaiguri: { count: "3,52,000", growth: "+9%" },
    kalimpong: { count: "1,12,000", growth: "+4%" },
    jhargram: { count: "2,18,000", growth: "+5%" },
    "paschim bardhaman": { count: "4,65,000", growth: "+16%" },
    "purba bardhaman": { count: "5,22,000", growth: "+14%" },
  };

  const notices = [
    {
      date: "Oct 24, 2025",
      title: "Phase X: List of eligible schools published for 2026.",
    },
    {
      date: "Sep 12, 2025",
      title: "New maintenance guidelines for bicycle longevity.",
    },
    {
      date: "Aug 05, 2025",
      title: "Tender notice for bicycle spare parts procurement.",
    },
  ];

  const getCleanName = (feature) => {
    const raw =
      feature.properties.district ||
      feature.properties.DISTRICT ||
      feature.properties.district_name ||
      "";
    return raw.toLowerCase().trim();
  };

  const getDistrictStyle = (feature) => {
    const hasData = districtsStats[getCleanName(feature)];
    return {
      fillColor: hasData ? "#10b981" : "#cbd5e1",
      weight: 1.2,
      opacity: 1,
      color: "#ffffff",
      fillOpacity: 0.7,
    };
  };

  const labelData = useMemo(() => {
    return wbDistData.features
      .map((feature) => {
        const name =
          feature.properties.district ||
          feature.properties.DISTRICT ||
          feature.properties.district_name;
        try {
          const center = L.geoJSON(feature).getBounds().getCenter();
          return { name, center };
        } catch (e) {
          return null;
        }
      })
      .filter((item) => item !== null);
  }, []);

  const onEachDistrict = (feature, layer) => {
    const rawName =
      feature.properties.district ||
      feature.properties.DISTRICT ||
      feature.properties.district_name ||
      "";
    const cleanName = getCleanName(feature);

    layer.on({
      mouseover: (e) => {
        const l = e.target;
        const stats = districtsStats[cleanName];
        l.setStyle({
          fillOpacity: 0.9,
          fillColor: stats ? "#064e3b" : "#94a3b8",
        });
        setHoveredData({
          name: rawName,
          count: stats ? stats.count : "No Data",
          growth: stats ? stats.growth : "N/A",
        });
      },
      mouseout: (e) => {
        const l = e.target;
        l.setStyle(getDistrictStyle(feature));
        setHoveredData(null);
      },
    });
  };

  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* --- 1. THE MAP BOX --- */}
          <div className="lg:col-span-5 bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col h-[750px] relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-100 rounded-xl text-[#065f46]">
                <MapPin size={20} />
              </div>
              <h3 className="font-black text-xl uppercase tracking-tight text-slate-800">
                Coverage
              </h3>
            </div>

            <div className="flex-1 rounded-[2rem] overflow-hidden bg-slate-50 border border-slate-100 relative">
              <MapContainer
                center={[24.4, 87.9]}
                zoom={6.8}
                className="absolute inset-0 h-full w-full bg-transparent"
                zoomControl={false}
                attributionControl={false}
                dragging={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <GeoJSON
                  data={wbDistData}
                  style={getDistrictStyle}
                  onEachFeature={onEachDistrict}
                />

                {labelData.map((label, idx) => (
                  <Marker
                    key={idx}
                    position={label.center}
                    icon={L.divIcon({
                      className: "district-label",
                      html: `<span style="font-size: 8px; font-weight: 900; color: #000000; text-transform: uppercase; white-space: nowrap; pointer-events: none; text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;">${label.name}</span>`,
                      iconSize: [0, 0],
                      iconAnchor: [20, 0],
                    })}
                  />
                ))}
              </MapContainer>

              {/* HOVER STATS BOX - SMALL & POSITIONED BOTTOM LEFT */}
              {hoveredData && (
                <div className="absolute bottom-6 left-6 z-[1000] animate-in fade-in slide-in-from-bottom-2 duration-300 pointer-events-none">
                  <div className="bg-slate-900/95 backdrop-blur-md px-4 py-3 rounded-2xl text-white shadow-2xl border border-white/10 min-w-[160px]">
                    <h4 className="text-sm font-black uppercase italic border-b border-white/10 pb-1 mb-2">
                      {hoveredData.name}
                    </h4>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center gap-4">
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                          Cycles
                        </span>
                        <span className="text-xs font-black text-emerald-400">
                          {hoveredData.count}
                        </span>
                      </div>
                      <div className="flex justify-between items-center gap-4">
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                          Growth
                        </span>
                        <span className="text-xs font-black text-white">
                          {hoveredData.growth}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* --- 2. NOTICE BOARD --- */}
          <div className="lg:col-span-3 bg-[#065f46] p-8 rounded-[2.5rem] shadow-xl text-white flex flex-col h-[750px]">
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
            <button className="mt-6 w-full py-4 bg-white text-[#065f46] rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors">
              View All <ChevronRight size={14} />
            </button>
          </div>

          {/* --- 3. YOUTUBE GALLERY (WITH YOUR NEW LINK) --- */}
          <div className="lg:col-span-4 flex flex-col h-[750px]">
            <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <PlayCircle size={22} className="text-red-500" />
                <h3 className="font-black text-xl uppercase tracking-tight text-slate-800">
                  Media Center
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
