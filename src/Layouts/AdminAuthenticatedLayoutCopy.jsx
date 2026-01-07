import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import AshokeStambhaLogo from "../assets/images/Admin/Askoka-stambha.png";
import ProfileLogo from "../assets/images/Admin/user2-160x160.jpg";
import Accordian from "./AdminLayout/Accordion"; // Make sure this path is correct
import { useContext } from "react";
import { TokenContext } from "../ContextProvider/TokenContext"; // Adjust path if needed
import { useNavigate } from "react-router-dom";
import { useIdleTimer } from "react-idle-timer";
import MsgDisplayModalInActive from "../Components/MsgDisplayModalInActive";
//import { jwtDecode } from "jwt-decode";

function AdminAuthenticatedLayoutCopy({ children }) {
  //const tokenId = JSON.parse(localStorage.getItem("token")).token;
  const [isOpenProfile, setOpenProfile] = useState(false);
  const navigate = useNavigate();
  const [showPrompt, setShowPrompt] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60); // 60 seconds countdown
  const countdownRef = useRef(null);

  //console.log(jwtDecode(tokenId));
  const handleOnIdle = () => {
    console.log("User is idle");
    clearInterval(countdownRef.current); // ✅ important
    // Final logout after countdown ends
    alert("⛔ You have been logged out due to inactivity.");
    localStorage.removeItem("token");
    navigate("/LoginList");
  };

  const handleOnPrompt = () => {
    console.log("User is about to be idle (onPrompt)");
    setShowPrompt(true);
    let timeLeft = 60;

    countdownRef.current = setInterval(() => {
      timeLeft--;
      setRemainingTime(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(countdownRef.current);
        handleOnIdle(); // Logout
      }
    }, 1000);
  };

  const handleOnActive = () => {
    console.log("User became active again");
    // If user becomes active during warning, cancel logout
    if (showPrompt) {
      clearInterval(countdownRef.current);
      setShowPrompt(false);
      setRemainingTime(60);
      idleTimer.reset(); // ✅ Reset idle timer manually
    }
  };

  const idleTimer = useIdleTimer({
    // timeout: 1000 * 60 * 30, // 30 minutes
    timeout: 1000 * 60 * 90, // 30 minutes
    promptBeforeIdle: 1000 * 60, // 1 minute warning
    onPrompt: handleOnPrompt,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    debounce: 500,
  });

  const stake_cd = JSON.parse(localStorage.getItem("token")).stake_cd;
  const location_name = JSON.parse(localStorage.getItem("token")).name;
  const token = JSON.parse(localStorage.getItem("token")).token;

  let data = [];
  let user;
  if (stake_cd == "0701") {
    user = "Head of Institute (HOI)";
    data = [
      {
        id: 0,
        label: "Switch to Old Version",
        to: "/Dashboard",
      },
      {
        id: 5,
        label: "Phase X AY 2024",
        submenu: [
          {
            id: 51,
            label: "Student Registration",
            to: "/StudentAddPhasex",
          },
          {
            id: 52,
            label: "Student Profile Verification",
            to: "/StudentProfilePhaseX",
          },
          {
            id: 53,
            label: "Download Profile",
            to: "/StudentProfileDownload",
          },
          {
            id: 54,
            label: "Approved Profile",
            to: "/ApprovedListViewPhaseX",
          },
          {
            id: 55,
            label: "Download Distribution Record",
            to: "/DownloadDistributionPhaseX",
          },
          {
            id: 56,
            label: "Update Distribution Details",
            to: "/UploadDistributionPhaseX",
          },
        ],
      },
      {
        id: 6,
        label: "Change Settings",
        submenu: [
          {
            id: 61,
            label: "Change Password",
            to: "/Dashboard",
          },
        ],
      },
    ];
  } else if (stake_cd == "0601") {
    user = "Sub Inspector of School (SI)";
    data = [
      {
        id: 0,
        label: "Switch to Old Version",
        to: "Admin.dashboard",
      },
      {
        id: 1,
        label: "Verification of Application",
        submenu: [
          {
            id: 11,
            label: "Pending Application from AY 2024",
            to: "/CircleVerifyListSchoolPhaseX",
          },
        ],
      },
      {
        id: 2,
        label: "Change Settings",
        submenu: [
          {
            id: 21,
            label: "Change Password",
            to: "Admin.dashboard",
          },
        ],
      },
    ];
  } else if (stake_cd == "0501") {
    user = "Block Development Officer (BDO)";
    data = [
      {
        id: 0,
        label: "Switch to Old Version",
        to: "/Dashboard",
      },
      {
        id: 5,
        label: "Phase X",
        submenu: [
          {
            id: 51,
            label: "Phase X Class IX Profile Entry Status",
            submenu: [
              {
                id: 511,
                label:
                  "Schoolwise Profile Entry Status(Class IX) Phase X AY 2024",
                to: "/Dashboard",
              },
            ],
          },
          {
            id: 52,
            label: "Manage Distribution Phase IX",
            submenu: [
              {
                id: 521,
                label: "Tag School with Delivery Center Phase X",
                to: "/DistributionLocationProcess/10/2024",
              },
              {
                id: 522,
                label: "View Tagged School with Delivery Center Phase X",
                to: "/DistributionManageTaggedSchool/10/2024",
              },
            ],
          },
          {
            id: 53,
            label: "Challan Management Phase X",
            submenu: [
              {
                id: 531,
                label: "Approved Challan Phase X",
                to: "/ApproveChallanView/9/2023",
              },
              {
                id: 532,
                label: "Allocate Bicycle Phase X",
                to: "/Dashboard",
              },
              {
                id: 533,
                label: "School Receipt Download Phase X",
                to: "/DownloadMemorandumView/10/2024",
              },
              {
                id: 534,
                label: "Challan Generation report",
                to: "/Dashboard",
              },
              {
                id: 535,
                label: "Challan/Allocation Status View",
                to: "/Dashboard",
              },
            ],
          },
        ],
      },
      {
        id: 6,
        label: "Backlog Challan View",
        submenu: [
          {
            id: 61,
            label: "P7 Challan MIS",
            to: "Admin.dashboard",
          },
          {
            id: 62,
            label: "P6 Challan MIS",
            to: "Admin.dashboard",
          },
          {
            id: 63,
            label: "P5 Challan MIS",
            to: "Admin.dashboard",
          },
          {
            id: 64,
            label: "P4 Challan MIS",
            to: "Admin.dashboard",
          },
          {
            id: 65,
            label: "P3 Challan MIS",
            to: "Admin.dashboard",
          },
          {
            id: 66,
            label: "P2 Challan MIS",
            to: "Admin.dashboard",
          },
          {
            id: 67,
            label: "P1 Challan MIS",
            to: "Admin.dashboard",
          },
        ],
      },
      {
        id: 7,
        label: "MIS Report",
        submenu: [
          {
            id: 71,
            label: "Distribution Update Report Phase X",
            to: "Admin.dashboard",
          },
          {
            id: 72,
            label: "Schoolwise Tagging Details Report Phase X",
            to: "Admin.dashboard",
          },
          {
            id: 73,
            label: "Distribution Update Report Phase IX",
            to: "Admin.dashboard",
          },
          {
            id: 74,
            label: "Schoolwise Tagging Details Report Phase IX",
            to: "Admin.dashboard",
          },
          {
            id: 75,
            label: "Distribution Update Report Phase VIII",
            to: "Admin.dashboard",
          },
          {
            id: 76,
            label: "Schoolwise Tagging Details Report Phase VIII",
            to: "Admin.dashboard",
          },
          {
            id: 77,
            label: "Distribution Update Report Phase VII",
            to: "Admin.dashboard",
          },
          {
            id: 78,
            label: "Schoolwise Tagging Details Report Phase VII",
            to: "Admin.dashboard",
          },
          {
            id: 79,
            label: "Distribution Update Report Phase VI",
            to: "Admin.dashboard",
          },
          {
            id: 710,
            label: "Schoolwise Tagging Details Report Phase VI",
            to: "Admin.dashboard",
          },
        ],
      },
    ];
  } else if (stake_cd == "0304") {
    user = "District Project Management Unit (DPMU)";
    data = [
      {
        id: 2,
        label: "Phase X",
        submenu: [
          {
            id: 21,
            label: "Verification of Applications",
            submenu: [
              {
                id: 211,
                label: "Pending Application from Schools",
                to: "/DownloadDistributionDistrictPhaseX",
              },
            ],
          },
          {
            id: 22,
            label: "Distribution Records (Phase )",
            submenu: [
              {
                id: 221,
                label: "Download Distribution Records",
                to: "/DownloadDistributionDistrictPhaseX",
              },
            ],
          },
          {
            id: 23,
            label: "Mis Report",
            to: "Admin.dashboard",
          },
        ],
      },
    ];
  } else if (stake_cd == "0207" || stake_cd == "0208") {
    user = "State Project Management Unit (SPMU)";
    data = [
      {
        id: 0,
        label: "Switch to Old Version",
        to: "Admin.dashboard",
      },
      {
        id: 1,
        label: "CS Dashboard",
        submenu: [
          {
            id: 11,
            label: "Distribution Wise Form",
            to: "Admin.dashboard",
          },
          {
            id: 12,
            label: "Social Wise Form",
            to: "Admin.dashboard",
          },
        ],
      },
      {
        id: 2,
        label: "Reports",
        submenu: [
          {
            id: 21,
            label: "Phase X",
            submenu: [
              {
                id: 211,
                label: "2024 District Wise Eligible Students",
                to: "Admin.eligibleStudentReportDistrict",
                params: { year: 2024, phase: 10 },
              },
              {
                id: 212,
                label: "2024 District Wise Report",
                to: "Admin.dashboard",
              },
              {
                id: 213,
                label: "Profile Entry Status 2024",
                to: "Admin.profileEntryStatusReportDistrict",
                params: { year: 2024, phase: 10 },
              },
              {
                id: 214,
                label: "Distribution Details Report",
                to: "Admin.distributionDetailsReportDistrict",
                params: { year: 2024, phase: 10 },
              },
              {
                id: 215,
                label: "District Wise Tagging 2024",
                to: "Admin.taggingReportDistrict",
                params: { year: 2024, phase: 10 },
              },
              {
                id: 216,
                label: "Challan MIS Phase X",
                to: "Admin.dashboard",
              },
              {
                id: 217,
                label: "Challan Generation Report",
                to: "Admin.dashboard",
              },
              {
                id: 218,
                label: "Challan View phase X",
                to: "Admin.dashboard",
              },
              {
                id: 219,
                label: "Challan/Allocation Status View",
                to: "Admin.dashboard",
              },
            ],
          },
          {
            id: 22,
            label: "Phase IX",
            submenu: [
              {
                id: 221,
                label: "2023 District Wise Eligible Students",
                to: "Admin.dashboard",
              },
              {
                id: 222,
                label: "2023 District Wise Report",
                to: "Admin.dashboard",
              },
              {
                id: 223,
                label: "Profile Entry Status 2023",
                to: "Admin.dashboard",
              },
              {
                id: 224,
                label: "Distribution Details Report",
                to: "Admin.dashboard",
              },
              {
                id: 225,
                label: "District Wise Tagging 2023",
                to: "Admin.dashboard",
              },
              {
                id: 226,
                label: "Challan MIS Phase IX",
                to: "Admin.dashboard",
              },
              {
                id: 227,
                label: "Challan Generation Report",
                to: "Admin.dashboard",
              },
              {
                id: 228,
                label: "Challan View phase IX",
                to: "Admin.dashboard",
              },
              {
                id: 229,
                label: "Challan/Allocation Status View",
                to: "Admin.dashboard",
              },
              {
                id: 221.0,
                label: "Invoice view",
                to: "Admin.dashboard",
              },
              {
                id: 221.1,
                label: "Challan Payment Report",
                to: "Admin.dashboard",
              },
              {
                id: 221.2,
                label: "Invoice Wise Report",
                to: "Admin.dashboard",
              },
            ],
          },
          {
            id: 23,
            label: "Phase VIII",
            submenu: [
              {
                id: 231,
                label: "2022 District Wise Eligible Students",
                to: "Admin.dashboard",
              },
              {
                id: 232,
                label: "2022 District Wise Report",
                to: "Admin.dashboard",
              },
              {
                id: 233,
                label: "Profile Entry Status 2022",
                to: "Admin.dashboard",
              },
              {
                id: 234,
                label: "Distribution Details Report",
                to: "Admin.dashboard",
              },
              {
                id: 235,
                label: "Challan MIS Phase VIII",
                to: "Admin.dashboard",
              },
              {
                id: 236,
                label: "Challan Generation Report",
                to: "Admin.dashboard",
              },
              {
                id: 237,
                label: "Challan View phase VIII",
                to: "Admin.dashboard",
              },
              {
                id: 238,
                label: "Challan/Allocation Status View",
                to: "Admin.dashboard",
              },
              {
                id: 239,
                label: "Invoice view",
                to: "Admin.dashboard",
              },
              {
                id: 231.0,
                label: "Challan Payment Report",
                to: "Admin.dashboard",
              },
              {
                id: 231.1,
                label: "Invoice Wise Report",
                to: "Admin.dashboard",
              },
            ],
          },
          {
            id: 24,
            label: "Phase VII",
            submenu: [
              {
                id: 241,
                label: "2021 District Wise Eligible Students",
                to: "Admin.dashboard",
              },
              {
                id: 242,
                label: "2021 District Wise Report",
                to: "Admin.dashboard",
              },
              {
                id: 243,
                label: "Profile Entry Status 2021",
                to: "Admin.dashboard",
              },
              {
                id: 244,
                label: "Distribution Details Report",
                to: "Admin.dashboard",
              },
              {
                id: 245,
                label: "P-7 Challan MIS",
                to: "Admin.dashboard",
              },
            ],
          },
          {
            id: 25,
            label: "Phase VI",
            submenu: [
              {
                id: 251,
                label: "Profile Entry Status 2020",
                to: "Admin.dashboard",
              },
              {
                id: 252,
                label: "2020 Eligible Students",
                to: "Admin.dashboard",
              },
              {
                id: 253,
                label: "Distribution Details Report",
                to: "Admin.dashboard",
              },
              {
                id: 254,
                label: "P-6 Challan MIS",
                to: "Admin.dashboard",
              },
            ],
          },
          {
            id: 26,
            label: "Phase V",
            submenu: [
              {
                id: 261,
                label: "2019 District Wise Report",
                to: "Admin.dashboard",
              },
              {
                id: 262,
                label: "School Tagging Report",
                to: "Admin.dashboard",
              },
              {
                id: 263,
                label: "Distribution Details Report",
                to: "Admin.dashboard",
              },
              {
                id: 264,
                label: "P-5 Challan MIS",
                to: "Admin.dashboard",
              },
            ],
          },
          {
            id: 27,
            label: "Phase IV",
            submenu: [
              {
                id: 271,
                label: "2018 District Wise Report",
                to: "Admin.dashboard",
              },
              {
                id: 272,
                label: "School Tagging Report",
                to: "Admin.dashboard",
              },
              {
                id: 273,
                label: "Distribution Details Report",
                to: "Admin.dashboard",
              },
              {
                id: 274,
                label: "P-4 Challan MIS",
                to: "Admin.dashboard",
              },
            ],
          },
          {
            id: 28,
            label: "Phase III",
            submenu: [
              {
                id: 281,
                label: "2016 District Wise Report",
                to: "Admin.dashboard",
              },
              {
                id: 282,
                label: "2017 District Wise Report",
                to: "Admin.dashboard",
              },
              {
                id: 283,
                label: "School Tagging Report",
                to: "Admin.dashboard",
              },
              {
                id: 284,
                label: "Distribution Details Report",
                to: "Admin.dashboard",
              },
              {
                id: 285,
                label: "Download Requirement",
                to: "Admin.dashboard",
              },
              {
                id: 286,
                label: "P-3 Challan MIS",
                to: "Admin.dashboard",
              },
            ],
          },
          {
            id: 29,
            label: "Phase I & Phase II",
            submenu: [
              {
                id: 291,
                label: "P-1 Distribution Details(All)",
                to: "Admin.dashboard",
              },
              {
                id: 292,
                label: "P-1 Distribution Details(Class IX)",
                to: "Admin.dashboard",
              },
              {
                id: 293,
                label: "P-1 Distribution Details(Class X)",
                to: "Admin.dashboard",
              },
              {
                id: 294,
                label: "P-1 Distribution Details(Class XI)",
                to: "Admin.dashboard",
              },
              {
                id: 295,
                label: "P-1 Distribution Details(Class XII)",
                to: "Admin.dashboard",
              },
              {
                id: 296,
                label: "P-1 Tagging Details",
                to: "Admin.dashboard",
              },
              {
                id: 297,
                label: "P-1 Challan MIS",
                to: "Admin.dashboard",
              },
              {
                id: 298,
                label: "P-2 District Wise Entry",
                to: "Admin.dashboard",
              },
              {
                id: 299,
                label: "P-2 Distribution Details",
                to: "Admin.dashboard",
              },
              {
                id: 291.0,
                label: "P-2 Tagging Details",
                to: "Admin.dashboard",
              },
              {
                id: 291.1,
                label: "P-2 Challan MIS",
                to: "Admin.dashboard",
              },
            ],
          },
          {
            id: 21.0,
            label: "Backlog Challan MIS",
            to: "Admin.dashboard",
          },
          {
            id: 21.1,
            label: "Category wise Student Report",
            to: "Admin.dashboard",
          },
          {
            id: 21.2,
            label: "Download Requirement",
            to: "Admin.dashboard",
          },
          {
            id: 21.3,
            label: "Synoptic Report",
            to: "Admin.dashboard",
          },
          {
            id: 21.4,
            label: "Gender Wise Distribution Report",
            to: "Admin.dashboard",
          },
          {
            id: 21.5,
            label: "Social Group Wise Report",
            to: "Admin.dashboard",
          },
        ],
      },
      {
        id: 3,
        label: "Access control",
        submenu: [
          {
            id: 31,
            label: "Notice List",
            to: "Admin.dashboard",
          },
          {
            id: 32,
            label: "Reset Password",
            to: "Admin.dashboard",
          },
          {
            id: 33,
            label: "Reset Finalise",
            to: "Admin.dashboard",
          },
        ],
      },
      {
        id: 4,
        label: "Access Manage Grievances",
        submenu: [
          {
            id: 41,
            label: "Grievance List",
            to: "Admin.dashboard",
          },
        ],
      },
      {
        id: 5,
        label: "Consignment Management System",
        submenu: [
          {
            id: 51,
            label: "Dashboard",
            to: "Admin.dashboard",
          },
        ],
      },
    ];
  }
  ///////////////////////////////
  // const { token } = useContext(TokenContext); // Get token from context
  const { logout } = useContext(TokenContext);
  const handleLogout = async () => {
    try {
      const host = window.location.hostname;
      const response = await fetch(`http://${host}/api/logout`, {
        method: "GET", // or "POST" depending on your API
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ⬅️ Send token in headers
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      console.log("API response:", data);
      if (data.status == "success") {
        // logout(token);
        localStorage.removeItem("token");
        navigate("/LoginList");
      }

      // Do something with the data, e.g., update state or navigate
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };
  //////////////////////////////

  return (
    <>
      {/* Top Profile Bar */}
      <div className="relative max-h-[100px] z-[1030] border-b-0 border-transparent bg-[linear-gradient(to_right,_rgba(15,_157,_209,_1)_0%,_rgba(43,_168,_214,_1)_100%)] flex flex-row">
        <div className="basis-auto w-[12%] min-w-[228px]">
          <Link className="mx-3.5 my-1 inline-block" to="/dashboard">
            <img
              className="max-w-[25px] inline-block align-top mt-0.5"
              src={AshokeStambhaLogo}
              alt="Ashoke Stambha"
            />
            <span className="ml-7 text-white text-lg p-0 font-bold inline-block text-center min-w-[135px]">
              Sabooj Sathi
              <p className="text-sm p-0 m-0 font-bold text-[#b7f6fd]">
                Govt. of West Bengal
              </p>
            </span>
          </Link>
        </div>

        <div className="basis-auto w-[88%] max-h-[100px]">
          <div className="flex justify-between bg-[linear-gradient(to_right,_rgba(15,_157,_209,_1)_0%,_rgba(11,_219,_177,_1)_100%)]">
            <div className="relative inline-block hover:bg-gray-500/30 pt-4 pb-2 px-2 align-middle">
              <MdOutlineMenu className="inline text-white text-2xl" />
            </div>

            <div
              className="relative inline-block text-gray-500 hover:text-white text-sm p-4 hover:bg-gray-500/30"
              onClick={() => setOpenProfile((prev) => !prev)}
            >
              <button className="flex items-center space-x-2 focus:outline-none">
                <img
                  className="w-8 h-8 rounded-full"
                  src={ProfileLogo}
                  alt="User Image"
                />
                <span className="text-white hidden sm:inline-block">
                  {user}
                </span>
              </button>
              <div
                className={`absolute right-0 mt-4 w-64 bg-[#3c8dbc] shadow-lg rounded-lg ${
                  !isOpenProfile ? "opacity-0 hidden" : "opacity-100"
                } transition duration-200 z-10`}
              >
                <div className="p-4 border-b text-center">
                  <img
                    src={ProfileLogo}
                    className="w-16 h-16 rounded-full mx-auto"
                    alt="User"
                  />
                  <p className="font-semibold mt-2">{user}</p>
                  <small className="text-gray-300">West Bengal</small>
                </div>
                <div className="flex justify-between px-4 py-2 bg-[#f9f9f9]">
                  <a
                    href="#"
                    className="py-1.5 px-3 text-sm font-medium text-[#666666] bg-[#f9f9f9] hover:bg-[#d4d4d4] border border-[#8c8c8c]"
                  >
                    Change Password
                  </a>
                  <button
                    onClick={handleLogout}
                    className="py-1.5 px-3 text-sm font-medium text-[#666666] bg-[#f9f9f9] hover:bg-[#d4d4d4] border border-[#8c8c8c]"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="flex flex-row max-w-full w-full min-h-screen">
        {/* Side Nav */}
        <div className="relative top-0 left-0 pt-[60px] min-h-full w-[240px] z-[810] bg-[#f7f7f7] transition-all          duration-300 ease-in-out">
          <div className="relative w-full">
            <div className="pt-[15px] pr-[15px] pb-[15px] pl-[25px] leading-[1] text-[2em] w-[230px]">
              <p className="text-lg">{location_name}</p>
              <a className="text-xs" href="#">
                <FaCircle className="inline text-green-900" /> Online
              </a>
            </div>
            <div className="overflow-hidden m-0 p-0">
              <p className="text-xs font-semibold px-4 py-2">ACCESS LIST</p>
              <Accordian items={data} keepOthersOpen={false} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full min-h-screen flex flex-col">
          <div className="flex-grow bg-gray-200/60">
            {/* {children} */}
            {/* ////////////////////////////// */}
            {showPrompt ? (
              // <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              //   <div className="bg-white p-6 rounded shadow-lg text-center max-w-sm">
              //     <h2 className="text-lg font-bold text-red-600 mb-2">
              //       ⚠️ Inactivity Detected
              //     </h2>
              //     <p className="mb-3">
              //       You'll be logged out in <strong>{remainingTime}</strong> seconds.
              //     </p>
              //     <button
              //       onClick={() => handleOnActive()}
              //       className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              //     >
              //       Stay Logged In
              //     </button>
              //   </div>
              // </div>
              <MsgDisplayModalInActive
                remainingTime={remainingTime}
                onStayActive={handleOnActive}
              />
            ) : (
              children
            )}
            {/* /////////////////////////////  */}
          </div>
          {/* Footer */}
          <div className="w-full bg-gray-100 p-4 text-[#444] border-t border-[#d2d6de] flex justify-between">
            <div>
              <strong>
                Copyright © 2015-2017 Saboojsathi - All Rights Reserved, GoWB.
                Developed and Maintained By National Informatics Centre.
              </strong>
            </div>
            <div>
              <b>Version</b> 3.0
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminAuthenticatedLayoutCopy;
