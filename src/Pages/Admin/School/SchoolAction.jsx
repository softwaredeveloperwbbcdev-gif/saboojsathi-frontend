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

  return { downloadExcel, isDownloading };
};
