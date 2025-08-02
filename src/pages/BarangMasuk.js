import React, { useState } from 'react';
import { Container, Table, Card, Form, Row, Col, Button } from 'react-bootstrap';

const dummyBarang = [
  { tanggal: '2025-07-29', asal: 'Pabrik', tujuan: 'Cideng', user: 'admin01', rol: 3, beratPerRol: 23.4 },
  { tanggal: '2025-07-29', asal: 'AA17', tujuan: 'A38', user: 'admin02', rol: 2, beratPerRol: 19.75 },
  { tanggal: '2025-07-28', asal: 'Pabrik', tujuan: 'AA17', user: 'admin03', rol: 4, beratPerRol: 21.0 },
];

const BarangMasuk = () => {
  const [tanggal, setTanggal] = useState('');
  const [show, setShow] = useState(false);

  const hasil = dummyBarang.filter((d) => d.tanggal === tanggal);

  return (
    <Container>
      <h2 className="mb-4">📦 Barang Masuk & Keluar</h2>
      <Card className="mb-3">
        <Card.Body>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Control
                  type="date"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                />
              </Col>
              <Col md={2}>
                <Button onClick={() => setShow(true)}>Lihat</Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {show && tanggal && (
        <Card>
          <Card.Body>
            <Card.Title>Laporan Barang Masuk/Keluar - {tanggal}</Card.Title>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Asal</th>
                  <th>Tujuan</th>
                  <th>User Input</th>
                  <th>Rol</th>
                  <th>Berat / Rol</th>
                  <th>Total Berat</th>
                </tr>
              </thead>
              <tbody>
                {hasil.map((d, i) => (
                  <tr key={i}>
                    <td>{d.tanggal}</td>
                    <td>{d.asal}</td>
                    <td>{d.tujuan}</td>
                    <td>{d.user}</td>
                    <td>{d.rol}</td>
                    <td>{d.beratPerRol.toFixed(2)} Kg</td>
                    <td>{(d.rol * d.beratPerRol).toFixed(2)} Kg</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default BarangMasuk;
