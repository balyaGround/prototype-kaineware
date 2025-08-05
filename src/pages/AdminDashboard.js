import { Link } from "react-router-dom";
import { Card, Row, Col, Button } from "react-bootstrap";
import { FaBoxes, FaArrowDown, FaExchangeAlt } from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div>
      <h2 className="mb-4">Selamat Datang</h2>

      <Row>
        {/* Card Manajemen Barang */}
        <Col md={4} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <div className="text-center mb-3">
                <FaBoxes size={48} className="text-primary mb-2" />
                <Card.Title>Barang Dari Pabrik</Card.Title>
              </div>
              <Card.Text className="text-muted text-center flex-grow-1">
                Tambah dan ubah data barang
              </Card.Text>
              <div className="text-center">
                <Button
                  as={Link}
                  to="/admin/manajemen-barang"
                  variant="primary"
                  className="px-4"
                >
                  Kelola
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Card Barang Masuk */}
        <Col md={4} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <div className="text-center mb-3">
                <FaArrowDown size={48} className="text-success mb-2" />
                <Card.Title>Barang Masuk Dari Gudang Lain</Card.Title>
              </div>
              <Card.Text className="text-muted text-center flex-grow-1">
                Catat barang yang masuk ke gudang
              </Card.Text>
              <div className="text-center">
                <Button
                  as={Link}
                  to="/admin/barang-masuk"
                  variant="primary"
                  className="px-4"
                >
                  Input
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Card Mutasi Gudang */}
        <Col md={4} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <div className="text-center mb-3">
                <FaExchangeAlt size={48} className="text-warning mb-2" />
                <Card.Title>Barang Keluar Dari Gudang</Card.Title>
              </div>
              <Card.Text className="text-muted text-center flex-grow-1">
                Input pemindahan stok antar gudang
              </Card.Text>
              <div className="text-center">
                <Button
                  as={Link}
                  to="/admin/mutasi-gudang"
                  variant="primary"
                  className="px-4"
                >
                  Mutasi
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Stats atau informasi tambahan bisa ditambahkan di sini */}
      <Row className="mt-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Aktivitas Terbaru</Card.Title>
              <ul className="list-unstyled mb-0">
                <li className="mb-2">• Barang TLB-K01 berhasil ditambahkan</li>
                <li className="mb-2">• Input barang masuk dari Gudang A38</li>
                <li>• Mutasi 25 kg ke Gudang B12</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
