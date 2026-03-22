import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import EnitBanner from "../../assets/images/Banners/file_banner.jpg";
import { FaRegFilePdf } from "react-icons/fa";

function GenderWiseReport() {
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
                Gender Wise Distribution Report
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
              <div className="overflow-y-auto">
                <table className="border border-gray-300 mt-4">
                  <thead>
                    <tr>
                      <th
                        className="p-3 border border-gray-300 text-center w-36 text-white bg-sky-500"
                        rowSpan="2"
                      >
                        District
                      </th>
                      <th
                        className="p-3 border border-gray-300 text-center w-52 text-white bg-sky-500"
                        colSpan="3"
                      >
                        Phase I
                      </th>
                      <th
                        className="p-3 border border-gray-300 text-center w-52 text-white bg-sky-500"
                        colSpan="3"
                      >
                        Phase II
                      </th>
                      <th
                        className="p-3 border border-gray-300 text-center w-52 text-white bg-sky-500"
                        colSpan="3"
                      >
                        Phase III
                      </th>
                      <th
                        className="p-3 border border-gray-300 text-center w-52 text-white bg-sky-500"
                        colSpan="3"
                      >
                        Phase IV
                      </th>
                      <th
                        className="p-3 border border-gray-300 text-center w-52 text-white bg-sky-500"
                        colSpan="3"
                      >
                        Phase V
                      </th>
                      <th
                        className="p-3 border border-gray-300 text-center w-52 text-white bg-sky-500"
                        colSpan="3"
                      >
                        Phase VI
                      </th>
                      <th
                        className="p-3 border border-gray-300 text-center w-52 text-white bg-sky-500"
                        colSpan="3"
                      >
                        Phase VII
                      </th>
                      <th
                        className="p-3 border border-gray-300 text-center w-52 text-white bg-sky-500"
                        colSpan="3"
                      >
                        Phase VIII
                      </th>
                      <th
                        className="p-3 border border-gray-300 text-center w-52 text-white bg-sky-500"
                        colSpan="3"
                      >
                        Phase IX (In Progress)
                      </th>
                      <th
                        className="p-3 border border-gray-300 text-center w-24 text-white bg-sky-500"
                        rowSpan="2"
                      >
                        Boys Total
                      </th>
                      <th
                        className="p-3 border border-gray-300 text-center w-24 text-white bg-sky-500"
                        rowSpan="2"
                      >
                        Girls Total
                      </th>
                      <th
                        className="p-3 border border-gray-300 text-center w-24 text-white bg-sky-500"
                        rowSpan="2"
                      >
                        Total
                      </th>
                    </tr>
                    <tr>
                      <th className="p-3 border border-gray-300 text-center text-white bg-sky-500">
                        Boys
                      </th>
                      <th className="p-3 border border-gray-300 text-center text-white bg-sky-500">
                        Girls
                      </th>
                      <th className="p-3 border border-gray-300 text-center text-white bg-sky-500">
                        Total
                      </th>

                      <th className="p-3 border border-gray-300 text-center text-white bg-sky-500">
                        Boys
                      </th>
                      <th className="p-3 border border-gray-300 text-center text-white bg-sky-500">
                        Girls
                      </th>
                      <th className="p-3 border border-gray-300 text-center text-white bg-sky-500">
                        Total
                      </th>

                      <th className="p-3 border border-gray-300 text-center text-white bg-sky-500">
                        Boys
                      </th>
                      <th className="p-3 border border-gray-300 text-center text-white bg-sky-500">
                        Girls
                      </th>
                      <th className="p-3 border border-gray-300 text-center text-white bg-sky-500">
                        Total
                      </th>

                      <th className="p-3 border border-gray-300 text-center text-white bg-sky-500">
                        Boys
                      </th>
                      <th className="p-3 border border-gray-300 text-center text-white bg-sky-500">
                        Girls
                      </th>
                      <th className="p-3 border border-gray-300 text-center text-white bg-sky-500">
                        Total
                      </th>

                      <th className="p-3 border border-gray-300 text-center text-white bg-sky-500">
                        Boys
                      </th>
                      <th className="p-3 border border-gray-300 text-center text-white bg-sky-500">
                        Girls
                      </th>
                      <th className="p-3 border border-gray-300 text-center text-white bg-sky-500">
                        Total
                      </th>

                      <th className="p-3 border border-gray-300 text-center text-white bg-sky-500">
                        Boys
                      </th>
                      <th className="p-3 border border-gray-300 text-center text-white bg-sky-500">
                        Girls
                      </th>
                      <th className="p-3 border border-gray-300 text-center text-white bg-sky-500">
                        Total
                      </th>

                      <th className="p-3 border border-gray-300 text-center text-white bg-sky-500">
                        Boys
                      </th>
                      <th className="p-3 border border-gray-300 text-center text-white bg-sky-500">
                        Girls
                      </th>
                      <th className="p-3 border border-gray-300 text-center text-white bg-sky-500">
                        Total
                      </th>

                      <th className="p-3 border border-gray-300 text-center text-white bg-sky-500">
                        Boys
                      </th>
                      <th className="p-3 border border-gray-300 text-center text-white bg-sky-500">
                        Girls
                      </th>
                      <th className="p-3 border border-gray-300 text-center text-white bg-sky-500">
                        Total
                      </th>

                      <th className="p-3 border border-gray-300 text-center text-white bg-sky-500">
                        Boys
                      </th>
                      <th className="p-3 border border-gray-300 text-center text-white bg-sky-500">
                        Girls
                      </th>
                      <th className="p-3 border border-gray-300 text-center text-white bg-sky-500">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        ALIPURDUAR{" "}
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        24554
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        25310
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        49864
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        11690
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        13248
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        24938
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        19839
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        23578
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        43417
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        9677
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        11042
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        20719
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        9708
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        11096
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        20804
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        10431
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        11416
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        21847
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        8020
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        8361
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        16381
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        9426
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        10018
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        19444
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        9084
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        9903
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        18987
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        112429
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        123972
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
                        61856
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        44855
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        106711
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        29205
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        27764
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        56969
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        56195
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        58725
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        114920
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        27824
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        28792
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        56616
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        28933
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        29871
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        58804
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        30008
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        30402
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        60410
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        17861
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        16726
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        34587
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        26728
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        26555
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        53283
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        26297
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        25833
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        52130
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        304907
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        289523
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        594430
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        BIRBHUM{" "}
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        46995
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        74969
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        121964
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        24249
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        1260
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        25509
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        47566
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        56555
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        104121
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        24657
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        28361
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        53018
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        24951
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        28714
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        53665
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        25436
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        29063
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        54499
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        17696
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        18011
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        35707
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        26692
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        28278
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        54970
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        25731
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        26855
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        52586
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        263973
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        292066
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        556039
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        COOCH BIHAR{" "}
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        47190
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        53463
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        100653
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        25123
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        29866
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        54989
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        44145
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        51262
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        95407
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        21469
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        23933
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        45402
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        22037
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        24674
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        46711
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        23055
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        24932
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        47987
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        16397
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        16844
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        33241
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        20826
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        21670
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        42496
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        21423
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        22667
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        44090
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        241665
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        269311
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        510976
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        DAKSHIN DINAJPUR{" "}
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        25860
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        40462
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        66322
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        11953
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        793
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        12746
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        22421
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        26274
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        48695
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        11043
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        12268
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        23311
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        11049
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        12053
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        23102
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        10781
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        11917
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        22698
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        8708
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        8933
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        17641
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        9731
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        10359
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        20090
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        9626
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        10758
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        20384
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        121172
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        133817
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
                        67306
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        118159
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        185465
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        32344
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        476
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        32820
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        61206
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        74832
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        136038
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        30970
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        35533
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        66503
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        30279
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        35055
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        65334
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        31785
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        35142
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        66927
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        17510
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        17941
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        35451
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        28246
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        31523
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        59769
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        27191
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        30794
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        57985
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        326837
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        379455
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        706292
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        HOWRAH{" "}
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        55274
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        67454
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        122728
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        27449
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        36687
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        64136
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        51096
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        65979
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        117075
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        25441
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        30633
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        56074
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        25203
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        30814
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        56017
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        27092
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        32466
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        59558
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        16356
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        17962
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        34318
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        25386
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        29021
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        54407
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        24611
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        29468
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        54079
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        277908
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        340484
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        618392
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        JALPAIGURI{" "}
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        35870
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        40520
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        76390
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        17368
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        22132
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        39500
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        32177
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        39181
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        71358
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        15088
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        17523
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        32611
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        14565
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        17258
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        31823
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        16124
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        18161
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        34285
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        12930
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        13809
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        26739
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        14203
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        15626
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        29829
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        13412
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        15453
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        28865
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        171737
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        199663
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        371400
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        JHARGRAM{" "}
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        18181
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        4730
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        22911
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        8952
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        118
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        9070
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        16986
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        17686
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        34672
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        8323
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        8783
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        17106
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        8463
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        8986
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        17449
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        9191
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        9718
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        18909
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        5676
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        5637
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        11313
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        7821
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        8022
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        15843
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        7814
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        7931
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        15745
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        91407
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        71611
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        163018
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        MALDAH{" "}
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        49103
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        46641
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        95744
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        29146
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        41143
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        70289
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        56053
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        81685
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        137738
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        31247
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        43297
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        74544
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        31710
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        43807
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        75517
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        34602
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        46287
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        80889
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        29917
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        36581
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        66498
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        34806
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        41905
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        76711
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        32986
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        40562
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        73548
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        329570
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        421908
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
                        44567
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        23248
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        67815
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        42919
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        66550
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        109469
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        89269
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        135323
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        224592
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        49239
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        68777
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        118016
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        50882
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        69630
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        120512
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        54081
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        71153
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        125234
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        41763
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        48250
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        90013
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        54396
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        66025
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        120421
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        52287
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        64246
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        116533
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        479403
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        613202
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        1092605
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        NADIA{" "}
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        88870
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        85172
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        174042
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        38871
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        41636
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        80507
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        72950
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        81748
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        154698
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        34247
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        37311
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        71558
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        33769
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        36265
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        70034
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        33896
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        35989
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        69885
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        17568
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        16696
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        34264
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        29557
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        31107
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        60664
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        30398
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        31803
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        62201
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        380126
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        397727
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
                        130094
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        196549
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        326643
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        57053
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        1741
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        58794
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        101248
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        121304
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        222552
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        49129
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        57122
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        106251
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        49310
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        56600
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        105910
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        52752
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        58401
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        111153
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        33272
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        33520
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        66792
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        47582
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        50526
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        98108
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        46287
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        48651
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        94938
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        566727
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        624414
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        1191141
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        PASCHIM BARDDHAMAN{" "}
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        33360
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        53298
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        86658
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        16254
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        713
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        16967
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        30203
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        33894
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        64097
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        14744
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        16883
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        31627
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        14790
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        16843
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        31633
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        15067
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        17853
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        32920
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        10878
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        11716
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        22594
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        14559
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        16249
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        30808
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        14196
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        16245
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        30441
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        164051
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        183694
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
                        69285
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        98629
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        167914
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        32462
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        278
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        32740
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        63425
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        69695
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        133120
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        32539
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        34405
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        66944
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        32862
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        35677
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        68539
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        34196
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        36510
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        70706
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        26288
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        25594
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        51882
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        32070
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        33353
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        65423
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        30801
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        31940
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        62741
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        353928
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        366081
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        720009
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        PURBA BARDDHAMAN{" "}
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        60279
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        103132
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        163411
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        31804
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        1078
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        32882
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        59519
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        70958
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        130477
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        30065
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        34618
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        64683
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        31123
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        34904
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        66027
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        32087
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        35850
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        67937
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        17550
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        17122
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        34672
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        27951
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        30027
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        57978
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        27952
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        30929
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        58881
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        318330
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        358618
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        676948
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        PURBA MEDINIPUR{" "}
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        63209
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        55205
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        118414
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        34392
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        39840
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        74232
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        67495
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        76333
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        143828
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        33786
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        37373
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        71159
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        33551
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        37566
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        71117
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        36709
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        39376
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        76085
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        28335
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        27502
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        55837
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        33551
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        35071
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        68622
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        32427
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        34714
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        67141
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        363455
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        382980
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
                        49588
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        37404
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        86992
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        22121
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        13752
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        35873
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        45479
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        49008
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        94487
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        24311
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        25578
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        49889
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        25304
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        27274
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        52578
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        30355
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        33168
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        63523
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        16220
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        15521
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        31741
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        24340
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        24178
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        48518
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        22827
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        23190
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        46017
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        260545
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        249073
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        509618
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        SILIGURI{" "}
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        16420
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        18178
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        34598
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        7364
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        9147
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        16511
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        13429
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        16787
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        30216
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        6160
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        8003
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        14163
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        5993
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        7652
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        13645
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        6447
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        7727
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        14174
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        5915
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        6802
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        12717
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        6053
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        7136
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        13189
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        5855
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        7110
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        12965
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        73636
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        88542
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        162178
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        SOUTH TWENTY FOUR PARGANA{" "}
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        98578
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        160466
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        259044
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        51342
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        1618
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        52960
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        97066
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        125219
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        222285
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        50813
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        64270
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        115083
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        51500
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        66609
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        118109
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        54977
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        71119
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        126096
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        40550
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        47503
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        88053
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        51340
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        61128
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        112468
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        49498
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        60849
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        110347
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        545664
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        658781
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        1204445
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        UTTAR DINAJPUR{" "}
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        38132
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        45493
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        83625
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        18292
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        27344
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        45636
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        36167
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        54584
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        90751
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        19154
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        29280
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        48434
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        18968
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        30170
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        49138
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        20052
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        32213
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        52265
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        20466
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        28560
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        49026
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        20863
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        28378
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        49241
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        21084
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        28931
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        50015
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        213178
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        304953
                      </td>

                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        518131
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        Total
                      </td>
                      <td
                        className="p-3 border border-gray-300 text-center w-1/4"
                        colSpan="1"
                      >
                        <strong>1124571</strong>
                      </td>
                      <td
                        className="p-3 border border-gray-300 text-center w-1/4"
                        colSpan="1"
                      >
                        <strong>1393337</strong>
                      </td>
                      <td
                        className="p-3 border border-gray-300 text-center w-1/4"
                        colSpan="1"
                      >
                        <strong>2517908</strong>
                      </td>
                      <td
                        className="p-3 border border-gray-300 text-center w-1/4"
                        colSpan="1"
                      >
                        <strong>570353</strong>
                      </td>
                      <td
                        className="p-3 border border-gray-300 text-center w-1/4"
                        colSpan="1"
                      >
                        <strong>377184</strong>
                      </td>
                      <td
                        className="p-3 border border-gray-300 text-center w-1/4"
                        colSpan="1"
                      >
                        <strong>947537</strong>
                      </td>
                      <td
                        className="p-3 border border-gray-300 text-center w-1/4"
                        colSpan="1"
                      >
                        <strong>1083934</strong>
                      </td>
                      <td
                        className="p-3 border border-gray-300 text-center w-1/4"
                        colSpan="1"
                      >
                        <strong>1330610</strong>
                      </td>
                      <td
                        className="p-3 border border-gray-300 text-center w-1/4"
                        colSpan="1"
                      >
                        <strong>2414544</strong>
                      </td>
                      <td
                        className="p-3 border border-gray-300 text-center w-1/4"
                        colSpan="1"
                      >
                        <strong>549926</strong>
                      </td>
                      <td
                        className="p-3 border border-gray-300 text-center w-1/4"
                        colSpan="1"
                      >
                        <strong>653785</strong>
                      </td>
                      <td
                        className="p-3 border border-gray-300 text-center w-1/4"
                        colSpan="1"
                      >
                        <strong>1203711</strong>
                      </td>
                      <td
                        className="p-3 border border-gray-300 text-center w-1/4"
                        colSpan="1"
                      >
                        <strong>554950</strong>
                      </td>
                      <td
                        className="p-3 border border-gray-300 text-center w-1/4"
                        colSpan="1"
                      >
                        <strong>661518</strong>
                      </td>
                      <td
                        className="p-3 border border-gray-300 text-center w-1/4"
                        colSpan="1"
                      >
                        <strong>1216468</strong>
                      </td>
                      <td
                        className="p-3 border border-gray-300 text-center w-1/4"
                        colSpan="1"
                      >
                        <strong>589124</strong>
                      </td>
                      <td
                        className="p-3 border border-gray-300 text-center w-1/4"
                        colSpan="1"
                      >
                        <strong>688863</strong>
                      </td>
                      <td
                        className="p-3 border border-gray-300 text-center w-1/4"
                        colSpan="1"
                      >
                        <strong>1277987</strong>
                      </td>
                      <td
                        className="p-3 border border-gray-300 text-center w-1/4"
                        colSpan="1"
                      >
                        <strong>409876</strong>
                      </td>
                      <td
                        className="p-3 border border-gray-300 text-center w-1/4"
                        colSpan="1"
                      >
                        <strong>439591</strong>
                      </td>
                      <td
                        className="p-3 border border-gray-300 text-center w-1/4"
                        colSpan="1"
                      >
                        <strong>849467</strong>
                      </td>
                      <td
                        className="p-3 border border-gray-300 text-center w-1/4"
                        colSpan="1"
                      >
                        <strong>546127</strong>
                      </td>
                      <td
                        className="p-3 border border-gray-300 text-center w-1/4"
                        colSpan="1"
                      >
                        <strong>606155</strong>
                      </td>
                      <td
                        className="p-3 border border-gray-300 text-center w-1/4"
                        colSpan="1"
                      >
                        <strong>1152282</strong>
                      </td>
                      <td
                        className="p-3 border border-gray-300 text-center w-1/4"
                        colSpan="1"
                      >
                        <strong>531787</strong>
                      </td>
                      <td
                        className="p-3 border border-gray-300 text-center w-1/4"
                        colSpan="1"
                      >
                        <strong>598832</strong>
                      </td>
                      <td
                        className="p-3 border border-gray-300 text-center w-1/4"
                        colSpan="1"
                      >
                        <strong>1130619</strong>
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        <strong>5428861</strong>
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        <strong>5428861</strong>
                      </td>
                      <td className="p-3 border border-gray-300 text-center w-1/4">
                        <strong>11579904</strong>
                      </td>
                    </tr>
                  </tbody>
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

export default GenderWiseReport;
