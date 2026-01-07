// src/Pages/Dashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import AdminAuthenticatedLayout from "../../../Layouts/CmsLayout/AdminAuthenticatedLayout";
import { useNavigate } from "react-router-dom";
import useApi from "../../../Hooks/useApi";
import LogoutPopup from "../../../Components/LogoutPopup";
import { toast } from "react-toastify";

import Loader from "../../../Components/Loader";

const CmsDashboard = () => {
  const { callApi, showPopup, popupMessage, handleLogout, setShowPopup } =
    useApi();

  const [loading, setLoading] = useState(false);
  const [backEndErr, setBackEndErr] = useState("");

  return (
    <AdminAuthenticatedLayout>
      <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
        Cms Dashboard
      </h2>

      {/* Optional: page title */}
      <title>CMS Dashboard</title>
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {loading && <Loader />} {/* 👈 show the loader component */}
          {backEndErr}
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

export default CmsDashboard;
