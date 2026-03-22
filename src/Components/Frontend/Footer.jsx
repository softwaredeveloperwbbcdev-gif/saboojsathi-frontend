import React from "react";
import { Mail, Phone, MapPin, ExternalLink, Users } from "lucide-react";
import SaboojLogo from "../../assets/images/sabooj_sathi_logo_icon.jpg";

const Footer = () => {
  return (
    <footer className="bg-[#065f46] text-emerald-50">
      {/* Main Footer Area */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* 1. Logo & About Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
              <img
                src={SaboojLogo}
                alt="Logo"
                className="w-16 h-16 object-contain bg-white rounded-lg p-1"
              />
              <div>
                <h2 className="font-black text-2xl tracking-tighter leading-none uppercase text-white">
                  SABOOJSATHI
                </h2>
                <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mt-1">
                  Government of West Bengal
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed opacity-80 font-medium italic">
              Empowering students through mobility. A flagship initiative to
              bridge the gap between home and education across the state.
            </p>
          </div>

          {/* 2. Quick Header Links (Simplified) */}
          <div className="md:pl-12">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-yellow-400 rounded-full"></div>
              Navigation
            </h3>
            <ul className="grid grid-cols-1 gap-4 text-sm font-bold uppercase tracking-wide">
              {[
                "Home",
                "About Scheme",
                "Impact Study",
                "Tenders",
                "FAQ", // Reports removed, FAQ added
                "Downloads",
              ].map((link) => (
                <li
                  key={link}
                  className="hover:text-yellow-400 transition-colors flex items-center gap-2 cursor-pointer group"
                >
                  <ExternalLink
                    size={14}
                    className="opacity-50 group-hover:opacity-100"
                  />
                  {link}
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Headquarters & Contact */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-yellow-400 rounded-full"></div>
              Headquarters
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex gap-4">
                <MapPin size={24} className="text-yellow-400 shrink-0" />
                <span className="opacity-90">
                  West Bengal SC, ST and OBC Development & Finance Corporation,
                  Block - CF, 217/A/1, Sector - 1, Salt Lake, Kolkata - 700064
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={20} className="text-yellow-400" />
                <span className="opacity-90">+91 33 2334 0000</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={20} className="text-yellow-400" />
                <span className="opacity-90 underline">
                  sabooj.sathi@wb.gov.in
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Visitor Count & Copyright */}
      <div className="bg-[#044a37] border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Visitor Counter Section */}
          <div className="flex items-center gap-4 bg-black/20 px-6 py-3 rounded-full border border-white/5">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-yellow-400" />
              <span className="text-xs font-black uppercase tracking-tighter opacity-70">
                Visitor Count:
              </span>
            </div>
            <div className="flex gap-1">
              {/* Digit Boxes */}
              {[2, 4, 8, 9, 3, 0, 7].map((num, i) => (
                <span
                  key={i}
                  className="bg-white text-[#065f46] w-6 h-8 flex items-center justify-center rounded font-black text-sm shadow-inner"
                >
                  {num}
                </span>
              ))}
            </div>
          </div>

          {/* Copyright Section */}
          <div className="text-center md:text-right">
            <p className="text-[11px] font-bold opacity-60 uppercase tracking-widest mb-2">
              © Backward Classes Welfare Department and the
              <br />
              West Bengal SC, ST and OBC Development & Finance Corporation.
            </p>
            <p className="text-[11px] opacity-40 max-w-[500px] ">
              Site Maintained by West Bengal SC, ST and OBC Development & <br />
              Finance Corporation under guidance of NIC. <br />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
