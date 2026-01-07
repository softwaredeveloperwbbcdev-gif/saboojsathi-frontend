// src/Pages/Dashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../ContextProvider/TokenContext"; // Adjust path if needed
import AdminAuthenticatedLayout from "../Layouts/AdminLayout/AdminAuthenticatedLayout"; // Adjust path as needed

const Dashboard = () => {
  const { token } = useContext(TokenContext); // Get token from context
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only make API call if token exists
    if (token) {
      const fetchData = async () => {
        try {
          const response = await fetch("http://127.0.0.1:8000/api/dashboard", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // ⬅️ Send token in headers
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch protected data");
          }

          const data = await response.json();
          setUserData(data);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchData();
    }
  }, [token]);

  return (
    // <div>
    //   <h2>Dashboard</h2>
    //   {error && <p style={{ color: 'red' }}>{error}</p>}
    //   {userData ? (
    //     <pre>{JSON.stringify(userData, null, 2)}</pre>
    //   ) : (
    //     <p>Loading data...</p>
    //   )}
    // </div>
    <AdminAuthenticatedLayout>
      <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
        Dashboard
      </h2>

      {/* Optional: page title */}
      <title>Dashboard</title>
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              You're logged in!
            </div>
          </div>
        </div>
      </div>
    </AdminAuthenticatedLayout>
  );
};

export default Dashboard;
