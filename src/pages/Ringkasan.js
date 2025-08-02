import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Ringkasan = () => {
  return (
    <Container>
      <h2 className="mb-4">📊 Ringkasan Umum</h2>

      {/* Ringkasan Box */}
      <Row className="mb-4">
        <Col md={4}>
          <Card bg="primary" text="white" className="mb-3">
            <Card.Body>
              <Card.Title>Total Stok</Card.Title>
              <Card.Text>1200 Rol / 4120.35 Kg</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card bg="success" text="white" className="mb-3">
            <Card.Body>
              <Card.Title>Penjualan Hari Ini</Card.Title>
              <Card.Text>Rp 8.560.000</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card bg="warning" text="dark" className="mb-3">
            <Card.Body>
              <Card.Title>Mutasi Hari Ini</Card.Title>
              <Card.Text>32 Barang</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Grafik dan Aktivitas */}
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Grafik Penjualan Bulanan</Card.Title>
              <div className="bg-light text-center py-5">[Grafik Placeholder]</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Aktivitas Terbaru</Card.Title>
              <ul>
                <li>+20 rol ke Gudang A38</li>
                <li>-5 rol terjual Cideng</li>
                <li>+12 kg ke AA17</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Ringkasan;
