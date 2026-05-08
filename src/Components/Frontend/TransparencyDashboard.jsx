import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is installed
import {
  Bike,
  School,
  Target,
  Search,
  ArrowUpRight,
  Users,
} from "lucide-react";

const TransparencyDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dashboardData, setDashboardData] = useState({
    summary: {
      total_tagged_school: 0,
      total_eligible: 0,
      total_distributed: 0,
      total_percentage: 0,
    },
    districts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const host = window.location.hostname;
      try {
        // 1. Define your phase ID (e.g., 13)
        const rawPhaseId = "13";

        // 2. Encode it to Base64
        const encodedPhaseId = btoa(rawPhaseId);

        // 3. Make the POST request with the payload
        const response = await axios.post(
          `http://${host}:8000/api/realTimeDashboardWeb`,
          {
            phaseId: encodedPhaseId,
          },
        );

        // 4. Update state with the nested keys from your Laravel Service
        setDashboardData({
          summary: response.data.distrubuteSchoolData,
          districts: response.data.data,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 1. Map summary data to your stat cards
  const stats = [
    {
      label: "Eligible Students",
      value: dashboardData.summary.total_eligible?.toLocaleString() || "0",
      icon: <Users className="text-purple-400" size={28} />,
      color: "bg-purple-50",
    },
    {
      label: "Bicycles Distributed",
      value: dashboardData.summary.total_distributed?.toLocaleString() || "0",
      icon: <Bike className="text-yellow-400" size={28} />,
      color: "bg-emerald-50",
    },
    {
      label: "Schools Covered",
      value: dashboardData.summary.total_tagged_school?.toLocaleString() || "0",
      icon: <School className="text-blue-400" size={28} />,
      color: "bg-blue-50",
    },
    {
      label: "Overall Progress",
      value: `${dashboardData.summary.total_percentage}%`,
      icon: <Target className="text-rose-400" size={28} />,
      color: "bg-rose-50",
    },
  ];

  // 2. Filter the dynamic district data
  const filteredDistricts = dashboardData.districts.filter((d) =>
    d.district_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading)
    return (
      <div className="py-20 text-center font-bold text-slate-400">
        LOADING DATA...
      </div>
    );

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 space-y-2">
          <h2 className="text-[#065f46] font-black text-4xl tracking-tighter uppercase">
            Real-Time <span className="text-slate-400">Dashboard</span>
          </h2>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">
            Transparency through data: Distribution Status 2026
          </p>
        </div>

        {/* STAT CARDS */}
        {/* 1. FOUR MAIN COUNTERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-xl transition-all"
            >
              <div
                className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center mb-6`}
              >
                {stat.icon}
              </div>
              <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-2">
                {stat.value}
              </h3>
              <p className="text-slate-500 font-bold text-xs uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* DISTRICT TABLE */}
        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
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
                      {district.district_name}
                    </td>
                    <td className="px-8 py-5 font-bold text-slate-600">
                      {district.distributed?.toLocaleString()}
                    </td>
                    <td className="px-8 py-5 font-bold text-slate-600">
                      {district.tagged_school}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden min-w-[60px]">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${district.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-[11px] font-black text-emerald-600">
                          {district.percentage}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransparencyDashboard;
