import { useState } from "react";
import { ChevronDown, Menu, X, Phone, Mail, Clock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SaboojLogo from "../../assets/images/sabooj_sathi_logo_icon.jpg";
import { Link, useLocation } from "react-router-dom"; // Restored your Link import

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  // NEW: Track current URL for active states
  const location = useLocation();

  const toggleDropdown = (name) =>
    setOpenDropdown(openDropdown === name ? null : name);

  // --- REUSABLE NAV ITEM COMPONENT ---
  const NavItem = ({ label, isDropdown, items, isDownloadLink, fileUrl }) => {
    // NEW: Logic to highlight the Parent if a child route is active
    const isChildActive =
      isDropdown &&
      items?.some((item) => {
        const displayLabel = typeof item === "object" ? item.label : item;
        let itemPath = "";
        if (label === "Tenders") {
          itemPath =
            displayLabel === "e-NIT"
              ? "/tenders/enit"
              : `/tenders/${displayLabel.toLowerCase().replace(/\s+/g, "-")}`;
        } else {
          itemPath = `/reports/${displayLabel.toLowerCase().replace(/\s+/g, "-")}`;
        }
        return location.pathname === itemPath;
      });

    if (isDownloadLink) {
      return (
        <a
          href={fileUrl}
          download
          className="flex items-center gap-1.5 py-6 text-emerald-50 hover:text-yellow-400 font-bold transition-all border-b-2 border-transparent hover:border-yellow-400 cursor-pointer"
        >
          {label}
        </a>
      );
    }

    return (
      <div className="relative group cursor-pointer">
        <div
          className={`flex items-center gap-1.5 py-6 font-bold transition-all border-b-2 ${
            isChildActive
              ? "text-yellow-400 border-yellow-400"
              : "text-emerald-50 border-transparent hover:text-yellow-400 hover:border-yellow-400"
          }`}
        >
          {label}
          {isDropdown && (
            <ChevronDown
              size={14}
              className="group-hover:rotate-180 transition-transform"
            />
          )}
        </div>

        {isDropdown && (
          <div className="absolute top-full left-0 w-72 bg-white shadow-2xl rounded-b-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 py-3 border border-slate-100">
            {items.map((item, index) => {
              const isDownload = typeof item === "object" && item.downloadUrl;
              const displayLabel = isDownload ? item.label : item;

              // KEEPING YOUR ORIGINAL ROUTING LOGIC EXACTLY AS IT WAS
              let itemPath = "";
              if (!isDownload) {
                if (label === "Tenders") {
                  itemPath =
                    displayLabel === "e-NIT"
                      ? "/tenders/enit"
                      : `/tenders/${displayLabel.toLowerCase().replace(/\s+/g, "-")}`;
                } else {
                  itemPath = `/reports/${displayLabel.toLowerCase().replace(/\s+/g, "-")}`;
                }
              }

              const isActive = location.pathname === itemPath;

              return isDownload ? (
                <a
                  key={index}
                  href={item.downloadUrl}
                  download
                  className="block px-6 py-4 text-sm text-slate-600 hover:bg-emerald-50 hover:text-[#065f46] font-bold border-b border-slate-50 last:border-0 transition-colors"
                >
                  {displayLabel}
                </a>
              ) : (
                <Link
                  key={index}
                  to={itemPath}
                  className={`block px-6 py-4 text-sm font-bold border-b border-slate-50 last:border-0 transition-colors ${
                    isActive
                      ? "text-[#065f46] bg-emerald-50"
                      : "text-slate-600 hover:bg-emerald-50 hover:text-[#065f46]"
                  }`}
                >
                  {displayLabel}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="w-full sticky top-0 z-[100] shadow-xl">
      {/* 1. TOP UTILITY BAR (FULL RESTORE) */}
      <div className="bg-[#044a37] border-b border-white/10 py-2 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex flex-row justify-end items-center gap-6">
          <div className="flex flex-wrap items-center gap-4 md:gap-8 text-[11px] md:text-[12px] font-bold uppercase tracking-wide">
            <a
              href="tel:+919123917773"
              className="flex items-center gap-1.5 text-emerald-100 hover:text-yellow-400 transition group"
            >
              <Phone size={13} className="group-hover:animate-pulse" />
              <span className="hidden sm:inline">+91 91239 17773</span>
            </a>
            <a
              href="mailto:saboojsathi.wb@gmail.com"
              className="flex items-center gap-1.5 text-emerald-100 hover:text-yellow-400 transition lowercase"
            >
              <Mail size={13} />
              <span className="hidden md:inline">saboojsathi.wb@gmail.com</span>
            </a>
            <div className="hidden lg:flex items-center gap-1.5 text-emerald-100/70 border-l border-white/10 pl-6 text-[10px]">
              <Clock size={13} /> MON-FRI (11AM-6PM)
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION */}
      <div className="bg-[#065f46]">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20 md:h-24">
          {/* LOGO SECTION (RESTORED) */}
          <Link to="/" className="flex items-center gap-3 md:gap-5 group">
            <div className="relative">
              <div className="absolute -inset-2 bg-white/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-colors duration-500"></div>
              <img
                src={SaboojLogo}
                alt="Logo"
                className="relative w-12 h-12 md:w-16 md:h-16 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="border-l-2 border-white/10 pl-3 md:pl-5 py-1">
              <h1 className="text-lg md:text-2xl font-[1000] text-white tracking-tighter uppercase leading-none mb-1.5">
                SABOOJ<span className="text-emerald-400">SATHI</span>
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <p className="text-[8px] md:text-[10px] font-black text-white tracking-[0.25em] uppercase opacity-90">
                  Govt of West Bengal
                </p>
              </div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className={`font-bold transition-all py-6 border-b-2 ${
                location.pathname === "/"
                  ? "text-yellow-400 border-yellow-400"
                  : "text-emerald-50 border-transparent hover:text-yellow-400 hover:border-yellow-400"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`font-bold transition-all py-6 border-b-2 ${
                location.pathname === "/about"
                  ? "text-yellow-400 border-yellow-400"
                  : "text-emerald-50 border-transparent hover:text-yellow-400 hover:border-yellow-400"
              }`}
            >
              About Scheme
            </Link>
            <NavItem
              label="Impact Study"
              isDownloadLink
              fileUrl="/pdfs/Impact_Study_Report.pdf"
            />
            <NavItem
              label="Tenders"
              isDropdown
              items={[
                "e-NIT",
                "Pre-bid Minutes",
                "Technical Bid Evaluation",
                "Financial Bid Evaluation",
              ]}
            />
            <NavItem
              label="Reports"
              isDropdown
              items={[
                "Synoptic",
                "District Wise",
                "Gender Wise",
                "Social Group Wise",
                "Search Beneficiary",
              ]}
            />
            <NavItem
              label="Downloads"
              isDropdown
              items={[
                {
                  label: "SOP SABOOJ SATHI",
                  downloadUrl: "/assets/SOP_Sabooj_Sathi.pdf",
                },
              ]}
            />
            <Link
              to="/contact"
              className={`font-bold transition-all py-6 border-b-2 ${
                location.pathname === "/contact"
                  ? "text-yellow-400 border-yellow-400"
                  : "text-emerald-50 border-transparent hover:text-yellow-400 hover:border-yellow-400"
              }`}
            >
              Contact Us
            </Link>
          </nav>

          <div className="hidden lg:flex items-center">
            <button onClick={() => navigate("/Login")}>
              <div className="p-3 bg-white/10 rounded-full border border-white/20 hover:bg-yellow-400 cursor-pointer group transition-all">
                <User
                  size={22}
                  className="text-white group-hover:text-[#065f46]"
                />
              </div>
            </button>
          </div>

          <button
            className="lg:hidden p-2 text-white border border-white/20 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* 3. MOBILE MENU (FULL RESTORE WITH ACTIVE LOGIC) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#065f46] border-t border-white/10 absolute top-full left-0 w-full shadow-2xl p-6 flex flex-col max-h-[85vh] overflow-y-auto z-50">
          <nav className="flex flex-col font-bold text-emerald-50 divide-y divide-white/5">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`py-4 hover:text-yellow-400 transition-colors ${location.pathname === "/" ? "text-yellow-400" : ""}`}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`py-4 hover:text-yellow-400 transition-colors ${location.pathname === "/about" ? "text-yellow-400" : ""}`}
            >
              About Scheme
            </Link>
            <a
              href="/pdfs/Impact_Study_Report.pdf"
              download
              className="py-4 hover:text-yellow-400 transition-colors"
            >
              Impact Study
            </a>

            {/* Tenders Mobile Dropdown */}
            <div>
              <button
                onClick={() => toggleDropdown("tenders")}
                className={`w-full py-4 flex justify-between items-center text-left ${location.pathname.includes("/tenders") ? "text-yellow-400" : ""}`}
              >
                Tenders{" "}
                <ChevronDown
                  size={18}
                  className={`${openDropdown === "tenders" ? "rotate-180" : ""} transition-transform text-yellow-400`}
                />
              </button>
              {openDropdown === "tenders" && (
                <div className="bg-[#044a37] mb-2 px-4 py-2 flex flex-col gap-3 rounded-xl border border-white/5">
                  {[
                    "e-NIT",
                    "Pre-bid Minutes",
                    "Technical Bid Evaluation",
                    "Financial Bid Evaluation",
                  ].map((item) => {
                    const path =
                      item === "e-NIT"
                        ? "/tenders/enit"
                        : `/tenders/${item.toLowerCase().replace(/\s+/g, "-")}`;
                    return (
                      <Link
                        key={item}
                        to={path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-sm py-2 hover:text-yellow-400 transition-colors ${location.pathname === path ? "text-yellow-400" : ""}`}
                      >
                        {item}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Reports Mobile Dropdown */}
            <div>
              <button
                onClick={() => toggleDropdown("reports")}
                className={`w-full py-4 flex justify-between items-center text-left ${location.pathname.includes("/reports") ? "text-yellow-400" : ""}`}
              >
                Reports{" "}
                <ChevronDown
                  size={18}
                  className={`${openDropdown === "reports" ? "rotate-180" : ""} transition-transform text-yellow-400`}
                />
              </button>
              {openDropdown === "reports" && (
                <div className="bg-[#044a37] mb-2 px-4 py-2 flex flex-col gap-3 rounded-xl border border-white/5">
                  {[
                    "Synoptic",
                    "District Wise",
                    "Gender Wise",
                    "Social Group Wise",
                    "Search Beneficiary",
                  ].map((item) => {
                    const path = `/reports/${item.toLowerCase().replace(/\s+/g, "-")}`;
                    return (
                      <Link
                        key={item}
                        to={path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-sm py-2 hover:text-yellow-400 transition-colors ${location.pathname === path ? "text-yellow-400" : ""}`}
                      >
                        {item}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`py-4 hover:text-yellow-400 transition-colors border-none ${location.pathname === "/contact" ? "text-yellow-400" : ""}`}
            >
              Contact Us
            </Link>

            <div className="mt-8 mb-4">
              <button
                className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-black bg-yellow-400 text-[#065f46] shadow-xl"
                onClick={() => navigate("/Login")}
              >
                <User size={20} strokeWidth={3} />
                <span className="tracking-widest uppercase text-sm">
                  PORTAL LOGIN
                </span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
