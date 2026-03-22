import React from "react";
import About1 from "../../assets/images/about_img/about_img1.jpg";
import About2 from "../../assets/images/about_img/about_img2.jpg";
import { Link } from "react-router-dom";
import {
  Target,
  ShoppingCart,
  Landmark,
  Cpu,
  ChevronRight,
  Wallet,
  CheckCircle2,
  Bike,
  History,
  Download,
  ArrowLeft,
} from "lucide-react";

const AboutPage = () => {
  const menuItems = [
    { id: "about", label: "About", icon: History },
    { id: "objective", label: "Objective", icon: Target },
    { id: "admin", label: "Administrative Structure", icon: Landmark },
    { id: "procurement", label: "Procurement", icon: ShoppingCart },
    { id: "funding", label: "Funding", icon: Wallet },
    { id: "egov", label: "E-Governance", icon: Cpu },
    { id: "status", label: "Present Status", icon: Bike },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-10 font-sans">
      {/* --- HEADER AREA (Reference: Synoptic Design) --- */}
      <div className="bg-[#065f46] pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <Link
              to="/"
              className="text-emerald-200 hover:text-white flex items-center gap-2 text-xs font-bold mb-4 uppercase tracking-widest"
            >
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2 uppercase">
              About the <span className="text-yellow-400">Scheme</span>
            </h1>
          </div>

          <a
            href="/documents/Sabooj_Sathi_Scheme_Details.pdf"
            download
            className="flex items-center gap-2 bg-yellow-400 text-emerald-950 px-6 py-3 rounded-xl font-black shadow-lg hover:bg-yellow-300 transition-all text-xs uppercase tracking-widest active:scale-95"
          >
            <Download size={18} /> Download PDF
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* --- SIDE NAVIGATION --- */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-10 space-y-4">
              <nav className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-900 px-6 py-4">
                  <p className="text-[10px] font-black text-white uppercase tracking-widest">
                    Contents
                  </p>
                </div>
                <div className="p-2">
                  {menuItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-emerald-50 text-gray-600 hover:text-emerald-700 transition-all font-bold text-xs uppercase tracking-tight group"
                    >
                      <span className="flex items-center gap-3">
                        <item.icon size={14} /> {item.label}
                      </span>
                      <ChevronRight
                        size={12}
                        className="opacity-0 group-hover:opacity-100 transition-all"
                      />
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          </aside>

          {/* --- MAIN CONTENT AREA --- */}
          <div className="flex-1 space-y-8">
            {/* ABOUT SECTION */}
            <section
              id="about"
              className="scroll-mt-10 bg-white rounded-3xl shadow-xl border border-gray-200 p-8 md:p-10"
            >
              <div className="flex flex-col md:flex-row gap-10">
                <div className="flex-1 space-y-6">
                  <h2 className="text-2xl font-black text-gray-900 uppercase">
                    About
                  </h2>
                  <div className="text-sm text-gray-600 leading-relaxed space-y-4 text-justify">
                    <p>
                      Hon’ble Finance Minister, in his Budget Speech of
                      2015-2016, announced a scheme for distribution of bicycles
                      to an estimated 40 lakh students studying in classes IX to
                      XII in Government and Government Aided Schools and
                      Madrasahs of the State. He announced that around 25 lakh
                      students would be covered in 2015-16 and the remaining 15
                      lakh in the next fiscal.
                    </p>
                    <p>
                      By now, this scheme is well-known as{" "}
                      <span className="text-[#065f46] font-bold">
                        “Sabooj Sathi”
                      </span>{" "}
                      as coined by Hon’ble Chief Minister herself and it
                      reflects her desire to see young students empowered to
                      achieve new feats in the future through the bicycles
                      provided under the scheme. She also created the scheme
                      logo which is firmly attached in the basket in front of
                      the bicycle. Hon’ble CM flagged off the distribution in
                      October 2015 from Paschim Medinipur.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/3">
                  <img
                    src={About1}
                    alt="Sabooj Sathi"
                    className="rounded-2xl shadow-lg w-full h-72 object-cover border-4 border-white"
                  />
                </div>
              </div>
            </section>

            {/* OBJECTIVE SECTION */}
            <section
              id="objective"
              className="scroll-mt-10 bg-gray-900 rounded-3xl shadow-xl p-8 md:p-10 text-white"
            >
              <h2 className="text-xl font-black uppercase text-yellow-400 mb-6 flex items-center gap-2">
                <Target size={20} /> Objective
              </h2>
              <p className="text-gray-300 text-sm mb-6">
                The scheme was conceived with the primary objective of enhancing
                student access to Secondary Education. The scheme is further
                expected-
              </p>
              <div className="grid md:grid-cols-1 gap-3 mb-8">
                {[
                  "To increase retention in schools,",
                  "To encourage students to take up higher studies,",
                  "To inculcate sense of confidence among the girl students by promoting mobility,",
                  "To promote environment-friendly and healthy means of transportation.",
                ].map((text, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10 text-xs font-bold tracking-tight"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-emerald-400 mt-0.5"
                    />{" "}
                    {text}
                  </div>
                ))}
              </div>
              <div className="pt-6 border-t border-white/10">
                <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest mb-4">
                  Aligned Sustainable Goals (Agenda 2030):
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    "SDG3: Good Health & Well-being",
                    "SDG4: Quality Education",
                    "SDG5: Gender Equality",
                    "SDG13: Climate actions",
                  ].map((goal) => (
                    <span
                      key={goal}
                      className="bg-white/10 px-3 py-2 rounded-lg text-[10px] font-bold"
                    >
                      {goal}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* ADMINISTRATIVE STRUCTURE SECTION */}
            <section
              id="admin"
              className="scroll-mt-10 bg-white rounded-3xl shadow-xl border border-gray-200 p-8 md:p-10"
            >
              <div className="flex flex-col md:flex-row gap-10">
                <div className="flex-1 space-y-4">
                  <h2 className="text-2xl font-black text-gray-900 uppercase">
                    Administrative structure
                  </h2>
                  <div className="text-sm text-gray-600 leading-relaxed space-y-4 text-justify">
                    <p>
                      The Backward Classes Welfare Department and the West
                      Bengal SC, ST and OBC Development & Finance Corporation
                      (formerly WB SC & ST Dev & Fin Corporation) have been
                      declared “Nodal” Department and “Implementing Agency”
                      respectively.
                    </p>
                    <p>
                      A Steering Committee consisting of the Secretaries of the
                      Departments of Micro, Small and Medium Enterprises, School
                      Education, Minority Affairs & Madrasah Education &
                      Sundarban Affairs was constituted to guide the
                      implementation process. An inter-departmental Tender
                      Committee was formed for observing the procurement
                      process. At the District level, Nodal officers were
                      identified for shouldering the responsibility of the
                      scheme and SDOs, BDOs and Executive officers of
                      Municipalities were further aligned for ensuring
                      implementation in a time bound manner.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/3">
                  <img
                    src={About2}
                    alt="Admin"
                    className="rounded-2xl shadow-lg w-full h-64 object-cover border-4 border-white"
                  />
                </div>
              </div>
            </section>

            {/* PROCUREMENT SECTION */}
            <section
              id="procurement"
              className="scroll-mt-10 bg-white rounded-3xl shadow-xl border border-gray-200 p-8 md:p-10"
            >
              <h2 className="text-2xl font-black text-gray-900 uppercase mb-6">
                Procurement
              </h2>
              <div className="text-sm text-gray-600 leading-relaxed space-y-4 text-justify">
                <p>
                  Procurement was done through e-Tender, as per the existing
                  norms of the State Government. Specifications were finalized
                  in consultation with the “Research & Development Centre for
                  bicycles & sewing machines”, an entity created under the joint
                  effort of the Punjab Government and UNDP.
                </p>
                <p>
                  To maintain transparency, the status at different stages was
                  shared in the public domain through{" "}
                  <span className="font-bold text-emerald-700 underline">
                    wbtenders.gov.in
                  </span>{" "}
                  and{" "}
                  <span className="font-bold text-emerald-700 underline">
                    wbsaboojsathi.gov.in
                  </span>
                  . So far, eight phases of procurement has been done where
                  leading Indian manufacturers – Hero Cycles Ltd., TI Cycles
                  Ltd., Avon cycles Ltd. and Hero Ecotech Ltd. were selected.
                </p>
              </div>
            </section>

            {/* FUNDING SECTION */}
            <section
              id="funding"
              className="scroll-mt-10 bg-emerald-50 rounded-3xl shadow-inner border border-emerald-100 p-8 md:p-10"
            >
              <h2 className="text-2xl font-black text-emerald-900 uppercase mb-4 flex items-center gap-2">
                <Wallet size={24} /> Funding
              </h2>
              <p className="text-sm text-emerald-800 leading-relaxed text-justify">
                The cost of implementation of the Sabooj Sathi Scheme is borne
                by the departments of Backward Classes Welfare for SC & OBC
                students, Tribal Development for ST students, School Education
                for General category students & Minority Affairs & Madrasah
                Education for Minority category students.
              </p>
            </section>

            {/* E-GOVERNANCE SECTION */}
            <section
              id="egov"
              className="scroll-mt-10 bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden"
            >
              <div className="bg-gray-900 px-8 py-6 border-b border-gray-800 flex items-center gap-3 text-white">
                <Cpu size={24} className="text-yellow-400" />
                <h2 className="text-xl font-black uppercase tracking-tight">
                  E-Governance in Implementation
                </h2>
              </div>
              <div className="p-8 text-sm text-gray-600 leading-relaxed space-y-6 text-justify">
                <p>
                  Implementation of the scheme has multi-dimensional challenges
                  like collection of students’ record, consignment tracking and
                  management, selection of secure places for delivery, tagging
                  of schools, deployment of a huge number of fitters from across
                  the country, their logistic arrangements, security etc. and
                  finally keeping distribution records in the public domain as a
                  part of our proactive disclosure policy.{" "}
                  <span className="font-bold text-[#065f46]">
                    wbsaboojsathi.gov.in
                  </span>{" "}
                  was developed with the dedicated support team of NIC to handle
                  all the modules and to cater to the requirements of all the
                  stakeholders of this mammoth scheme and is currently
                  maintained & hosted by WESBTEP Technologies Private Limited.
                </p>

                <div className="bg-gray-50 p-6 rounded-2xl space-y-4 border border-gray-200">
                  <p>
                    Our scheme stakeholders include teachers and students of
                    8776 Government & Government-aided schools and Madrasahs,
                    School Inspectors, 334 Blocks, 125 Municipalities including
                    Municipal Corporations, officers of the District
                    Administration, peoples’ representatives who participated
                    and contributed in different ways to make the scheme a grand
                    success.
                  </p>
                  <p>
                    Students’ records were entered on-line through portal by the
                    schools, validated thereafter by Sub Inspectors of Schools,
                    Additional District Inspectors / District Inspectors of
                    Schools. BDOs performed the task of creating delivery points
                    and tagging schools to finalise delivery point-wise
                    requirement of Boys & Girls bicycles.
                  </p>
                  <p>
                    Suppliers were given opportunity through portal to enter
                    consignment details so that those can be tracked by the
                    officials of State Government. Schools generated
                    Distribution record from their individual log-in facility.
                    Finally, the schools uploaded data like date of
                    distribution, bi-cycle brand, Bi-cycle frame No. (Unique),
                    particulars of student etc. District-wise, Block wise and
                    individual student wise Distribution records were made
                    available in the public domain on real time basis.
                  </p>
                </div>
              </div>
            </section>

            {/* PRESENT STATUS */}
            <section
              id="status"
              className="scroll-mt-10 bg-yellow-400 rounded-3xl p-8 shadow-xl flex items-center justify-between text-emerald-950"
            >
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-70">
                  Present Status
                </p>
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter">
                  1.24 CRORE+
                </h2>
                <p className="text-xs font-bold uppercase mt-1">
                  Bicycles Distributed since 2015
                </p>
              </div>
              <div className="bg-emerald-950/10 p-6 rounded-full">
                <Bike size={56} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
