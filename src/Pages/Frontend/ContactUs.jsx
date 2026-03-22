import React from "react";
import {
  ArrowLeft,
  Phone,
  Mail,
  User,
  MapPin,
  Building2,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const ContactUs = () => {
  const districtNodalOfficers = [
    {
      sl: 1,
      district: "ALIPURDUAR",
      name: "SMT SONAM DOMA BHUTIA",
      designation: "P.O. CUM D.W.O",
      contact: "03564-253256",
      email: "podwoapd2014@gmail.com",
    },
    {
      sl: 2,
      district: "BANKURA",
      name: "GOURI SANKAR BHATTACHARYYA",
      designation: "DIST. MANAGER, WB SC, ST & OBC D&FC",
      contact: "03242-251047",
      email: "dm.wbscstdfc.bankura@gmail.com",
    },
    {
      sl: 3,
      district: "PURBA BARDHAMAN",
      name: "SMT MALABIKA KHATUA",
      designation: "DIST. MANAGER, WB SC,ST & OBC D&FC",
      contact: "0342-2567706",
      email: "sctc.bdn@gmail.com",
    },
    {
      sl: 4,
      district: "PASCHIM BURDWAN",
      name: "GOUTAM DATTA",
      designation: "DIST. MANAGER, WB SC, ST & OBC D&FC",
      contact: "-",
      email: "scstpmbdn@gmail.com",
    },
    {
      sl: 5,
      district: "BIRBHUM",
      name: "SUDIPTA CHAKRABORTY",
      designation: "P.O. CUM D.W.O",
      contact: "03462-255746",
      email: "pobcwbirbhum@gmail.com",
    },
    {
      sl: 6,
      district: "COOCHBEHAR",
      name: "JAYANTA MONDAL",
      designation: "D.W.O",
      contact: "03582-222614",
      email: "bcwcob@gmail.com",
    },
    {
      sl: 7,
      district: "DAKSHIN DINAJPUR",
      name: "SUJOY SADHU",
      designation: "DIST.MANAGER, WB SC,ST& OBC D&FC",
      contact: "03522-255627",
      email: "wbscstdfcdd@gmail.com",
    },
    {
      sl: 8,
      district: "HOWRAH",
      name: "SOUGATA MAITY",
      designation: "DIST.MANAGER, WB SC,ST& OBC D&FC",
      contact: "26415343",
      email: "saboojsathihowrah@gmail.com",
    },
    {
      sl: 9,
      district: "HOOGHLY",
      name: "TAPAS BISWAS-IV",
      designation: "P.O. CUM D.W.O",
      contact: "26812659",
      email: "pobcwhoog@gmail.com",
    },
    {
      sl: 10,
      district: "JALPAIGURI",
      name: "PARVIN LAMA",
      designation: "P.O. CUM D.W.O",
      contact: "03561-230069",
      email: "bcwdjal@gmail.com",
    },
    {
      sl: 11,
      district: "MALDA",
      name: "SMT CHAITALI DATTA",
      designation: "P.O. CUM D.W.O",
      contact: "03512-221048",
      email: "bcwmalda2@gmail.com",
    },
    {
      sl: 12,
      district: "MURSHIDABAD",
      name: "NITISH BALA",
      designation: "DIST. MANAGER, WB SC,ST & OBC D&FC",
      contact: "03482-251128",
      email: "dmscstdfcmsd@gmail.com",
    },
    {
      sl: 13,
      district: "NADIA",
      name: "SAILA SIKHAR SARKAR",
      designation: "DIST. MANAGER, WB SC,ST & OBC D&FC",
      contact: "03472-252567",
      email: "bcwonadia@gmail.com",
    },
    {
      sl: 14,
      district: "NORTH 24 PARGANAS",
      name: "TARAK MANDAL",
      designation: "DIST. MANAGER, WBSC,ST&OBCD&FC",
      contact: "25523260",
      email: "dmscst.n24p@gmail.com",
    },
    {
      sl: 15,
      district: "PASCHIM MEDINIPUR",
      name: "MANISH DAS",
      designation: "P.O. CUM D.W.O",
      contact: "03222-275899",
      email: "pasmid.scstdfc@gmail.com",
    },
    {
      sl: 16,
      district: "JHARGRAM",
      name: "SANKHA SUBHRA DEY",
      designation: "DIST.MANAGER, WB SC,ST & OBC D&FC",
      contact: "-",
      email: "scstobcdfcjgm@gmail.com",
    },
    {
      sl: 17,
      district: "PURBA MEDINIPUR",
      name: "ANIRUDDHA NANDI",
      designation: "D.W.O",
      contact: "03228-263337",
      email: "dwobcw.pumid@gmail.com",
    },
    {
      sl: 18,
      district: "PURULIA",
      name: "DEBARSHI NAG",
      designation: "DIST.MANAGER, WB SC, ST &OBC D&FC",
      contact: "03252-222901",
      email: "districtmanagerpurulia@yahoo.in",
    },
    {
      sl: 19,
      district: "SILIGURI",
      name: "VIR VIKRAM RAI",
      designation: "P.O. CUM D.W.O",
      contact: "0353-2582003",
      email: "slgpodwo1@gmail.com",
    },
    {
      sl: 20,
      district: "SOUTH 24 PARGANAS",
      name: "PRASANTA KUMAR MAITY",
      designation: "DIST.MANAGER, WB SC,ST& OBC D&FC",
      contact: "24792067",
      email: "dmscst24pgs@gmail.com",
    },
    {
      sl: 21,
      district: "UTTAR DINAJPUR",
      name: "DULEN ROY",
      designation: "DIST.MANAGER, WB SC,ST& OBC D&FC",
      contact: "03523-246046",
      email: "sctcud@gmail.com",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Header */}
      <div className="bg-[#065f46] pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-emerald-200 hover:text-white font-bold text-xs uppercase tracking-widest mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase">
            Nodal <span className="text-yellow-400">Officers</span>
          </h1>
          <p className="text-emerald-100/60 text-sm mt-4 font-bold uppercase tracking-[0.3em]">
            Official Contact Directory
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-12">
        {/* SPMU SECTION */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8 bg-white w-fit px-6 py-2 rounded-full shadow-sm border border-emerald-100">
            <ShieldCheck className="text-emerald-600" size={20} />
            <h2 className="text-emerald-900 font-black uppercase text-sm tracking-widest">
              SPMU (State Project Management Unit)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SPMUCard
              name="Shri Partha Pratim Manna"
              role="MD WBSCSTOBCDFC"
              email="md.scstdfc@gmail.com"
              phone="033 - 40261534 / 40261535"
            />
            <SPMUCard
              name="Shri Satyabrata Halder"
              role="DM HQ WBSCSTOBCDFC"
              email="dm.scstdfc@gmail.com"
              phone="033 - 40261534 / 40261535"
            />
          </div>
        </div>

        {/* DISTRICT DIRECTORY TABLE */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
          <div className="bg-gray-900 px-8 py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="text-yellow-400" size={20} />
              <h3 className="text-white font-black uppercase text-xs tracking-widest">
                District Level Officers
              </h3>
            </div>
            <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
              Total: {districtNodalOfficers.length} Districts
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase tracking-widest text-gray-400 border-b border-gray-100">
                  <th className="px-6 py-5 font-black text-center">SL.</th>
                  <th className="px-6 py-5 font-black">District</th>
                  <th className="px-6 py-5 font-black">Officer Details</th>
                  <th className="px-6 py-5 font-black">Contact Info</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {districtNodalOfficers.map((officer) => (
                  <tr
                    key={officer.sl}
                    className="hover:bg-emerald-50/30 transition-colors group"
                  >
                    <td className="px-6 py-6 text-center font-mono text-xs text-gray-300 group-hover:text-emerald-600">
                      {officer.sl}
                    </td>
                    <td className="px-6 py-6 font-black text-emerald-900 text-xs tracking-tight">
                      {officer.district}
                    </td>
                    <td className="px-6 py-6">
                      <p className="font-bold text-gray-900 text-sm mb-0.5">
                        {officer.name}
                      </p>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-tight">
                        {officer.designation}
                      </p>
                    </td>
                    <td className="px-6 py-6 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                        <Phone size={14} className="text-emerald-500" />{" "}
                        {officer.contact}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-400 group-hover:text-emerald-700 transition-colors">
                        <Mail size={14} /> {officer.email}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Component for the SPMU Head Cards
const SPMUCard = ({ name, role, email, phone }) => (
  <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100 group hover:border-emerald-200 transition-all duration-300">
    <div className="flex items-start gap-6">
      <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
        <User size={32} />
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-black text-gray-900 group-hover:text-emerald-700 transition-colors">
            {name}
          </h3>
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600/60">
            {role}
          </p>
        </div>
        <div className="space-y-2">
          <p className="flex items-center gap-3 text-sm font-bold text-gray-600">
            <Mail size={16} className="text-gray-300" /> {email}
          </p>
          <p className="flex items-center gap-3 text-sm font-bold text-gray-600">
            <Phone size={16} className="text-gray-300" /> {phone}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default ContactUs;
