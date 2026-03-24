import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useIdleTimer } from "react-idle-timer";
import { useContext } from "react";
import { TokenContext } from "../../ContextProvider/TokenContext";
import AdminSidebar from "./AdminSidebar";
import { getSchoolSideMenu } from "./SideMenus/SchoolSideMenu";
import { getSISideMenu } from "./SideMenus/SISideMenu";
import { getBlockSideMenu } from "./SideMenus/BlockSideMenu";
import { getDistrictSideMenu } from "./SideMenus/DistrictSideMenu";
import { getStateSideMenu } from "./SideMenus/StateSideMenu";
import MsgDisplayModalInActive from "../../Components/MsgDisplayModalInActive";
import useApi from "../../Hooks/useApi";
import { toast } from "react-toastify";

const MENU_MAP = {
  "0701": getSchoolSideMenu,
  "0601": getSISideMenu,
  "0501": getBlockSideMenu,
  "0304": getDistrictSideMenu,
  "0207": getStateSideMenu,
  "0208": getStateSideMenu,
};

function AdminAuthenticatedLayout({ children }) {
  const { callApi } = useApi();
  const navigate = useNavigate();
  const [showPrompt, setShowPrompt] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60); // 60 seconds countdown
  const countdownRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const { logout } = useContext(TokenContext);
  const token = localStorage.getItem("token");
  const user = JSON.parse(atob(localStorage.getItem("user")));
  const stake_cd = user.stake_cd;
  const location_name = user.name;

  const menuFn = MENU_MAP[stake_cd];
  const menuData = menuFn ? menuFn() : { user: "Guest", data: [] };

  const handleOnIdle = () => {
    clearInterval(countdownRef.current);
    alert("⛔ You have been logged out due to inactivity.");
    localStorage.removeItem("token");
    navigate("/Login");
  };

  const handleOnPrompt = () => {
    console.log("User is about to be idle (onPrompt)");
    setShowPrompt(true);
    let timeLeft = 60;

    countdownRef.current = setInterval(() => {
      timeLeft--;
      setRemainingTime(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(countdownRef.current);
        handleOnIdle(); // Logout
      }
    }, 1000);
  };

  const handleOnActive = () => {
    console.log("User became active again");
    // If user becomes active during warning, cancel logout
    if (showPrompt) {
      clearInterval(countdownRef.current);
      setShowPrompt(false);
      setRemainingTime(60);
      idleTimer.reset(); // ✅ Reset idle timer manually
    }
  };

  const idleTimer = useIdleTimer({
    // timeout: 1000 * 60 * 30, // 30 minutes
    timeout: 1000 * 60 * 90, // 30 minutes
    promptBeforeIdle: 1000 * 60, // 1 minute warning
    onPrompt: handleOnPrompt,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    debounce: 500,
  });

  const handleLogout = async () => {
    setLoading(true);
    try {
      const host = window.location.hostname;
      const response = await callApi("GET", `http://${host}:8000/api/logout`);

      if (response.error) {
        console.log("Logout Error Details:", JSON.stringify(response));
        toast.error(`Logout failed: ${response.message}`);
      } else {
        console.log("Logout Success:", JSON.stringify(response));
        logout();
        navigate("/Login");
        toast.success("Logged out successfully");
      }
    } catch (err) {
      toast.error(`An unexpected error occurred: ${err.message}`);
      console.error("Critical Logout Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-gray-200 dark:bg-gray-600">
        <div className="flex flex-row w-full min-h-screen">
          <AdminSidebar
            menuData={menuData.data}
            username={menuData.user}
            location_name={location_name}
            onLogout={handleLogout}
          />
          <div className="w-full min-h-screen flex flex-col">
            <div className="flex-grow">
              {showPrompt ? (
                <MsgDisplayModalInActive
                  remainingTime={remainingTime}
                  onStayActive={handleOnActive}
                />
              ) : (
                children
              )}
            </div>
            {/* <AdminFooter /> */}
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminAuthenticatedLayout;
