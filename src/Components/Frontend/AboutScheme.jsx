import React from "react";
import {
  Leaf,
  GraduationCap,
  Milestone,
  Award,
  CheckCircle2,
} from "lucide-react";

const AboutScheme = () => {
  const features = [
    {
      icon: <Leaf className="text-emerald-600" size={24} />,
      title: "Eco-Friendly Travel",
      desc: "Promoting a green environment by reducing carbon footprint through cycling.",
    },
    {
      icon: <GraduationCap className="text-emerald-600" size={24} />,
      title: "Reduced Dropouts",
      desc: "Increasing school attendance by solving the distance barrier for rural students.",
    },
    {
      icon: <Award className="text-emerald-600" size={24} />,
      title: "Global Excellence",
      desc: "Recognized by the United Nations (WSIS) as a world-class e-Governance project.",
    },
    {
      icon: <Milestone className="text-emerald-600" size={24} />,
      title: "Empowerment",
      desc: "Instilling confidence and independence in over 1 Crore young students.",
    },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: The Story */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="bg-emerald-100 text-[#065f46] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em]">
                The Vision
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tighter uppercase">
              Wheels of Change <br />
              <span className="text-[#065f46]">For West Bengal</span>
            </h2>

            <div className="space-y-6 text-slate-600 font-medium leading-relaxed text-lg">
              <p>
                Launched by the{" "}
                <span className="text-[#065f46] font-bold">
                  Government of West Bengal
                </span>
                , the "Sabooj Sathi" scheme is a flagship initiative designed to
                provide bi-cycles to students of Class IX to XII.
              </p>
              <p className="text-base opacity-80">
                The word "Sabooj" means Green and "Sathi" means Companion. True
                to its name, this scheme has become a lifelong companion for
                students, helping them reach schools located far from their
                homes and ensuring no child leaves education due to lack of
                transport.
              </p>
            </div>

            {/* Key Checklist */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Universal Coverage",
                "Transparent Delivery",
                "Digital Tracking",
                "Student First Approach",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm font-bold text-slate-800"
                >
                  <CheckCircle2 className="text-emerald-500" size={18} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Feature Grid */}
          <div className="relative">
            {/* Decorative Background Element */}
            <div className="absolute -inset-4 bg-emerald-50 rounded-[40px] -rotate-2 -z-10"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h4 className="text-slate-900 font-black text-lg mb-2 uppercase tracking-tight">
                    {feature.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutScheme;
