// src/pages/DashboardAdmin.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const DashboardAdmin = () => {
  return (
    <div >
      <Header />
      <div className="container my-4 " style={{ minHeight: "60vh" }}>
        <h4>Selamat Datang</h4>
        <div className="row">
          <div className="col-md-4 mb-3">
            <Card>
              <Card.Body>
                <Card.Title>Barang Dari Pabrik</Card.Title>
                <Card.Text>Tambah dan ubah data barang</Card.Text>
                <Link to="/manajemenBarang">
                  <Button variant="primary">Kelola</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-4 mb-3">
            <Card>
              <Card.Body>
                <Card.Title>Barang Masuk Dari Gudang Lain</Card.Title>
                <Card.Text>Catat barang yang masuk ke gudang</Card.Text>
                <Link to="/BarangMasukAdmin">
                  <Button variant="primary">Input</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-4 mb-3">
            <Card>
              <Card.Body>
                <Card.Title>Barang Keluar Dari Gudang</Card.Title>
                <Card.Text>Input pemindahan stok antar gudang</Card.Text>
                <Link to="/MutasigudangAdmin">
                  <Button variant="primary">Mutasi</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardAdmin;
