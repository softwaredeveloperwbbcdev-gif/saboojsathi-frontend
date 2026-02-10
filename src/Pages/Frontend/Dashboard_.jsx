// src/Pages/Dashboard.jsx
import AdminAuthenticatedLayout from "../../Layouts/AdminLayout/Old/AdminAuthenticatedLayoutCopy"; // Adjust path as needed

const Dashboard = () => {
  const user = JSON.parse(atob(localStorage.getItem("user")));
  return (
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
              You're logged in as {user.name}
            </div>
          </div>
        </div>
      </div>
    </AdminAuthenticatedLayout>
  );
};

export default Dashboard;
