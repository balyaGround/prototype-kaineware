import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

// Halaman Login
import LoginPage from "./pages/LoginPage";

// Halaman Kasir
import Kasir from "./pages/Kasir";

// Halaman Dashboard admin
import DashboardAdmin from "./pages/Admin";

// Layout Dashboard
import DashboardLayout from "./layouts/DashboardLayout";

// Halaman dalam Dashboard Owner/Admin
import Ringkasan from "./pages/Ringkasan";
import Penjualan from "./pages/Penjualan";
import Stok from "./pages/Stok";
import BarangMasuk from "./pages/BarangMasuk";
import Mutasi from "./pages/Mutasi";
import Aktivitas from "./pages/Aktivitas";
import Nota from "./pages/Nota";
import User from "./pages/User";
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

          {/* Halaman dashboard admin*/}
          <Route path="/dashboardAdmin" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardAdmin />
            </ProtectedRoute>
            } 
          />
           <Route
              path="ManajemenBarang"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  < ManajemenBarang />
                </ProtectedRoute>
              }
            />
           <Route
              path="BarangMasukAdmin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <BarangMasukAdmin />
                </ProtectedRoute>
              }
            />
           <Route
              path="MutasigudangAdmin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <MutasiGudangAdmin />
                </ProtectedRoute>
              }
            />
          {/* Dashboard Layout untuk Owner & Admin */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["owner", "admin"]}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* Redirect default: /dashboard → /dashboard/ringkasan */}
            <Route index element={<Navigate to="ringkasan" replace />} />

            {/* Halaman Khusus Owner */}
            <Route
              path="ringkasan"
              element={
                <ProtectedRoute allowedRoles={["owner"]}>
                  <Ringkasan />
                </ProtectedRoute>
              }
            />
            <Route
              path="penjualan"
              element={
                <ProtectedRoute allowedRoles={["owner"]}>
                  <Penjualan />
                </ProtectedRoute>
              }
            />
            <Route
              path="stok"
              element={
                <ProtectedRoute allowedRoles={["owner"]}>
                  <Stok />
                </ProtectedRoute>
              }
            />
            <Route
              path="nota"
              element={
                <ProtectedRoute allowedRoles={["owner"]}>
                  <Nota />
                </ProtectedRoute>
              }
            />
            <Route
              path="user"
              element={
                <ProtectedRoute allowedRoles={["owner"]}>
                  <User />
                </ProtectedRoute>
              }
            />

            {/* Halaman Untuk Admin & Owner */}
            <Route
              path="barang-masuk"
              element={
                <ProtectedRoute allowedRoles={["admin", "owner"]}>
                  <BarangMasuk />
                </ProtectedRoute>
              }
            />
            <Route
              path="mutasi"
              element={
                <ProtectedRoute allowedRoles={["admin", "owner"]}>
                  <Mutasi />
                </ProtectedRoute>
              }
            />
            <Route
              path="aktivitas"
              element={
                <ProtectedRoute allowedRoles={["admin", "owner"]}>
                  <Aktivitas />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
