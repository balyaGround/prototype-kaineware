import React, { useState } from 'react';
import { Container, Table, Card, Form } from 'react-bootstrap';

const dummyLog = [
  { waktu: '2025-07-29 09:00', user: 'admin01', aksi: 'Login ke sistem' },
  { waktu: '2025-07-29 10:15', user: 'kasir01', aksi: 'Input Penjualan di Cideng' },
  { waktu: '2025-07-28 16:00', user: 'admin02', aksi: 'Mutasi barang dari AA17 ke A38' },
];

const Aktivitas = () => {
  const [tanggal, setTanggal] = useState('');

  const filtered = tanggal
    ? dummyLog.filter((log) => log.waktu.startsWith(tanggal))
    : dummyLog;

  return (
    <Container>
      <h2 className="mb-4">👥 Aktivitas User</h2>
      <Card className="mb-3">
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label>Filter Tanggal</Form.Label>
              <Form.Control
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title>Log Aktivitas</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Waktu</th>
                <th>User</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log, i) => (
                <tr key={i}>
                  <td>{log.waktu}</td>
                  <td>{log.user}</td>
                  <td>{log.aksi}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Aktivitas;
