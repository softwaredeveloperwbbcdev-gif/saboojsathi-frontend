import AdminAuthenticatedLayout from "../../../../Layouts/AdminLayout/AdminAuthenticatedLayout";
import { useParams } from "react-router-dom";
import useApi from "../../../../Hooks/useApi";
import LogoutPopup from "../../../../Components/LogoutPopup";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  phaseYearId,
  defaultPhaseYear,
} from "../../../../Utils/Constants/Constants";

const DownloadDistributionView = () => {
  const { phaseId } = useParams();
  const phaseDetails = phaseYearId[phaseId] || defaultPhaseYear;

  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const user = JSON.parse(atob(localStorage.getItem("user")));
  const location_name = user.name;
  const dice_code = user.login_cd;
  const schoolId = user.internal_code;

  const [loading, setLoading] = useState(false); // loader

  // const downloadPdf = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await callApi(
  //       "GET",
  //       `downloadMusterRoll/${phaseId}/${btoa(schoolId)}`
  //     );

  //     if (response.error) {
  //       console.error("Failed to download PDF:", response.message);
  //       toast.error(`❌ Failed to download the PDF: ${response.message}`);
  //     } else {
  //       const { base64, mime, filename } = response.data;
  //       const byteCharacters = atob(base64);
  //       const byteNumbers = new Array(byteCharacters.length);
  //       for (let i = 0; i < byteCharacters.length; i++) {
  //         byteNumbers[i] = byteCharacters.charCodeAt(i);
  //       }
  //       const byteArray = new Uint8Array(byteNumbers);
  //       const blob = new Blob([byteArray], { type: mime });

  //       const blobUrl = URL.createObjectURL(blob);
  //       const link = document.createElement("a");
  //       link.href = blobUrl;
  //       link.download = filename || "muster-roll.pdf";
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //     }
  //   } catch (err) {
  //     console.error("❌ An unexpected error occurred:", err);
  //     toast.error("An unexpected error occurred. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const downloadPdf = async () => {
    setLoading(true);

    try {
      const response = await callApi(
        "GET",
        `downloadMusterRoll/${phaseId}/${btoa(schoolId)}`,
        null,
        {
          responseType: "blob",
        }
      );

      if (response.error) {
        throw new Error(response.message || "Download failed");
      }

      // ✅ USE response.data (the actual Blob)
      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `MasterRoll_${schoolId}.pdf`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("❌ PDF download failed:", err);
      toast.error("Failed to download the PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminAuthenticatedLayout>
        <section className="p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">
            Distribution Records (Phase {phaseDetails.phaseName}) for{" "}
            {location_name
              .toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300 overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 border-separate border-spacing-0">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4 text-center rounded-tl-lg">
                    School Dise Code
                  </th>
                  <th scope="col" className="p-4 text-center">
                    School Name
                  </th>
                  <th scope="col" className="p-4 text-center rounded-tr-lg">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  key={1}
                  className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <td className="p-4 text-center">{dice_code}</td>
                  <td className="p-4 text-center">{location_name}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={downloadPdf}
                      className="bg-blue-900 text-white p-2 rounded-md hover:bg-blue-700"
                    >
                      Download Distribution Records
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
              <div className="loader border-t-4 border-blue-500 rounded-full w-10 h-10 animate-spin"></div>
            </div>
          )}
        </section>
      </AdminAuthenticatedLayout>
      {/* Modal section */}
      {showPopup && (
        <LogoutPopup
          message={popupMessage}
          onConfirm={() => {
            handleLogout();
            setShowPopup(false);
          }}
        />
      )}
      {/* Modal section */}
    </>
  );
};

export default DownloadDistributionView;
