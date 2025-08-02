import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';

const dummyPenjualan = [
  { tanggal: '2025-07-29', gudang: 'Cideng', barang: 'TLB-K01', rol: 2, kg: 44.5, total: 2150000 },
  { tanggal: '2025-07-29', gudang: 'AA17', barang: 'TLP-A03', rol: 1, kg: 21.2, total: 1075000 },
  { tanggal: '2025-07-29', gudang: 'Cideng', barang: 'SJR-X01', rol: 3, kg: 60.0, total: 3100000 },
];

const Penjualan = () => {
  const [filter, setFilter] = useState('harian');
  const [tanggal, setTanggal] = useState('');
  const [gudang, setGudang] = useState('gabungan');

  const hasil = dummyPenjualan.filter((d) => {
    if (gudang !== 'gabungan' && d.gudang !== gudang) return false;
    if (tanggal && !d.tanggal.startsWith(tanggal)) return false;
    return true;
  });

  return (
    <Container>
      <h2 className="mb-4">🧾 Laporan Penjualan</h2>

      <Card className="mb-4">
        <Card.Body>
          <Form>
            <Row className="mb-2">
              <Col md={3}>
                <Form.Label>Filter Waktu</Form.Label>
                <Form.Select value={filter} onChange={(e) => setFilter(e.target.value)}>
                  <option value="harian">Harian</option>
                  <option value="bulanan">Bulanan</option>
                  <option value="tahunan">Tahunan</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Label>
                  {filter === 'harian' ? 'Pilih Tanggal' : filter === 'bulanan' ? 'Pilih Bulan' : 'Pilih Tahun'}
                </Form.Label>
                <Form.Control
                  type={filter === 'tahunan' ? 'number' : 'date'}
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                />
              </Col>
              <Col md={3}>
                <Form.Label>Gudang</Form.Label>
                <Form.Select value={gudang} onChange={(e) => setGudang(e.target.value)}>
                  <option value="gabungan">Gabungan</option>
                  <option value="Cideng">Cideng</option>
                  <option value="AA17">AA17</option>
                </Form.Select>
              </Col>
              <Col md={3} className="d-flex align-items-end">
                <div className="d-flex gap-2">
                  <Button variant="outline-success">Export Excel</Button>
                  <Button variant="outline-danger">Export PDF</Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Grafik Penjualan</Card.Title>
              <div className="bg-light text-center py-5">[Grafik Placeholder]</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Rangkuman</Card.Title>
              <ul>
                <li>Total Transaksi: {hasil.length}</li>
                <li>Total Omzet: Rp {hasil.reduce((a, b) => a + b.total, 0).toLocaleString()}</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card>
        <Card.Body>
          <Card.Title>Data Penjualan</Card.Title>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Gudang</th>
                <th>Barang</th>
                <th>Rol</th>
                <th>Kg</th>
                <th>Total (Rp)</th>
              </tr>
            </thead>
            <tbody>
              {hasil.map((d, i) => (
                <tr key={i}>
                  <td>{d.tanggal}</td>
                  <td>{d.gudang}</td>
                  <td>{d.barang}</td>
                  <td>{d.rol}</td>
                  <td>{d.kg}</td>
                  <td>{d.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Penjualan;
