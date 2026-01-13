import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useIdleTimer } from "react-idle-timer";
import { useContext } from "react";
import { TokenContext } from "../../ContextProvider/TokenContext";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import AdminFooter from "./AdminFooter";
import { getSchoolSideMenu } from "./SideMenus/SchoolSideMenu";
import { getSISideMenu } from "./SideMenus/SISideMenu";
import { getBlockSideMenu } from "./SideMenus/BlockSideMenu";
import { getDistrictSideMenu } from "./SideMenus/DistrictSideMenu";
import { getStateSideMenu } from "./SideMenus/StateSideMenu";
import MsgDisplayModalInActive from "../../Components/MsgDisplayModalInActive";

function AdminAuthenticatedLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isOpenProfile, setOpenProfile] = useState(false);
  const navigate = useNavigate();
  const [showPrompt, setShowPrompt] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60); // 60 seconds countdown
  const countdownRef = useRef(null);
  let menuData = { user: "", data: [] };

  //console.log(jwtDecode(tokenId));
  const handleOnIdle = () => {
    console.log("User is idle");
    clearInterval(countdownRef.current); // ✅ important
    // Final logout after countdown ends
    alert("⛔ You have been logged out due to inactivity.");
    localStorage.removeItem("token");
    navigate("/LoginList");
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

  const { logout } = useContext(TokenContext);
  const token = localStorage.getItem("token");
  const user = JSON.parse(atob(localStorage.getItem("user")));
  const stake_cd = user.stake_cd;
  const location_name = user.name;

  let data = [];
  let username;
  if (stake_cd == "0701") {
    menuData = getSchoolSideMenu();
    username = menuData.user;
    data = menuData.data;
  } else if (stake_cd == "0601") {
    menuData = getSISideMenu();
    username = menuData.user;
    data = menuData.data;
  } else if (stake_cd == "0501") {
    menuData = getBlockSideMenu();
    username = menuData.user;
    data = menuData.data;
  } else if (stake_cd == "0304") {
    menuData = getDistrictSideMenu();
    username = menuData.user;
    data = menuData.data;
  } else if (stake_cd == "0207" || stake_cd == "0208") {
    menuData = getStateSideMenu();
    username = menuData.user;
    data = menuData.data;
  }

  const handleLogout = async () => {
    try {
      const host = window.location.hostname;
      //const host = `192.168.0.192`;
      const response = await fetch(`http://${host}:8000/api/logout`, {
        method: "GET", // or "POST" depending on your API
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ⬅️ Send token in headers
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      console.log("API response:", data);
      if (data.status == "success") {
        logout();
        navigate("/Login");
      }

      // Do something with the data, e.g., update state or navigate
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };
  return (
    <>
      <section className="bg-gray-200 dark:bg-gray-600">
        <AdminHeader
          user={username}
          onLogout={handleLogout}
          onProfileToggle={() => setOpenProfile(!isOpenProfile)}
          isOpenProfile={isOpenProfile}
          onSidebarToggle={() => setSidebarOpen(!isSidebarOpen)}
        />

        <div className="flex flex-row w-full min-h-screen">
          <AdminSidebar
            location_name={location_name}
            data={data}
            isOpen={isSidebarOpen}
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
            <AdminFooter />
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminAuthenticatedLayout;
