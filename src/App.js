import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

// Halaman Login
import LoginPage from "./pages/LoginPage";

// Halaman Kasir
import Kasir from "./pages/Kasir";

// Layout Dashboard
import DashboardLayout from "./layouts/DashboardLayout";
import AdminLayout from "./layouts/AdminLayout";
// Halaman dalam Dashboard Owner
import Ringkasan from "./pages/Ringkasan";
import Penjualan from "./pages/Penjualan";
import Stok from "./pages/Stok";
import BarangMasuk from "./pages/BarangMasuk";
import Mutasi from "./pages/Mutasi";
import Aktivitas from "./pages/Aktivitas";
import Nota from "./pages/Nota";
import User from "./pages/User";

// Halaman Admin
import DashboardAdmin from "./pages/AdminDashboard";
import ManajemenBarang from "./pages/ManajemenBarang";
import BarangMasukAdmin from "./pages/BarangmasukAdmin";
import MutasiGudangAdmin from "./pages/MutasigudangAdmin";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Login Page */}
          <Route path="/" element={<LoginPage />} />

          {/* Halaman Kasir (Akses untuk role: kasir) */}
          <Route
            path="/kasir"
            element={
              <ProtectedRoute allowedRoles={["kasir"]}>
                <Kasir />
              </ProtectedRoute>
            }
          />

          {/* Admin Layout dengan Sidebar */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* Redirect default: /admin → /admin/dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />

            <Route path="dashboard" element={<DashboardAdmin />} />
            <Route path="manajemen-barang" element={<ManajemenBarang />} />
            <Route path="barang-masuk" element={<BarangMasukAdmin />} />
            <Route path="mutasi-gudang" element={<MutasiGudangAdmin />} />
          </Route>

          {/* Dashboard Layout untuk Owner */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["owner"]}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* Redirect default: /dashboard → /dashboard/ringkasan */}
            <Route index element={<Navigate to="ringkasan" replace />} />

            {/* Halaman Khusus Owner */}
            <Route path="ringkasan" element={<Ringkasan />} />
            <Route path="penjualan" element={<Penjualan />} />
            <Route path="stok" element={<Stok />} />
            <Route path="nota" element={<Nota />} />
            <Route path="user" element={<User />} />

            {/* Halaman Untuk Admin & Owner - sekarang hanya untuk Owner */}
            <Route path="barang-masuk" element={<BarangMasuk />} />
            <Route path="mutasi" element={<Mutasi />} />
            <Route path="aktivitas" element={<Aktivitas />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
