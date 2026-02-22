// src/Pages/Dashboard.jsx
import { useEffect, useState } from "react";
import AdminAuthenticatedLayout from "../../../Layouts/AdminLayout/AdminAuthenticatedLayout"; // Adjust path as needed
import Loader from "../../../Components/Loader";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";
import { usePhaseStore } from "../../../Store/phaseStore";
import DashboardBlockChallan from "../DashboardGraph/DashboardBlockChallan";

const DashboardChallan = () => {
  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const phaseId = usePhaseStore((state) => state.phaseId);
  const user = JSON.parse(atob(localStorage.getItem("user")));
  const stake_cd = user.stake_cd;

  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [phaseId]);

  const fetchData = async () => {
    /////////////////////////////////////////////////////
    setLoading(true);
    try {
      const response = await callApi("GET", `dashboard`); // API call
      if (response.error) {
        console.log(JSON.stringify(response));
        toast(`Failed to fetch data: ${response.message}`);
      } else {
        console.log(JSON.stringify(response.data));
        setDashboardData(response.data);
      }
    } catch (err) {
      toast(`An unexpected error occurred: ${err}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
    ////////////////////////////////////////////////////
  };

  return (
    <>
      <AdminAuthenticatedLayout>
        <DashboardBlockChallan
          graphData={dashboardData}
          setLoading={setLoading}
        />
        {loading && <Loader />} {/* 👈 show the loader component */}
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

export default DashboardChallan;
