import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Loader2,
  Clock,
  ShieldCheck,
  Calendar,
  MessageSquare,
  FileText,
  FileArchive,
  User,
  ChevronRight,
  AlertCircle,
  Building2,
  Fingerprint,
  MapPin,
} from "lucide-react";
import axios from "axios";

const TrackGrievance = () => {
  const navigate = useNavigate();
  const [ticketNo, setTicketNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [statusData, setStatusData] = useState(null);
  const [error, setError] = useState(null);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!ticketNo) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`/api/checkGrievanceStatus`, {
        trackingNo: ticketNo,
      });
      if (response.data.status) {
        setStatusData(response.data.data);
      } else {
        setError(response.data.message || "Invalid Tracking Number.");
      }
    } catch (err) {
      setError("Ticket not found. Please double-check the ID.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadZip = async (grievanceId) => {
    setDownloading(true);
    try {
      const encodedId = btoa(grievanceId.toString());
      const response = await axios({
        url: `/api/downloadAllAttachments`,
        method: "POST",
        data: { grievanceId: encodedId },
        responseType: "blob",
        headers: { Accept: "application/zip" },
      });

      const blob = new Blob([response.data], { type: "application/zip" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `GRIEVANCE_DOCS_${ticketNo}.zip`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Could not generate ZIP.");
    } finally {
      setDownloading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] font-sans pb-32">
      {/* --- PREMIUM HEADER --- */}
      <div className="bg-[#064e3b] pt-24 pb-52 px-6 relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-[140px]" />
        <div className="max-w-6xl mx-auto relative z-10 text-center md:text-left">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 text-emerald-300/60 hover:text-white text-[10px] font-black uppercase tracking-[0.4em] transition-all mb-12"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-2 transition-transform"
            />
            Back to Dashboard
          </button>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-tight">
            Track <span className="text-yellow-400">Request.</span>
          </h1>
          <p className="mt-4 text-emerald-100/30 font-bold uppercase text-[11px] tracking-[0.5em]">
            Centralized Verification Portal
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-36 relative z-20">
        {/* --- RESTORED PREMIUM SEARCHBAR --- */}
        <div className="relative group max-w-2xl mx-auto mb-20">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-yellow-500/10 rounded-[2.5rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
          <div className="relative bg-white/90 backdrop-blur-2xl rounded-[2rem] border border-white/50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] p-2 transition-all duration-500 hover:shadow-[0_30px_60px_-12px_rgba(6,78,59,0.12)]">
            <form
              onSubmit={handleTrack}
              className="flex flex-col md:flex-row items-center gap-2"
            >
              <div className="relative flex-1 w-full">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-600/40 group-focus-within:text-emerald-600 transition-colors duration-300">
                  <Search
                    size={20}
                    strokeWidth={2.5}
                    className="group-focus-within:scale-110 transition-transform"
                  />
                </div>
                <input
                  type="text"
                  value={ticketNo}
                  onChange={(e) => setTicketNo(e.target.value.toUpperCase())}
                  placeholder="ENTER TICKET NUMBER..."
                  className="w-full bg-transparent pl-14 pr-6 py-4 text-sm font-mono font-bold tracking-wider text-gray-800 placeholder:text-gray-300 outline-none border-none ring-0 focus:ring-0 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !ticketNo}
                className="w-full md:w-auto overflow-hidden px-8 py-4 rounded-[1.5rem] bg-[#064e3b] text-white transition-all duration-300 hover:bg-emerald-900 active:scale-95 disabled:bg-gray-100 disabled:text-gray-400 flex items-center justify-center gap-3"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  {loading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <>
                      Verify <ChevronRight size={14} />
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-10 bg-red-50 p-6 rounded-3xl border border-red-100 text-red-600 flex items-center gap-4 animate-in fade-in zoom-in duration-300">
            <AlertCircle size={20} />
            <span className="text-xs font-black uppercase tracking-widest">
              {error}
            </span>
          </div>
        )}

        {/* --- UNIFIED SEARCH RESULT CARD (High Contrast for White BG) --- */}
        {statusData && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="bg-white rounded-[3.5rem] border border-emerald-900/10 shadow-[0_50px_100px_-20px_rgba(6,78,59,0.12)] overflow-hidden">
              {/* Header section (Dark Contrast) */}
              <div className="bg-[#0f172a] p-10 md:p-14 text-white relative">
                <div className="absolute top-0 right-0 p-10 opacity-10">
                  <Fingerprint size={120} />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                  <div className="space-y-2 text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400">
                        Live Identity Verified
                      </span>
                    </div>
                    <h2 className="text-4xl font-black tracking-tight">
                      {statusData.complainant_name}
                    </h2>
                    <p className="font-mono text-slate-400 text-sm tracking-widest uppercase">
                      Ticket: {statusData.ticket_no}
                    </p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl text-right min-w-[200px]">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">
                      Current Status
                    </p>
                    <p className="text-emerald-400 font-black text-2xl uppercase tracking-tighter">
                      {statusData.status?.status_name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Grid Section */}
              <div className="p-10 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Side: Detail Items */}
                <div className="lg:col-span-7 space-y-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InfoItem
                      icon={<Building2 size={16} />}
                      label="Assigned Dept"
                      value={statusData.section?.section_name || "General"}
                    />
                    <InfoItem
                      icon={<ShieldCheck size={16} />}
                      label="Priority Level"
                      value={statusData.priority?.priority_name}
                      color="text-emerald-600"
                    />
                    <InfoItem
                      icon={<MapPin size={16} />}
                      label="Location"
                      value={statusData.district?.district_name || "State Wide"}
                    />
                    <InfoItem
                      icon={<Calendar size={16} />}
                      label="Registry Date"
                      value={formatDate(statusData.created_at)}
                    />
                  </div>

                  <div className="bg-emerald-50/30 p-8 rounded-[2rem] border border-emerald-100/50 space-y-4">
                    <label className="text-[10px] font-black text-emerald-800/40 uppercase tracking-[0.3em]">
                      Issue Description
                    </label>
                    <h3 className="text-xl font-black text-slate-900 leading-tight">
                      {statusData.subject}
                    </h3>
                    <p className="text-slate-500 leading-relaxed text-sm font-medium">
                      {statusData.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDownloadZip(statusData.id)}
                    disabled={downloading}
                    className="w-full flex items-center justify-center gap-4 bg-slate-900 hover:bg-[#064e3b] text-white px-8 py-5 rounded-[2rem] transition-all active:scale-95 disabled:opacity-50 shadow-xl"
                  >
                    {downloading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <FileArchive size={20} />
                    )}
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                      Secure Case Bundle (ZIP)
                    </span>
                  </button>
                </div>

                {/* Right Side: Timeline Panel */}
                <div className="lg:col-span-5 bg-slate-50/50 rounded-[2.5rem] p-10 border border-slate-100">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10 block">
                    History & Correspondence
                  </label>
                  <div className="space-y-10 relative">
                    <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-emerald-100" />

                    {statusData.replies?.map((reply, idx) => (
                      <div key={reply.id} className="relative flex gap-6">
                        <div
                          className={`w-8 h-8 rounded-xl z-10 border-4 border-white shadow-sm flex items-center justify-center ${idx === 0 ? "bg-emerald-500" : "bg-emerald-200"}`}
                        >
                          <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[12px] font-black text-slate-800 leading-snug uppercase tracking-tight">
                            {reply.message}
                          </p>
                          <p className="text-[9px] font-bold text-emerald-600 mt-2 uppercase tracking-widest">
                            {formatDate(reply.created_at)}
                          </p>
                        </div>
                      </div>
                    ))}

                    <div className="relative flex gap-6">
                      <div className="w-8 h-8 rounded-xl z-10 border-4 border-white shadow-sm bg-slate-200 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                      </div>
                      <div>
                        <p className="text-[12px] font-black text-slate-400 uppercase">
                          Application Filed
                        </p>
                        <p className="text-[9px] font-bold text-slate-300 mt-2 uppercase tracking-widest">
                          {formatDate(statusData.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value, color = "text-slate-900" }) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:border-emerald-200 transition-colors">
    <div className="flex items-center gap-3 mb-2 text-emerald-600/50">
      {icon}
      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
        {label}
      </span>
    </div>
    <p className={`text-[13px] font-black uppercase tracking-tight ${color}`}>
      {value || "---"}
    </p>
  </div>
);

export default TrackGrievance;
