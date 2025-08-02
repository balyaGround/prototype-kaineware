import React, { useState } from 'react';
import { Container, Card, Form, Row, Col, Button, Table } from 'react-bootstrap';

const dummyNota = {
  'INV-20250729-001': {
    tanggal: '2025-07-29',
    user: 'kasir01',
    gudang: 'Cideng',
    barang: [
      { nama: 'Kain TLB-K01', rol: 2, berat: 45.0, harga: 2100000 },
      { nama: 'Kain SJR-X01', rol: 1, berat: 21.5, harga: 1050000 }
    ]
  }
};

const Nota = () => {
  const [kode, setKode] = useState('');
  const [cari, setCari] = useState('');
  const nota = dummyNota[cari];

  return (
    <Container>
      <h2 className="mb-4">🧾 Monitoring Nota</h2>

      <Card className="mb-4">
        <Card.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Control
                  placeholder="Masukkan nomor nota (cth: INV-20250729-001)"
                  value={kode}
                  onChange={(e) => setKode(e.target.value)}
                />
              </Col>
              <Col md={2}>
                <Button onClick={() => setCari(kode)}>Cari</Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {nota ? (
        <Card>
          <Card.Body>
            <Card.Title>Detail Nota: {cari}</Card.Title>
            <p><strong>Tanggal:</strong> {nota.tanggal}</p>
            <p><strong>User:</strong> {nota.user}</p>
            <p><strong>Gudang:</strong> {nota.gudang}</p>

            <Table striped bordered>
              <thead>
                <tr>
                  <th>Barang</th>
                  <th>Rol</th>
                  <th>Berat</th>
                  <th>Total Harga</th>
                </tr>
              </thead>
              <tbody>
                {nota.barang.map((b, i) => (
                  <tr key={i}>
                    <td>{b.nama}</td>
                    <td>{b.rol}</td>
                    <td>{b.berat.toFixed(2)} Kg</td>
                    <td>Rp {b.harga.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="d-flex justify-content-end">
              <Button variant="secondary">🖨️ Print Ulang</Button>
            </div>
          </Card.Body>
        </Card>
      ) : cari !== '' ? (
        <p className="text-danger">Nota tidak ditemukan.</p>
      ) : null}
    </Container>
  );
};

export default Nota;
