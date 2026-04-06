import { useState, useEffect } from "react";
import LoginBg from "../../assets/images/login_bg.jpg";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader";
import axios from "axios";

function LoginList() {
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(null);
  const [loginLevels, setLoginLevels] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const host = window.location.hostname;
      const response = await axios.get(`http://${host}:8000/api/login_list`); // API call

      //console.log(response.data);
      if (response.error) {
        // console.log(JSON.stringify(response));
        toast(`Failed to fetch data:`);
      } else {
        // console.log(response.data);
        setLoginLevels(response.data);
      }
    } catch (err) {
      toast(`An unexpected error occurred: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const putActive = (userIndex) => {
    setActive(active === userIndex ? null : userIndex);
  };

  return (
    <div
      className="absolute w-full h-full bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      <div className="md:absolute relative md:top-1/4 md:right-[10%] mx-auto mt-9 bg-white dark:bg-gray-800 w-[27.5rem] shadow-2xl rounded py-11 px-9">
        <div className="py-6 text-center">
          <div className="w-[360px]">
            {/* Text container */}
            <div className="text-center font-sans text-green-600 dark:text-green-500">
              {/* Large text */}
              <div className="text-5xl font-semibold tracking-widest mb-1">
                SABOOJSATHI
              </div>

              {/* Smaller text */}
              <div className="text-xl font-sans font-bold tracking-wide text-black dark:text-gray-300">
                Government of West Bengal
              </div>
            </div>
          </div>
        </div>
        {loginLevels.map(({ userIndex, user, user_details }) => (
          <div key={userIndex}>
            <a
              onClick={() => putActive(userIndex)}
              className="block py-3 px-2 border-l-4 border-yellow-600  dark:border-yellow-500 w-full bg-gray-300 dark:bg-gray-600 my-1 cursor-pointer text-black dark:text-white"
            >
              {user}
              <span className="inline float-right pt-1">
                <FaPlus />
              </span>
            </a>

            <div
              className={`mt-[-0.25rem] p-2 border border-gray-300 text-black dark:text-white ${
                active === userIndex ? "" : "hidden"
              }`}
            >
              {user_details.map(({ stake_cd, ref_name }) => (
                <Link
                  key={stake_cd}
                  className="block my-2 ml-1"
                  to={`/login/input?stake_cd=${stake_cd}&stake_name=${encodeURIComponent(
                    ref_name
                  )}`}
                >
                  {ref_name}
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div className="mt-6 text-center">
          <Link
            to="/cms"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            CMS Login
          </Link>
        </div>
        {loading && <Loader />} {/* 👈 show the loader component */}
      </div>
    </div>
  );
}

export default LoginList;
