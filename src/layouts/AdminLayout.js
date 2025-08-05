import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import Header from "../components/Header";

const AdminLayout = () => {
  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-grow-1 d-flex flex-column">
        <Header />

        {/* Content Area */}
        <main
          className="flex-grow-1 p-4"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-info text-white text-center py-2">
          © 2025 KaineWare • Dibuat dengan ❤️
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
