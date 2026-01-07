import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIdleTimer } from "react-idle-timer";
import { useContext } from "react";
import { TokenContext } from "../../ContextProvider/TokenContext";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import AdminFooter from "./AdminFooter";
import MsgDisplayModalInActive from "../../Components/MsgDisplayModalInActive";

function AdminAuthenticatedLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isOpenProfile, setOpenProfile] = useState(false);
  const navigate = useNavigate();
  const [showPrompt, setShowPrompt] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60); // 60 seconds countdown
  const countdownRef = useRef(null);
  const [menuData, setMenuData] = useState([]);
  // let menuData = { user: "", data: [] };

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

  // let data = [];
  let username;

  ///////////////////////////
  useEffect(() => {
    if (stake_cd === "cms") {
      username = location_name;

      const rawMenu = localStorage.getItem("cms_menu");
      if (!rawMenu) return; // Exit early if no menu yet

      try {
        const decodedMenu = atob(rawMenu);
        const parsedMenu = JSON.parse(decodedMenu);

        const transformedMenu = parsedMenu.map((item, index) => ({
          id: index,
          label: item.title,
          submenu: item.children.map((child) => ({
            label: child.title,
            to: `/${child.path}`,
          })),
        }));

        setMenuData(transformedMenu);
      } catch (err) {
        console.error("Error parsing cms_menu:", err);
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      const host = window.location.hostname;
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
        navigate("/LoginList");
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
          user={location_name}
          onLogout={handleLogout}
          onProfileToggle={() => setOpenProfile(!isOpenProfile)}
          isOpenProfile={isOpenProfile}
          onSidebarToggle={() => setSidebarOpen(!isSidebarOpen)}
        />

        <div className="flex flex-row w-full min-h-screen">
          <AdminSidebar
            location_name={location_name}
            data={menuData}
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
