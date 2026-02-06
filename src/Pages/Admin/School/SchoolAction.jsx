import { useState } from "react";
import useApi from "../../../Hooks/useApi";
import { toast } from "react-toastify";

export const useStudentDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { callApi } = useApi();

  const downloadExcel = async (phaseId) => {
    setIsDownloading(true);
    try {
      const response = await callApi(
        "GET",
        `StudentProfileDownloadExcel/${phaseId}`,
        {},
        { responseType: "blob" },
      );

      if (response.error) {
        toast.error(`Download failed: ${response.message}`);
      } else {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        // You can customize the filename based on phaseId if needed
        link.setAttribute("download", `Student_Profile_Phase_${phaseId}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        toast.success("Download started successfully");
      }
    } catch (err) {
      toast.error("Unexpected download error.");
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Added PDF Download Function
  const downloadPdf = async (phaseId, schoolId) => {
    setIsDownloading(true);
    try {
      const response = await callApi(
        "GET",
        `downloadMusterRoll/${phaseId}/${btoa(schoolId)}`,
        null,
        {
          responseType: "blob",
        },
      );

      if (response.error) {
        toast.error(`Download failed: ${response.message || "Server error"}`);
      } else {
        // Create the Blob specifically as a PDF
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
        toast.success("PDF download started successfully");
      }
    } catch (err) {
      console.error("❌ PDF download failed:", err);
      toast.error("Unexpected PDF download error.");
    } finally {
      setIsDownloading(false);
    }
  };

  return { downloadExcel, downloadPdf, isDownloading };
};
