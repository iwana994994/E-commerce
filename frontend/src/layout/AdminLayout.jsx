import { Outlet } from "react-router-dom";
import AdminNavbarHorizontal from "../pages/components/AdminDashboardComponents/AdminNavbarHorizontal";
import AdminNavbar from "../pages/components/AdminDashboardComponents/AdminNavbarVertical";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* LEFT SIDEBAR */}
      <AdminNavbar />

      {/* RIGHT CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* TOP BAR */}
        <AdminNavbarHorizontal />

        {/* PAGE CONTENT */}
        <div className="p-6 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
