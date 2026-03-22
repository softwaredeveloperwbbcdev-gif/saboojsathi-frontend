import React, { useState } from "react";
import {
  Bike,
  School,
  Target,
  Search,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

const TransparencyDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Top Level Statistics
  const stats = [
    {
      label: "Total Bicycles Distributed",
      value: "1,24,89,307",
      icon: <Bike className="text-yellow-400" size={28} />,
      color: "bg-emerald-50",
    },
    {
      label: "Total Schools Covered",
      value: "12,450",
      icon: <School className="text-blue-400" size={28} />,
      color: "bg-blue-50",
    },
    {
      label: "Current Phase (IX) Progress",
      value: "98.2%",
      icon: <Target className="text-rose-400" size={28} />,
      color: "bg-rose-50",
    },
  ];

  // 2. District Wise Data
  const districtData = [
    {
      name: "Alipurduar",
      distributed: "1,45,200",
      schools: 210,
      progress: "99%",
    },
    {
      name: "Bankura",
      distributed: "4,82,150",
      schools: 540,
      progress: "97.5%",
    },
    {
      name: "Birbhum",
      distributed: "3,95,400",
      schools: 480,
      progress: "98.2%",
    },
    {
      name: "Cooch Behar",
      distributed: "3,12,800",
      schools: 390,
      progress: "96.8%",
    },
    {
      name: "Dakshin Dinajpur",
      distributed: "1,88,600",
      schools: 245,
      progress: "99.1%",
    },
    {
      name: "Darjeeling",
      distributed: "1,20,400",
      schools: 185,
      progress: "95.4%",
    },
    {
      name: "Hooghly",
      distributed: "5,10,200",
      schools: 580,
      progress: "98.7%",
    },
    {
      name: "Howrah",
      distributed: "4,25,900",
      schools: 495,
      progress: "97.9%",
    },
    {
      name: "Jalpaiguri",
      distributed: "2,40,300",
      schools: 310,
      progress: "98.4%",
    },
    {
      name: "Jhargram",
      distributed: "1,65,700",
      schools: 220,
      progress: "99.5%",
    },
    {
      name: "Kalimpong",
      distributed: "45,800",
      schools: 85,
      progress: "94.2%",
    },
    {
      name: "Kolkata",
      distributed: "2,15,400",
      schools: 320,
      progress: "98.1%",
    },
    { name: "Malda", distributed: "4,75,200", schools: 510, progress: "96.5%" },
    {
      name: "Murshidabad",
      distributed: "6,85,900",
      schools: 740,
      progress: "97.8%",
    },
    { name: "Nadia", distributed: "5,40,100", schools: 590, progress: "98.3%" },
    {
      name: "North 24 Parganas",
      distributed: "7,25,400",
      schools: 810,
      progress: "99.2%",
    },
    {
      name: "Paschim Bardhaman",
      distributed: "3,15,800",
      schools: 380,
      progress: "97.4%",
    },
    {
      name: "Paschim Medinipur",
      distributed: "5,42,102",
      schools: 610,
      progress: "98.9%",
    },
    {
      name: "Purba Bardhaman",
      distributed: "4,95,300",
      schools: 530,
      progress: "98.5%",
    },
    {
      name: "Purba Medinipur",
      distributed: "5,20,700",
      schools: 595,
      progress: "99.0%",
    },
    {
      name: "Purulia",
      distributed: "3,88,400",
      schools: 440,
      progress: "97.2%",
    },
    {
      name: "South 24 Parganas",
      distributed: "7,85,200",
      schools: 840,
      progress: "98.6%",
    },
    {
      name: "Uttar Dinajpur",
      distributed: "3,25,600",
      schools: 360,
      progress: "96.9%",
    },
  ];

  const filteredDistricts = districtData.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12 space-y-2">
          <h2 className="text-[#065f46] font-black text-4xl tracking-tighter uppercase">
            Real-Time <span className="text-slate-400">Dashboard</span>
          </h2>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">
            Transparency through data: Distribution Status 2026
          </p>
        </div>

        {/* 1. THREE MAIN COUNTERS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-xl transition-all"
            >
              <div
                className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center mb-6`}
              >
                {stat.icon}
              </div>
              <h3 className="text-4xl font-black text-slate-800 tracking-tighter mb-2">
                {stat.value}
              </h3>
              <p className="text-slate-500 font-bold text-sm uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* 2. DISTRICT WISE STATUS TABLE */}
        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
          {/* Table Toolbar */}
          <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-xl font-black text-[#065f46] uppercase tracking-tight">
                District Wise Status
              </h3>
              <p className="text-xs text-slate-400 font-bold uppercase mt-1">
                Search by District Name
              </p>
            </div>
            <div className="relative w-full md:w-96">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search district..."
                className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-[#065f46] font-bold text-slate-700"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Scrollable Table Area */}
          <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 sticky top-0 z-10">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    District Name
                  </th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    Distributed
                  </th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    Schools
                  </th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredDistricts.map((district, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-emerald-50/30 transition-colors group"
                  >
                    <td className="px-8 py-5 font-black text-slate-700 group-hover:text-[#065f46] transition-colors uppercase text-sm">
                      {district.name}
                    </td>
                    <td className="px-8 py-5 font-bold text-slate-600">
                      {district.distributed}
                    </td>
                    <td className="px-8 py-5 font-bold text-slate-600">
                      {district.schools}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden min-w-[60px]">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: district.progress }}
                          ></div>
                        </div>
                        <span className="text-[11px] font-black text-emerald-600">
                          {district.progress}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Info */}
          <div className="p-6 bg-slate-50 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <ArrowUpRight size={14} />
            Data updated as per last distribution cycle: Feb 2026
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransparencyDashboard;
