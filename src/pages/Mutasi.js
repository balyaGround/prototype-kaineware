import React, { useState } from 'react';
import { Container, Table, Card, Form, Row, Col, Button } from 'react-bootstrap';

const dummyMutasi = [
  {
    tanggal: '2025-07-29',
    waktu: '2025-07-29 09:45',
    barang: 'TLB-K01',
    dari: 'Cideng',
    ke: 'AA17',
    rol: 2,
    beratPerRol: 22.5,
    pengirim: 'admin01',
    penerima: 'admin02'
  },
  {
    tanggal: '2025-07-29',
    waktu: '2025-07-29 11:10',
    barang: 'TLP-A03',
    dari: 'AA17',
    ke: 'A38',
    rol: 3,
    beratPerRol: 20.3,
    pengirim: 'admin02',
    penerima: 'admin03'
  },
];

const Mutasi = () => {
  const [tanggal, setTanggal] = useState('');
  const [show, setShow] = useState(false);

  const hasil = dummyMutasi.filter((d) => d.tanggal === tanggal);

  return (
    <Container>
      <h2 className="mb-4">🔄 Riwayat Mutasi Barang</h2>

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

      {show && hasil.length > 0 && (
        <Card>
          <Card.Body>
            <Card.Title>Riwayat Mutasi - {tanggal}</Card.Title>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Waktu</th>
                  <th>Barang</th>
                  <th>Dari</th>
                  <th>Ke</th>
                  <th>Pengirim</th>
                  <th>Penerima</th>
                  <th>Rol</th>
                  <th>Berat / Rol</th>
                  <th>Total Berat</th>
                </tr>
              </thead>
              <tbody>
                {hasil.map((d, i) => (
                  <tr key={i}>
                    <td>{d.waktu}</td>
                    <td>{d.barang}</td>
                    <td>{d.dari}</td>
                    <td>{d.ke}</td>
                    <td>{d.pengirim}</td>
                    <td>{d.penerima}</td>
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

      {show && hasil.length === 0 && (
        <p className="text-muted">Tidak ada data mutasi untuk tanggal ini.</p>
      )}
    </Container>
  );
};

export default Mutasi;
