import React from "react";
import { Link } from "react-router-dom";
import { FaRegFilePdf } from "react-icons/fa";
import Navbar from "../../Components/NavBar";
import AboutBanner from "../../assets/images/Banners/about_banner.jpg";
import AboutImgOne from "../../assets/images/about_img/about_img2.jpg";
import AboutImgTwo from "../../assets/images/about_img/about_img1.jpg";
import Footer from "../../Components/Footer";

function AboutScheme() {
  return (
    <>
      {/* <Head title="Sabooj Sathi" /> */}
      <div className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-slate-200">
        <Navbar />
        {/** Main Section */}
        <div>
          <div
            className="bg-cover bg-center bg-no-repeat w-full"
            style={{ backgroundImage: `url(` + AboutBanner + `)` }}
          >
            <div className="w-[1140px] mx-auto py-12">
              <h3 className="text-5xl text-white font-sans">About Scheme</h3>
            </div>
          </div>
          <div className="w-[1140px] mx-auto pt-12">
            <div className="border-b-2 border-b-green-600 pb-3">
              <h2 className="text-center text-4xl text-green-600">
                Bi-cycle Distribution Scheme
                <a
                  className="inline float-right text-4xl text-red-700 hover:text-red-600"
                  href="/public/Downloads/Special_write_up_Sabooj_Sathi_new.pdf"
                  download
                >
                  <FaRegFilePdf />
                </a>
              </h2>
            </div>
          </div>
          <div className="w-[1140px] mx-auto py-3 flex flex-row">
            <div className="w-1/2 p-3">
              <h3 className="mt-5 mb-3 text-2xl">About</h3>
              <p className="text-justify">
                Hon’ble Finance Minister, in his Budget Speech of 2015-2016,
                announced a scheme for distribution of bicycles to an estimated
                40 lakh students studying in classes IX to XII in Government and
                Government Aided Schools and Madrasahs of the State. He
                announced that around 25 lakh students would be covered in
                2015-16 and the remaining 15 lakh in the next fiscal.
              </p>
              <p>
                <img
                  src={AboutImgOne}
                  className="float-left w-3/5 border-white border-8 shadow-2xl dark:shadow-teal-700 dark:shadow-lg ml-2 mt-2 mb-2 mr-3"
                  alt="About The Scheme"
                />
              </p>
              <p className="text-justify">
                By now, this scheme is well-known as&nbsp;
                <span className="para_bold">“Sabooj Sathi”</span> as coined by
                Hon’ble Chief Minister herself and it reflects her desire to see
                young students empowered to achieve new feats in the future
                through the bicycles provided under the scheme. She also created
                the scheme logo which is firmly attached in the basket in front
                of the bicycle. Hon’ble CM flagged off the distribution in
                October 2015 from Paschim Medinipur.
              </p>
              <h3 className="mt-5 mb-3 text-2xl">Objective</h3>
              <p className="text-justify">
                The scheme was conceived with the primary objective of enhancing
                student access to Secondary Education. The scheme is further
                expected-
              </p>
              <ul className="list-disc ml-4 list-inside">
                <li>To increase retention in schools,</li>
                <li>To encourage students to take up higher studies,</li>
                <li>
                  To inculcate sense of confidence among the girl students by
                  promoting mobility,
                </li>
                <li>
                  To promote environment-friendly and healthy means of
                  transportation.
                </li>
              </ul>
              <p className="text-justify">
                The objectives are aligned with four Sustainable Goals of agenda
                2030. These are SDG3: Good Health & Well-being, SDG4: Quality
                Education, SDG5: Gender Equality and SDG13: Climate actions.
              </p>

              <h3 className="mt-5 mb-3 text-2xl">Administrative structure</h3>
              <p className="text-justify">
                The Backward Classes Welfare Department and the West Bengal SC,
                ST and OBC Development & Finance Corporation (formerly WB SC &
                ST Dev & Fin Corporation) have been declared “Nodal” Department
                and “Implementing Agency” respectively. A Steering Committee
                consisting of the Secretaries of the Departments of Micro, Small
                and Medium Enterprises, School Education, Minority Affairs &
                Madrasah Education & Sundarban Affairs was constituted to guide
                the implementation process. An inter-departmental Tender
                Committee was formed for observing the procurement process. At
                the District level, Nodal officers were identified for
                shouldering the responsibility of the scheme and SDOs, BDOs and
                Executive officers of Municipalities were further aligned for
                ensuing implementation in a time bound manner.
              </p>

              <h3 className="mt-5 mb-3 text-2xl">Procurement</h3>
              <p className="text-justify">
                Procurement was done through e-Tender, as per the existing norms
                of the State Government. Specifications were finalized in
                consultation with the “Research & Development Centre for
                bicycles & sewing machines”, an entity created under the joint
                effort of the Punjab Government and UNDP. To maintain
                transparency, the status at different stages was shared in the
                public domain through &nbsp;
                <a href="http://wbtenders.gov.in">http://wbtenders.gov.in</a>
                &nbsp; and &nbsp;
                <Link to="/">https://saboojsathi.webstep.in</Link> So far, three
                phases of procurement has been done where leading Indian
                manufacturers – Hero Cycles Ltd., TI Cycles Ltd and Avon cycles
                ltd. were selected.
              </p>
            </div>
            <div className="w-1/2 p-3">
              <h3 className="mt-5 mb-3 text-2xl">Funding</h3>
              <p className="text-justify">
                The cost of implementation of the Sabooj Sathi Scheme is borne
                by the departments of Backward Classes Welfare for SC & OBC
                students, Tribal Development for ST students, School Education
                for General category students & Minority Affairs & Madrasah
                Education for Minority category students.
              </p>
              <h3 className="mt-5 mb-3 text-2xl">
                E-Governance in Implementation
              </h3>
              <p className="text-justify">
                Implementation of the scheme has multi-dimensional challenges
                like collection of students’ record, consignment tracking and
                management, selection of secure places for delivery, tagging of
                schools, deployment of a huge number of fitters from across the
                country, their logistic arrangements, security etc. and finally
                keeping distribution records in the public domain as a part of
                our proactive disclosure policy.&nbsp;
                <Link to="/">https://saboojsathi.webstep.in</Link>
                &nbsp; was developed with the dedicated support team of NIC to
                handle all the modules and to cater to the requirements of all
                the stakeholders of this mammoth scheme.
              </p>
              <p>
                Our scheme stakeholders include teachers and students of 12,235
                Government & Government-aided schools and Madrasahs, School
                Inspectors, 341 Blocks, 129 Municipalities, officers of the
                District Administration, peoples’ representatives who
                participated and contributed in different ways to make the
                scheme a grand success. Students’ records were entered on-line
                through portal by the schools, validated thereafter by Sub
                Inspectors of Schools, Additional District Inspectors / District
                Inspectors of Schools. BDOs performed the task of creating
                delivery points and tagging schools to finalise delivery
                point-wise requirement of Boys & Girls bicycles. Suppliers were
                given opportunity through portal to enter consignment details so
                that those can be tracked by the officials of State Government.
                Schools generated Distribution record from their individual
                log-in facility. Finally, the schools uploaded data like date of
                distribution, bi-cycle brand, Bi-cycle frame No. (Unique),
                particulars of student etc. District-wise, Block wise and
                individual student wise Distribution records were made available
                in the public domain on real time basis.
              </p>
              <p>
                <img
                  src={AboutImgTwo}
                  className="float-right w-3/5 border-white border-8 shadow-2xl dark:shadow-teal-700 dark:shadow-lg mr-2 mt-2 mb-2 ml-3"
                  alt="About The Scheme"
                />
              </p>
              <h3 className="mt-5 mb-3 text-2xl">Present Status</h3>
              <p className="text-justify">
                Since 2015, about 91.88 lakh students have received bicycles
                under the scheme.More than One Crore students are being covered
                in seven phases while Phase IX is in progress out phase X has
                been sanctioned.
              </p>
            </div>
          </div>
        </div>
        {/** Main Section */}
        <Footer />
      </div>
    </>
  );
}

export default AboutScheme;
