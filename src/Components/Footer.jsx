import React, { useState } from "react";
import { Link } from "react-router-dom";
import FooterImg from "../assets/images/footer_bg.jpg";
import NicImg from "../assets/images/nic.png";

function Footer() {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      {/** Footer section */}
      <footer
        className="bg-cover bg-center bg-no-repeat py-4 text-white text-sm w-full"
        style={{ backgroundImage: `url(` + FooterImg + `)` }}
      >
        <div className="w-full px-4">
          <div className="text-sm w-full">
            Copyright &copy; 2019-2020 Saboojsathi - All Rights Reserved.
          </div>
          <div className="w-full flex">
            <ul className="flex space-x-4 my-2 text-base">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/About"}>About Scheme</Link>
              </li>
              <li>
                <Link to={"/Enit"}>Tender Documents</Link>
              </li>
              <li>
                <Link to="#">FAQ</Link>
              </li>
              <li>
                <a onClick={handleModalToggle}>Legal Disclaimer</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full">
          <div className="text-base leading-4 border-b"></div>

          <div className="w-full text-left">
            <div className="inline-block mt-2 ml-5 bg-white text-center text-blue-950 font-bold font-[Arial] text-xs px-1 py-2 w-[150px]">
              Site Visitor - <span id="visitor">191962587</span>
            </div>
            <div className="inline-block float-right mt-2 mr-5 bg-white text-center text-blue-950 font-bold font-[Arial] text-xs px-1 py-2 w-[300px]">
              Designed and Developed by:
              <a href="http://www.nic.in/" className="inline">
                <img src={NicImg} className="inline" alt="NIC" />
              </a>
            </div>
          </div>
        </div>
        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="modal bg-white rounded-lg p-6">
              <div className="modal-header flex justify-between items-center">
                <h3 className="modal-title text-lg font-bold">
                  Registration Process for Saboojsathi Phase-VIII (AY: 2022) has
                  started. Please follow the schedule below
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={handleModalToggle}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="bg-blue-900 text-white p-4 rounded">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th colSpan="3" className="text-center">
                          Data Verification, Finalization by Schools &
                          Validation of Records by SI of School
                        </th>
                      </tr>
                      <tr>
                        <th className="text-center">Phase</th>
                        <th className="text-center">Name of Districts</th>
                        <th className="text-center">Period</th>
                      </tr>
                    </thead>
                    <tbody>{/* ... table rows ... */}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </footer>
      {/** page Footer */}
    </>
  );
}

export default Footer;
