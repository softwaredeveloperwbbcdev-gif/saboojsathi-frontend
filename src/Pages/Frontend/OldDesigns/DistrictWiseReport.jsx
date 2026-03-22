import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import EnitBanner from "../../assets/images/Banners/file_banner.jpg";
import { FaRegFilePdf } from "react-icons/fa";

function DistrictWiseReport() {
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
              <h3 className="text-5xl text-white font-sans">
                District Wise Distribution Report
              </h3>
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
              <div>
                <table className="border border-gray-300 mt-4">
                  <thead>
                    <tr>
                      <th
                        className="p-3 border border-gray-300 text-center w-1/4 text-white bg-sky-500 text-xl"
                        colSpan="11"
                      >
                        No of Students received Bi-cycle since inception
                      </th>
                    </tr>
                    <tr>
                      <th className="p-3 border border-gray-300 text-center w-1/4 text-white bg-sky-500">
                        District
                      </th>
                      <th className="p-3 border border-gray-300 text-center w-1/4 text-white bg-sky-500">
                        Phase I
                      </th>
                      <th className="p-3 border border-gray-300 text-center w-1/4 text-white bg-sky-500">
                        Phase II
                      </th>
                      <th className="p-3 border border-gray-300 text-center w-1/4 text-white bg-sky-500">
                        Phase III
                      </th>
                      <th className="p-3 border border-gray-300 text-center w-1/4 text-white bg-sky-500">
                        Phase IV
                      </th>
                      <th className="p-3 border border-gray-300 text-center w-1/4 text-white bg-sky-500">
                        Phase V
                      </th>
                      <th className="p-3 border border-gray-300 text-center w-1/4 text-white bg-sky-500">
                        Phase VI
                      </th>
                      <th className="p-3 border border-gray-300 text-center w-1/4 text-white bg-sky-500">
                        Phase VII
                      </th>
                      <th className="p-3 border border-gray-300 text-center w-1/4 text-white bg-sky-500">
                        Phase VIII
                      </th>
                      <th className="p-3 border border-gray-300 text-center w-1/4 text-white bg-sky-500">
                        Phase IX (In Progress)
                      </th>
                      <th className="p-3 border border-gray-300 text-center w-1/4 text-white bg-sky-500">
                        Total
                      </th>
                    </tr>
                  </thead>

                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      ALIPURDUAR{" "}
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      49864
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      24938
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      43417
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      20719
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      20804
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      21847
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      16381
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      19444
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      18987
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      236401
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      BANKURA{" "}
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      106711
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      56969
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      114920
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      56616
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      58804
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      60410
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      34587
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      53283
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      52516
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      594816
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      BIRBHUM{" "}
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      121964
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      25509
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      104121
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      53018
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      53665
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      54499
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      35707
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      54970
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      52904
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      556357
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      COOCH BIHAR{" "}
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      100653
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      54989
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      95407
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      45402
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      46711
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      47987
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      33241
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      42496
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      44173
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      511059
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      DAKSHIN DINAJPUR{" "}
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      66322
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      12746
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      48695
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      23311
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      23102
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      22698
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      17641
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      20090
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      20384
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      254989
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      HOOGHLY{" "}
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      185465
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      32820
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      136038
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      66503
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      65334
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      66927
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      35451
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      59769
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      58528
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      706835
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      HOWRAH{" "}
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      122728
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      64136
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      117075
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      56074
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      56017
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      59558
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      34318
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      54407
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      54097
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      618410
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      JALPAIGURI{" "}
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      76390
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      39500
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      71358
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      32611
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      31823
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      34285
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      26739
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      29829
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      28866
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      371401
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      JHARGRAM{" "}
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      22911
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      9070
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      34672
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      17106
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      17449
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      18909
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      11313
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      15843
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      15747
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      163020
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      MALDAH{" "}
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      95744
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      70289
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      137738
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      74544
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      75517
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      80889
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      66498
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      76711
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      73548
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      751478
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      MURSHIDABAD{" "}
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      67815
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      109469
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      224592
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      118016
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      120512
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      125234
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      90013
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      120421
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      116543
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      1092615
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      NADIA{" "}
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      174042
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      80507
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      154698
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      71558
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      70034
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      69885
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      34264
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      60664
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      62201
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      777853
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      NORTH TWENTY FOUR PARGANA{" "}
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      326643
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      58794
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      222552
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      106251
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      105910
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      111153
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      66792
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      98108
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      94942
                    </td>

                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      1191145
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      PASCHIM BARDDHAMAN{" "}
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      86658
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      16967
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      64097
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      31627
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      31633
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      32920
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      22594
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      30808
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      30441
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      347745
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      PASCHIM MEDINIPUR{" "}
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      167914
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      32740
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      133120
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      66944
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      68539
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      70706
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      51882
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      65423
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      62853
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      720121
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      PURBA BARDDHAMAN{" "}
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      163411
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      32882
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      130477
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      64683
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      66027
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      67937
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      34672
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      57978
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      58907
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      676974
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      PURBA MEDINIPUR{" "}
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      118414
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      74232
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      143828
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      71159
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      71117
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      76085
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      55837
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      68622
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      67141
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      746435
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      PURULIYA{" "}
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      86992
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      35873
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      94487
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      49889
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      52578
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      63523
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      31741
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      48518
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      46166
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      509767
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      SILIGURI{" "}
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      34598
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      16511
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      30216
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      14163
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      13645
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      14174
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      12717
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      13189
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      12966
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      162179
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      SOUTH TWENTY FOUR PARGANA{" "}
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      259044
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      52960
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      222285
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      115083
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      118109
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      126096
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      88053
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      112468
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      110784
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      1204882
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      UTTAR DINAJPUR{" "}
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      83625
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      45636
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      90751
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      48434
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      49138
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      52265
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      49026
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      49241
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      50053
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      518169
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      Total
                    </td>
                    <td
                      className="p-3 border border-gray-300 text-center w-1/4"
                      colspan="1"
                    >
                      <strong>2517908</strong>
                    </td>
                    <td
                      className="p-3 border border-gray-300 text-center w-1/4"
                      colspan="1"
                    >
                      <strong>947537</strong>
                    </td>
                    <td
                      className="p-3 border border-gray-300 text-center w-1/4"
                      colspan="1"
                    >
                      <strong>2414544</strong>
                    </td>

                    <td
                      className="p-3 border border-gray-300 text-center w-1/4"
                      colspan="1"
                    >
                      <strong>1203711</strong>
                    </td>
                    <td
                      className="p-3 border border-gray-300 text-center w-1/4"
                      colspan="1"
                    >
                      <strong>1216468</strong>
                    </td>
                    <td
                      className="p-3 border border-gray-300 text-center w-1/4"
                      colspan="1"
                    >
                      <strong>1277987</strong>
                    </td>
                    <td
                      className="p-3 border border-gray-300 text-center w-1/4"
                      colspan="1"
                    >
                      <strong>849467</strong>
                    </td>
                    <td
                      className="p-3 border border-gray-300 text-center w-1/4"
                      colspan="1"
                    >
                      <strong>1152282</strong>
                    </td>
                    <td
                      className="p-3 border border-gray-300 text-center w-1/4"
                      colspan="1"
                    >
                      <strong>1132747</strong>
                    </td>
                    <td className="p-3 border border-gray-300 text-center w-1/4">
                      <strong>12712651</strong>
                    </td>
                  </tr>
                </table>
              </div>
              Report generated on 01-02-2025 02:14 pm.
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default DistrictWiseReport;
