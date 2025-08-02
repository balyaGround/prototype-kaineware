import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { FaChartPie, FaReceipt, FaBoxes, FaWarehouse, FaExchangeAlt, FaUserClock, FaFileInvoice, FaUsers } from 'react-icons/fa';

const Sidebar = () => {
  const navStyle = ({ isActive }) =>
    `nav-link d-flex align-items-center mb-2 ${isActive ? "bg-primary text-white" : "text-light"} px-3 py-2 rounded`;

  return (
    <div className="bg-dark text-white p-3" style={{ minHeight: '100vh', width: '250px' }}>
      <h4 className="text-center mb-4">📦 KaineWare</h4>
      <Nav className="flex-column">

        <NavLink to="/dashboard/ringkasan" className={navStyle}>
          <FaChartPie className="me-2" /> Ringkasan Umum
        </NavLink>

        <NavLink to="/dashboard/penjualan" className={navStyle}>
          <FaReceipt className="me-2" /> Laporan Penjualan
        </NavLink>

        <NavLink to="/dashboard/barang-masuk" className={navStyle}>
          <FaBoxes className="me-2" /> Barang Masuk & Keluar
        </NavLink>

        <NavLink to="/dashboard/stok" className={navStyle}>
          <FaWarehouse className="me-2" /> Stok Real-Time
        </NavLink>

        <NavLink to="/dashboard/mutasi" className={navStyle}>
          <FaExchangeAlt className="me-2" /> Riwayat Mutasi
        </NavLink>

        <NavLink to="/dashboard/aktivitas" className={navStyle}>
          <FaUserClock className="me-2" /> Aktivitas User
        </NavLink>

        <NavLink to="/dashboard/nota" className={navStyle}>
          <FaFileInvoice className="me-2" /> Monitoring Nota
        </NavLink>

        <NavLink to="/dashboard/user" className={navStyle}>
          <FaUsers className="me-2" /> Manajemen User
        </NavLink>
        
      </Nav>
    </div>
  );
};

export default Sidebar;
