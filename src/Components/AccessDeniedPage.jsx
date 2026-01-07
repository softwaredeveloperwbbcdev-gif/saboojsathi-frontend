import { Link } from "react-router-dom";
import AdminAuthenticatedLayout from "../Layouts/AdminLayout/AdminAuthenticatedLayout";
const AccessDeniedPage = () => {
  return (
    <>
      <AdminAuthenticatedLayout>
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h1>🚫 Access Denied</h1>
          <p>
            You do not have the necessary permissions to view this page. Please
            contact your administrator or log in with an authorized account.
          </p>

          {/* Optional: Provide a way back */}
          <Link
            to="/"
            style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
            }}
          >
            Go to Homepage
          </Link>
        </div>
      </AdminAuthenticatedLayout>
    </>
  );
};

export default AccessDeniedPage;
