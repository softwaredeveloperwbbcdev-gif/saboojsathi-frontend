import React, { useState, useMemo, useEffect } from "react";
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
  Globe,
} from "lucide-react";

import wbDistData from "../../Data/wb-districts.json";

const Coverage = () => {
  const [apiData, setApiData] = useState(null);
  const [hoveredData, setHoveredData] = useState(null);
  const [districtsStats, setDistrictsStats] = useState({});
  const [loading, setLoading] = useState(true);

  // 1. Fetch Dynamic Data on Mount
  useEffect(() => {
    const host = window.location.hostname;
    const fetchStats = async () => {
      try {
        const response = await fetch(`http://${host}:8000/api/coverageMapData`);
        const json = await response.json();

        if (json.status === "success") {
          const mappedData = {};
          json.data.forEach((item) => {
            // MATCHING: Use dist_id_pk from API
            // Force to string to match GeoJSON format ("21" === "21")
            const id = String(item.dist_id_pk);
            mappedData[id] = {
              name: item.district_name,
              count: Number(item.overall_total).toLocaleString("en-IN"),
            };
          });
          setDistrictsStats(mappedData);
        }
      } catch (err) {
        console.error("API Fetch Error:", err);
      }
    };
    fetchStats();
  }, []);

  // 2. Helper to get ID from GeoJSON feature (Matches your file's "dist_id")
  const getDistId = (feature) => {
    return feature.properties.dist_id ? String(feature.properties.dist_id) : "";
  };

  // 3. Dynamic Styling based on ID
  const getDistrictStyle = (feature) => {
    const id = getDistId(feature);
    const hasData = districtsStats[id];

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
        const name = feature.properties.name || feature.properties.DISTRICT;
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
        const id = getDistId(feature);
        const stats = districtsStats[id];

        const l = e.target;
        l.setStyle({ fillOpacity: 0.9, fillColor: "#064e3b" });
        l.bringToFront();

        setHoveredData({
          name: feature.properties.name || feature.properties.DISTRICT,
          count: stats ? stats.count : "No Data",
        });
      },
      mouseout: (e) => {
        const l = e.target;
        l.setStyle(getDistrictStyle(feature));
        setHoveredData(null);
      },
    });
  };

  useEffect(() => {
    const host = window.location.hostname;
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://${host}:8000/api/impactAcrossAllPhase`,
        );
        const json = await response.json();
        if (json.status === "success") {
          setApiData(json.data);
        }
      } catch (error) {
        console.error("Error fetching impact stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Function to format numbers into Indian Locale (e.g., 1,24,89,307)
  const formatNum = (num) => {
    return num ? parseInt(num).toLocaleString("en-IN") : "0";
  };

  // Define the structure, but pull "val" from apiData
  const impactStats = apiData
    ? [
        {
          label: "Total Distribution",
          val: formatNum(apiData.total_distribution),
          icon: <BarChart3 />,
          color: "bg-emerald-600 text-white",
          span: "col-span-2",
        },
        {
          label: "Scheduled Caste",
          val: formatNum(apiData.sc_total),
          icon: <ShieldCheck />,
          color: "bg-white",
          span: "col-span-1",
        },
        {
          label: "Scheduled Tribe",
          val: formatNum(apiData.st_total),
          icon: <Fingerprint />,
          color: "bg-white",
          span: "col-span-1",
        },
        {
          label: "OBC",
          val: formatNum(apiData.obc_total),
          icon: <Users />,
          color: "bg-white",
          span: "col-span-1",
        },
        {
          label: "Minority",
          val: formatNum(apiData.mi_total),
          icon: <HandHeart />,
          color: "bg-white",
          span: "col-span-1",
        },
        {
          label: "General",
          val: formatNum(apiData.gen_total),
          icon: <Globe />,
          color: "bg-white",
          span: "col-span-1",
        },
      ]
    : [];

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

            <div className="grid grid-cols-2 gap-4">
              {impactStats.map((s, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden p-6 rounded-[2rem] border transition-transform duration-300 hover:scale-[1.02] ${s.span} ${
                    s.color.includes("emerald-600")
                      ? "bg-emerald-600 border-emerald-500 text-white shadow-lg"
                      : "bg-white border-slate-100 shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between z-10 relative">
                    <div>
                      <p
                        className={`text-[10px] font-black uppercase tracking-widest mb-1 ${
                          s.color.includes("emerald-600")
                            ? "text-emerald-100"
                            : "text-slate-400"
                        }`}
                      >
                        {s.label}
                      </p>
                      <h3 className="text-2xl font-black">{s.val}</h3>
                    </div>
                    <div
                      className={`p-3 rounded-xl shadow-md ${
                        s.color.includes("emerald-600")
                          ? "bg-white/20 text-white"
                          : "bg-[#065f46] text-white"
                      }`}
                    >
                      {React.cloneElement(s.icon, { size: 20 })}
                    </div>
                  </div>
                  <div
                    className={`absolute -bottom-6 -right-6 opacity-[0.05] ${
                      s.color.includes("emerald-600")
                        ? "text-white"
                        : "text-slate-900"
                    }`}
                  >
                    {React.cloneElement(s.icon, { size: 110 })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: MAP BOX */}
          <div className="lg:col-span-7 bg-white/80 backdrop-blur-sm p-4 rounded-[3.5rem] border border-white shadow-2xl h-[750px] relative z-[1] overflow-hidden">
            {/* HOVER OVERLAY HEADER */}
            <div
              className={`absolute top-6 left-1/2 -translate-x-1/2 z-[1000] transition-all duration-500 ease-in-out ${
                hoveredData
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4 pointer-events-none"
              }`}
            >
              <div className="bg-slate-900/95 backdrop-blur-xl px-8 py-4 rounded-full border border-white/20 shadow-2xl flex items-center gap-6">
                <div className="flex items-center gap-2 border-r border-white/10 pr-6">
                  <MapPin size={18} className="text-yellow-400" />
                  <span className="text-white font-black uppercase tracking-tighter italic text-lg">
                    {hoveredData?.name}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                    Distributed
                  </span>
                  <span className="text-emerald-400 font-black leading-none">
                    {hoveredData?.count}
                  </span>
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
                // FIX: Force update when data is loaded into districtsStats
                key={Object.keys(districtsStats).length}
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
