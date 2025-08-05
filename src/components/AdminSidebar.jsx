import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { FaHome, FaBoxes, FaArrowDown, FaExchangeAlt } from "react-icons/fa";

const AdminSidebar = () => {
  const navStyle = ({ isActive }) =>
    `nav-link d-flex align-items-center mb-2 ${
      isActive ? "bg-primary text-white" : "text-light hover-bg-secondary"
    } px-3 py-2 rounded text-decoration-none`;

  return (
    <div
      className="bg-dark text-white p-3"
      style={{ minHeight: "100vh", width: "250px" }}
    >
      {/* Logo */}
      <div className="text-center mb-4">
        <h4>📦 KaineWare</h4>
        <small className="text-muted">Admin Panel</small>
      </div>

      {/* Navigation */}
      <Nav className="flex-column">
        <NavLink to="/admin/dashboard" className={navStyle}>
          <FaHome className="me-2" /> Dashboard Admin
        </NavLink>

        <NavLink to="/admin/manajemen-barang" className={navStyle}>
          <FaBoxes className="me-2" /> Manajemen Barang
        </NavLink>

        <NavLink to="/admin/barang-masuk" className={navStyle}>
          <FaArrowDown className="me-2" /> Barang Masuk
        </NavLink>

        <NavLink to="/admin/mutasi-gudang" className={navStyle}>
          <FaExchangeAlt className="me-2" /> Mutasi Gudang
        </NavLink>
      </Nav>
    </div>
  );
};

export default AdminSidebar;
