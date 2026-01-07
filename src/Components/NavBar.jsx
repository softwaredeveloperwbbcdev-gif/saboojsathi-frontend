import React, { useState } from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { TiContacts } from "react-icons/ti";
import Logo from "../assets/images/sabooj_sathi_logo_icon.jpg";
import { FaCaretDown } from "react-icons/fa6";
import NavDropDown from "../Components/NavDropDown";
import { Link } from "react-router-dom";

function NavBar() {
  const [dropdown, setDropdown] = useState(false);
  const clickHandler = () => setDropdown(!dropdown);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <>
      {/** Page Header */}
      <div className="bg-gray-300 dark:bg-gray-700 w-full flex flex-row">
        <div className="flex flex-row h-40 w-2/5">
          <div className="flex flex-row">
            <Link to={"/"}>
              <img src={Logo} className="h-40" />
            </Link>
            <div className="px-2">
              <h1 className="text-green-600 text-4xl font-bold uppercase tracking-wider mt-14 py-1">
                Sabooj Sathi
              </h1>
              <h2 className="text-slate-900 dark:text-slate-200 text-lg uppercase tracking-widest py-1">
                Govt of West Bengal
              </h2>
            </div>
          </div>
        </div>
        <div className="w-3/5 flex flex-col">
          <div className="flex flex-row ml-auto my-4">
            <div className="mt-1">
              <span className="inline">
                <BsFillTelephoneFill className="inline" /> +91 9123917773 |
              </span>
              <span className="inline">
                {" "}
                <MdEmail className="inline" /> saboojsathi-wb@gov.in |
              </span>
              <span className="inline">
                {" "}
                <FaRegClock className="inline" /> Mon-Fri: 11AM - 6PM
              </span>
            </div>
            <div className="ml-8 mr-4">
              <Link
                to={"/Login"}
                className="mx-1 p-1 inline text-lg hover:text-green-500"
              >
                <IoIosLogIn className="inline text-xl" /> Login
              </Link>
              <Link
                to="/Contacts"
                className="mx-1 p-1 inline text-lg hover:text-green-500"
              >
                <TiContacts className="inline text-xl" /> Contact
              </Link>
            </div>
          </div>
          <div className="ml-auto mt-auto mr-3 mb-1">
            <Link
              to="/"
              className="px-3 py-1 text-xl border-green-500 hover:text-green-500 hover:border-b-4"
            >
              Home
            </Link>
            <Link
              to="/About"
              className="px-3 py-1 text-xl border-green-500 hover:text-green-500 hover:border-b-4"
            >
              About Scheme
            </Link>
            <Link className="px-3 py-1 text-xl border-green-500 hover:text-green-500 hover:border-b-4">
              Impact Study
            </Link>
            <NavDropDown>
              <NavDropDown.Trigger>
                Tender Documents <FaCaretDown className="inline" />
              </NavDropDown.Trigger>
              <NavDropDown.Content>
                <NavDropDown.Link to={"/Enit"}>e-NIT</NavDropDown.Link>
                <NavDropDown.Link to={"/PreBid"}>
                  Pre-bid Minutes
                </NavDropDown.Link>
                <NavDropDown.Link to={"/TechBidEval"}>
                  Technical Bid Evaluation
                </NavDropDown.Link>
                <NavDropDown.Link to={"/FinBidEval"}>
                  Financial Bid Evaluation
                </NavDropDown.Link>
              </NavDropDown.Content>
            </NavDropDown>

            <NavDropDown>
              <NavDropDown.Trigger>
                Reports <FaCaretDown className="inline" />
              </NavDropDown.Trigger>
              <NavDropDown.Content>
                <NavDropDown.Link to={"/Synoptic"}>Synoptic</NavDropDown.Link>
                <NavDropDown.Link to={"/DistrictWise"}>
                  District Wise
                </NavDropDown.Link>
                <NavDropDown.Link to={"/GenderWise"}>
                  Gender Wise
                </NavDropDown.Link>
                <NavDropDown.Link to="#">Social Group Wise</NavDropDown.Link>
                <NavDropDown.Link to="#">Search Beneficiary</NavDropDown.Link>
              </NavDropDown.Content>
            </NavDropDown>
            <NavDropDown>
              <NavDropDown.Trigger>
                Downloads <FaCaretDown className="inline" />
              </NavDropDown.Trigger>
              <NavDropDown.Content>
                <NavDropDown.Link href="#">SOP Sabooj Sathi</NavDropDown.Link>
              </NavDropDown.Content>
            </NavDropDown>
          </div>
        </div>
      </div>
      {/** Page Header */}
    </>
  );
}

export default NavBar;
