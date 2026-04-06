import React from "react";
import Navbar from "../../Components/NavBar";
import SliderImageOne from "../../assets/images/Slider/wsis_prize_2020.jpg";
import QuickLinkIconOne from "../../assets/images/quick_links_icon1.png";
import QuickLinkIconTwo from "../../assets/images/quick_links_icon2.png";
import QuickLinkIconThree from "../../assets/images/quick_links_icon3.png";
import QuickLinkIconFour from "../../assets/images/quick_links_icon4.png";
import Footer from "../../Components/Footer";
import { Link } from "react-router-dom";
// import { Routes, Route } from "react-router-dom";

function Home() {
  return (
    <>
      {/* <Head title="Sabooj Sathi" /> */}

      <div className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-slate-200">
        <Navbar />
        {/** Page Slider */}
        <div>
          <img
            src={SliderImageOne}
            className="w-full"
            alt="Sabooj Sathi Wheels of change"
          />
        </div>
        {/** Page Slider */}
        {/** Page Highlights */}
        <div className="flex justify-center h-20 w-full bg-amber-400">
          <Link className="text-white py-4 px-4 text-xl">
            Pre Exam Training for JEE/NEET 2023
          </Link>
          <span className="text-white py-4 text-2xl">|</span>
          <Link className="text-white py-4 px-4 text-xl">
            Archery Talent Search 2022
          </Link>
          <span className="text-white py-4 text-2xl">|</span>
          <Link className="text-white py-4 px-4 text-xl">
            Standard Operating Procedure (Phase VIII)
          </Link>
        </div>
        {/** Page Highlights */}
        {/** Page About */}
        <div className="flex flex-col mx-auto text-gray-900 dark:text-slate-200 w-3/5 mt-14 mb-8">
          <h2 className="my-10 text-4xl">
            About
            <span className="text-6xl text-green-600 font-bold">
              {" "}
              Sabooj Sathi
            </span>
          </h2>
          <br />
          <p className="mt-7">
            Hon’ble Finance Minister, in his Budget Speech of 2015-2016,
            announced a scheme for distribution of bicycles to an estimated 40
            lakh students studying in classes IX to XII in Government and
            Government Aided Schools and Madrasahs of the State. He announced
            that around 25 lakh students would be covered in 2015-16 and the
            remaining 15 lakh in the next fiscal.
          </p>
          <br />
          <p className="mt-7">
            By now, this scheme is well-known as “Sabooj Sathi” as coined by
            Hon’ble Chief Minister herself and it reflects her desire to see
            young students empowered to achieve new feats in the future through
            the bicycles provided under the scheme. She also created the scheme
            logo which is firmly attached in the basket in front of the bicycle.
            Hon’ble CM flagged off the distribution in October 2015 from Paschim
            Medinipur.
          </p>
          {/* <Link
            href={route("/About")}
            className="ml-auto mt-10 text-green-600 text-xl"
          >
            Read more...
          </Link> */}
          <Link to="/about" className="ml-auto mt-10 text-green-600 text-xl">
            Read more...
          </Link>
        </div>
        {/** Page About */}
        {/** Page Quick links */}
        <div className="flex justify-center w-full bg-amber-400 flex-wrap">
          <div className="w-3/5 flex flex-col mx-auto">
            <div className="w-full flex border-b-2 border-black pb-4">
              <h1 className="text-3xl mx-auto text-black font-bold mt-9">
                Quick Links
              </h1>
            </div>
            <div className="w-full flex flex-row mb-6 justify-center flex-wrap lg:flex-nowrap">
              <div className="w-1/4 h-52 hover:h-56 text-center min-w-72">
                <Link>
                  <img
                    src={QuickLinkIconOne}
                    alt="Distribution Icon"
                    className="mx-auto h-2/5 mb-3 mt-5"
                  />
                  <h4 className="font-bold text-2xl text-black my-1">
                    Bi-cycle Distribution
                  </h4>
                  <p className="text-xl text-gray-800 my-1">
                    Tracking of Bi-cycle Distribution Status.
                  </p>
                </Link>
              </div>
              <div className="w-1/4 h-52 hover:h-56 text-center min-w-72">
                <Link>
                  <img
                    src={QuickLinkIconTwo}
                    alt="Distribution Icon"
                    className="mx-auto h-2/5 mb-3 mt-5"
                  />
                  <h4 className="font-bold text-2xl text-black my-1">
                    Grievance
                  </h4>
                  <p className="text-xl text-gray-800 my-1">
                    Please submit any Grievance related to Sabooj Sathi.
                  </p>
                </Link>
              </div>
              <div className="w-1/4 h-52 hover:h-56 text-center min-w-72">
                <Link>
                  <img
                    src={QuickLinkIconThree}
                    alt="Distribution Icon"
                    className="mx-auto h-2/5 mb-3 mt-5"
                  />
                  <h4 className="font-bold text-2xl text-black my-1">
                    Communications
                  </h4>
                  <p className="text-xl text-gray-800 my-1">
                    Departmental communications regarding Sabooj Sathi.
                  </p>
                </Link>
              </div>
              <div className="w-1/4 h-52 hover:h-56 text-center min-w-72">
                <Link>
                  <img
                    src={QuickLinkIconFour}
                    alt="Distribution Icon"
                    className="mx-auto h-2/5 mb-3 mt-5"
                  />
                  <h4 className="font-bold text-2xl text-black my-1">
                    Student's Corner
                  </h4>
                  <p className="text-xl text-gray-800 my-1">
                    Profile view of schoolgoer from classes IX to XII.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/** Page Quick links */}
        <Footer />
      </div>
    </>
  );
}

export default Home;
