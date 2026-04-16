import React, { useState, useMemo } from "react";
import { MapContainer, GeoJSON, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapPin,
  Users,
  ShieldCheck,
  BarChart3,
  Mars,
  Venus,
  Fingerprint,
  HandHeart,
} from "lucide-react";

import wbDistData from "../../Data/wb-districts.json";

const Coverage = () => {
  const [hoveredData, setHoveredData] = useState(null);

  // Demographic Statistics for the left panel
  const impactStats = [
    {
      label: "Total Distribution",
      val: "1,24,89,307",
      icon: <BarChart3 />,
      color: "bg-emerald-600 text-white",
      span: "col-span-2",
    },
    {
      label: "Girls",
      val: "65.20 L",
      icon: <Venus />, // Distinct icon for Girls
      color: "bg-white",
      span: "col-span-1",
    },
    {
      label: "Boys",
      val: "59.69 L",
      icon: <Mars />, // Standard User for Boys
      color: "bg-white",
      span: "col-span-1",
    },
    {
      label: "Scheduled Caste",
      val: "28.45 L",
      icon: <ShieldCheck />, // Security/Shield for Protected Status
      color: "bg-white",
      span: "col-span-1",
    },
    {
      label: "Scheduled Tribe",
      val: "12.10 L",
      icon: <Fingerprint />, // Unique/Ancestral Identity
      color: "bg-white",
      span: "col-span-1",
    },
    {
      label: "OBC",
      val: "18.30 L",
      icon: <Users />, // Community representation
      color: "bg-white",
      span: "col-span-1",
    },
    {
      label: "Minority",
      val: "22.15 L",
      icon: <HandHeart />, // Inclusion/Support representation
      color: "bg-white",
      span: "col-span-1",
    },
  ];

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
      weight: 1.5,
      opacity: 1,
      color: "#ffffff",
      fillOpacity: 0.7,
    };
  };

  const labelData = useMemo(() => {
    if (!wbDistData) return [];
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
    layer.on({
      mouseover: (e) => {
        const l = e.target;
        const stats = districtsStats[getCleanName(feature)];
        l.setStyle({ fillOpacity: 0.9, fillColor: "#064e3b" });
        l.bringToFront();
        setHoveredData({
          name:
            feature.properties.district ||
            feature.properties.DISTRICT ||
            feature.properties.district_name,
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
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: CONTENT & DETAILED STATS */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="bg-yellow-400 text-[#064e3b] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                Regional Coverage
              </span>
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                Impact Across <br />
                <span className="text-emerald-600">West Bengal</span>
              </h2>
              <p className="text-slate-500 font-medium leading-relaxed italic">
                The Distribution of bi-cycle statistics since inception of
                Sabooj Sathi from the year 2015 till present.
              </p>
            </div>

            {/* IMPACT STATS GRID */}
            <div className="grid grid-cols-2 gap-4">
              {impactStats.map((s, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden p-6 rounded-[2rem] border transition-transform duration-300 hover:scale-[1.02] ${s.span} ${s.color.includes("emerald-600") ? "bg-emerald-600 border-emerald-500 text-white shadow-lg" : "bg-white border-slate-100 shadow-sm"}`}
                >
                  <div className="flex items-center justify-between z-10 relative">
                    <div>
                      <p
                        className={`text-[10px] font-black uppercase tracking-widest mb-1 ${s.color.includes("emerald-600") ? "text-emerald-100" : "text-slate-400"}`}
                      >
                        {s.label}
                      </p>
                      <h3 className="text-2xl font-black">{s.val}</h3>
                    </div>
                    <div
                      className={`p-3 rounded-xl shadow-md ${s.color.includes("emerald-600") ? "bg-white/20 text-white" : "bg-[#065f46] text-white"}`}
                    >
                      {React.cloneElement(s.icon, { size: 20 })}
                    </div>
                  </div>
                  <div
                    className={`absolute -bottom-6 -right-6 opacity-[0.05] ${s.color.includes("emerald-600") ? "text-white" : "text-slate-900"}`}
                  >
                    {React.cloneElement(s.icon, { size: 110 })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: MAP BOX */}
          <div className="lg:col-span-7 bg-white/80 backdrop-blur-sm p-4 rounded-[3.5rem] border border-white shadow-2xl h-[750px] relative z-[1] overflow-hidden">
            {/* FIX 2: HOVER OVERLAY HEADER (Floats inside map card when active) */}
            <div
              className={`absolute top-6 left-1/2 -translate-x-1/2 z-[1000] transition-all duration-500 ease-in-out ${hoveredData ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}
            >
              <div className="bg-slate-900/95 backdrop-blur-xl px-8 py-4 rounded-full border border-white/20 shadow-2xl flex items-center gap-6">
                <div className="flex items-center gap-2 border-r border-white/10 pr-6">
                  <MapPin size={18} className="text-yellow-400" />
                  <span className="text-white font-black uppercase tracking-tighter italic text-lg">
                    {hoveredData?.name}
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                      Distributed
                    </span>
                    <span className="text-emerald-400 font-black leading-none">
                      {hoveredData?.count}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                      Growth
                    </span>
                    <span className="text-yellow-400 font-black leading-none">
                      {hoveredData?.growth}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <MapContainer
              center={[24.1, 88.0]}
              zoom={7.2}
              className="h-full w-full bg-transparent rounded-[3rem] z-0"
              zoomControl={false}
              attributionControl={false}
              dragging={true}
              scrollWheelZoom={false}
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
                    className: "district-label-container",
                    html: `<span class="map-label-text">${label.name}</span>`,
                  })}
                />
              ))}
            </MapContainer>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .leaflet-container {
          background: transparent !important;
          outline: none;
        }
        .district-label-container {
          background: transparent !important;
          border: none !important;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .map-label-text {
          font-size: 8px;
          font-weight: 900;
          color: #000000;
          text-transform: uppercase;
          white-space: nowrap;
          pointer-events: none !important;
          text-shadow:
            1px 1px 0px #fff,
            -1px -1px 0px #fff,
            1px -1px 0px #fff,
            -1px 1px 0px #fff;
          opacity: 0.8;
        }
      `}</style>
    </section>
  );
};

export default Coverage;
