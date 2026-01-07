import React, { useEffect, useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
// Register chart components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);
import {
  IoIosPeople,
  IoIosTrendingUp,
  IoIosRemoveCircleOutline,
  IoMdDoneAll,
} from "react-icons/io"; // From ionicons

const State = ({ graphData }) => {
  const [showData, setShowData] = useState([]);

  useEffect(() => {
    if (graphData) {
      setShowData(graphData);
    }
  }, [graphData]);

  const genderData = {
    boys: showData.gender?.[0]?.boys || 0,
    girls: showData.gender?.[0]?.girls || 0,
  };

  const casteData = {
    general: showData.category?.[0]?.general || 0,
    sc: showData.category?.[0]?.sc || 0,
    st: showData.category?.[0]?.st || 0,
    obc: showData.category?.[0]?.obc || 0,
  };
  // const labels = showData.barchart.map(item => item.district);
  // const dataValues = showData.barchart.map(item => item.count_application);

  const barData = {
    labels: Array.isArray(showData?.barchart)
      ? showData.barchart.map((item) => item.name)
      : [],
    data: Array.isArray(showData?.barchart)
      ? showData.barchart.map((item) => item.count_application)
      : [],
  };
  const profileStats = {
    application: showData.general?.[0]?.application || 0,
    finalization: showData.general?.[0]?.finalization || 0,
    rejected: showData.general?.[0]?.rejected || 0,
    approved: showData.general?.[0]?.approved || 0,
  };

  return (
    <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
        Dashboard
      </h1>
      {/*  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#3c8dbc] text-white rounded p-4 shadow">
          <div className="text-2xl font-bold">{profileStats.application}</div>
          <div className="text-sm">Profile Entered</div>
          <div className="mt-2 text-xl">
            <IoIosPeople className="inline" />
          </div>
        </div>

        <div className="bg-[#00a65a] text-white rounded p-4 shadow">
          <div className="text-2xl font-bold">{profileStats.finalization}</div>
          <div className="text-sm">Profile Finalized</div>
          <div className="mt-2 text-xl">
            <IoIosTrendingUp className="inline" />
          </div>
        </div>

        <div className="bg-[#f39c12] text-white rounded p-4 shadow">
          <div className="text-2xl font-bold">{profileStats.rejected}</div>
          <div className="text-sm">Rejected Profile</div>
          <div className="mt-2 text-xl">
            <IoIosRemoveCircleOutline className="inline" />
          </div>
        </div>

        <div className="bg-[#00c0ef] text-white rounded p-4 shadow">
          <div className="text-2xl font-bold">{profileStats.approved}</div>
          <div className="text-sm">Approved Profile</div>
          <div className="mt-2 text-xl">
            <IoMdDoneAll className="inline" />
          </div>
        </div>
      </div>

      <br />
      {/*  */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gender Chart Section */}
        <div className="space-y-6 p-6 border bg-white dark:bg-transparent rounded-lg shadow-sm">
          <div className="text-xl font-semibold text-gray-800 dark:text-gray-200 text-center">
            Phase XI Year 2025 Gender Wise Profile Chart
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-8 space-y-6 sm:space-y-0">
            {/* Fixed-size chart container */}
            <div className="flex justify-center">
              <Doughnut
                data={{
                  labels: [
                    `Boys - ${genderData.boys}`,
                    `Girls - ${genderData.girls}`,
                  ],
                  datasets: [
                    {
                      data: [genderData.boys, genderData.girls],
                      backgroundColor: ["#f56954", "#00a65a"],
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  plugins: {
                    legend: {
                      display: true,
                      position: "right", // ✅ Show legend beside chart
                      labels: {
                        usePointStyle: true,
                        padding: 20,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Caste Chart Section */}
        <div className="space-y-6 p-6 border bg-white dark:bg-transparent rounded-lg shadow-sm">
          <div className="text-xl font-semibold text-gray-800 dark:text-gray-200 text-center">
            Phase XI Year 2025 Caste Wise Profile Chart
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-8 space-y-6 sm:space-y-0">
            <div className="flex justify-center">
              <Doughnut
                data={{
                  labels: [
                    `General - ${casteData.general}`,
                    `SC - ${casteData.sc}`,
                    `ST - ${casteData.st}`,
                    `OBC - ${casteData.obc}`,
                  ],
                  datasets: [
                    {
                      data: [
                        casteData.general,
                        casteData.sc,
                        casteData.st,
                        casteData.obc,
                      ],
                      backgroundColor: [
                        "#f56954", // General
                        "#00a65a", // SC
                        "#f39c12", // ST
                        "#00c0ef", // OBC
                      ],
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  plugins: {
                    legend: {
                      display: true,
                      position: "right", // ✅ Show beside chart
                      labels: {
                        usePointStyle: true,
                        padding: 20,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <br />
      {/* Bar Chart */}
      {barData.labels.length > 0 && (
        <div className="col-span-1 md:col-span-2 bg-white dark:bg-transparent rounded shadow p-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            {/* {stakeCd === "0207"
            ? "District-wise Applicants"
            : "Block-wise Applicants"} */}
            Phase XI District Wise Application Academic Yr. 2025
          </h2>
          <div className="h-72">
            <Bar
              data={{
                labels: barData.labels,
                datasets: [
                  {
                    label: "PHASE XI 2025",
                    data: barData.data,
                    backgroundColor: "#00a65a",
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>
      )}
    </section>
    // </div>
  );
};

export default State;
