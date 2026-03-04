// src/Pages/Dashboard.jsx
import { useEffect, useState } from "react";
import AdminAuthenticatedLayout from "../../Layouts/AdminLayout/AdminAuthenticatedLayout"; // Adjust path as needed
import Loader from "../../Components/Loader";
import DashboardSchool from "../Admin/DashboardGraph/DashboardSchool";
import DashboardCircle from "../Admin/DashboardGraph/DashboardCircle";
import DashboardBlockProfile from "../Admin/DashboardGraph/DashboardBlockProfile";
import DashboardDistrict from "../Admin/DashboardGraph/DashboardDistrict";
import DashboardState from "../Admin/DashboardGraph/DashboardState";
import useApi from "../../Hooks/useApi";
import LogoutPopup from "../../Components/LogoutPopup";
import { toast } from "react-toastify";
import { usePhaseStore } from "../../Store/phaseStore";

const DASHBOARD_MAP = {
  "0701": DashboardSchool,
  "0601": DashboardCircle,
  "0501": DashboardBlockProfile,
  "0304": DashboardDistrict,
  "0207": DashboardState,
  "0208": DashboardState,
};

const Dashboard = () => {
  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const phaseId = usePhaseStore((state) => state.phaseId);
  const user = JSON.parse(atob(localStorage.getItem("user")));
  const stake_cd = user.stake_cd;

  const DashboardComponent = DASHBOARD_MAP[stake_cd];

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
        <DashboardComponent graphData={dashboardData} setLoading={setLoading} />
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

export default Dashboard;
