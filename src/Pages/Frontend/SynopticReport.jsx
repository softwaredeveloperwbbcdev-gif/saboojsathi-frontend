import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import EnitBanner from "../../assets/images/Banners/file_banner.jpg";
import { FaRegFilePdf } from "react-icons/fa";
function SynopticReport() {
  return (
    <>
      <div className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-slate-200">
        <NavBar />
        <div>
          <div
            className="bg-cover bg-center bg-no-repeat w-full"
            style={{ backgroundImage: `url(` + EnitBanner + `)` }}
          >
            <div className="w-[1140px] mx-auto py-12">
              <h3 className="text-5xl text-white font-sans">Synoptic Report</h3>
            </div>
          </div>
          <div className="w-[1140px] mx-auto py-12">
            <div className="w-[90%] my-0 mx-auto">
              <div className="relative w-full flex justify-end">
                <Link
                  href="#"
                  className="text-white bg-green-500 hover:bg-green-400 rounded-lg p-3 in"
                >
                  Download <FaRegFilePdf className="inline text-red-600" />
                </Link>
              </div>
              <table className="border border-gray-300 mt-4">
                <thead>
                  <tr>
                    <th className="p-3 border border-gray-300 text-center w-1/4 text-white bg-sky-500">
                      Year
                    </th>
                    <th className="p-3 border border-gray-300 text-center w-1/4 text-white bg-sky-500">
                      Phase
                    </th>
                    <th className="p-3 border border-gray-300 text-center w-1/4 text-white bg-sky-500">
                      Eligible Students
                    </th>
                    <th className="p-3 border border-gray-300 text-center w-1/4 text-white bg-sky-500">
                      No of students received Bi-cycle
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      2015-16
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      Phase I
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      All students of className X,XI,XII and girl students of
                      className IX of 8 districts (AY-2015)
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      2517908
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      2016-17
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      Phase II
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      Rest of the girl students and all boy students of
                      className IX (AY-2015)
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      947537
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      2017-18
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      Phase III
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      Class IX of AY-2016 <br />
                      Class IX of AY-2017
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      2414544
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      2018-19
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      Phase IV
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      Class IX of AY-2018
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      1203711
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      2019-20
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      Phase V
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      Class IX of AY-2019
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      1216468
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      2020-21
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      Phase VI
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      Class IX of AY-2020
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      1277987
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      2021-22
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      Phase VII
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      Class IX of AY-2021
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      849467
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      2022-23
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      Phase VIII
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      Class IX of AY-2022
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      1152282
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      2023-24
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      Phase IX (In progress)
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      Class IX of AY-2023
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      1130732
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="p-3 border border-gray-300 text-center w-1/4"
                      colSpan="3"
                    >
                      <strong>Total</strong>
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      <strong>12710636</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
              Report generated on 01-02-2025 02:14 pm.
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default SynopticReport;
