// File: src/components/Dashboard.jsx
import { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form } from 'react-bootstrap';

const dummyProduk = [
  { kode: 'TLB-A01', jenis: 'TL B', warna: 'Abu', rol: 2, kg: 43.25, hargaRol: 450000, hargaKg: 10500 },
  { kode: 'TLB-H01', jenis: 'TL B', warna: 'Hitam', rol: 1, kg: 21.88, hargaRol: 430000, hargaKg: 10250 },
];

const dummyPenjualan = [
  { nota: 'CID001', rol: 2, kg: 43.25, total: 900000 },
  { nota: 'CID002', rol: 1, kg: 21.88, total: 430000 },
];

const dummyMutasi = [
  { tanggal: '2025-07-29', dari: 'Cideng', ke: 'AA17', barang: 'TLB-K01', rol: 1, kg: 22.33 },
  { tanggal: '2025-07-29', dari: 'AA17', ke: 'A38', barang: 'TLP-A03', rol: 2, kg: 42.56 },
];

const Dashboard = () => {
  const [selectedGudang, setSelectedGudang] = useState(null);
  const [selectedToko, setSelectedToko] = useState(null);
  const [showMutasi, setShowMutasi] = useState(false);
  const [tanggalMutasi, setTanggalMutasi] = useState('');

  return (
    <Container className="my-4">
      <h2 className="mb-4">Dashboard Owner</h2>

      {/* Header Ringkasan */}
      <Row className="mb-4">
        <Col md={4}><Card bg="primary" text="white" className="mb-3"><Card.Body><Card.Title>Total Stok</Card.Title><Card.Text>1200 Rol / 4100.35 Kg</Card.Text></Card.Body></Card></Col>
        <Col md={4}><Card bg="success" text="white" className="mb-3"><Card.Body><Card.Title>Penjualan Hari Ini</Card.Title><Card.Text>Rp 8.560.000</Card.Text></Card.Body></Card></Col>
        <Col md={4}><Card bg="warning" text="dark" className="mb-3"><Card.Body><Card.Title>Mutasi Hari Ini</Card.Title><Card.Text>32 Barang</Card.Text></Card.Body></Card></Col>
      </Row>

      {/* Grafik & Aktivitas */}
      <Row className="mb-4">
        <Col md={6}><Card><Card.Body><Card.Title>Grafik Penjualan Bulanan</Card.Title><div className="bg-light text-center py-5">[Grafik Placeholder]</div></Card.Body></Card></Col>
        <Col md={6}><Card><Card.Body><Card.Title>Aktivitas Terbaru</Card.Title><ul><li>+20 rol ke Gudang A38</li><li>-5 rol terjual Cideng</li><li>+12 kg ke AA17</li></ul></Card.Body></Card></Col>
      </Row>

      {/* Card Gudang */}
      <h5>Ringkasan Stok Gudang</h5>
      <Row className="mb-3">
        {['Cideng', 'AA17', 'A38'].map(g => (
          <Col md={4} key={g}><Card className="mb-3" onClick={() => setSelectedGudang(g)} style={{ cursor: 'pointer' }}><Card.Body><Card.Title>{g}</Card.Title><Card.Text>Click to view details</Card.Text></Card.Body></Card></Col>
        ))}
      </Row>

      {selectedGudang && (
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Detail Stok - {selectedGudang}</Card.Title>
            <Table striped bordered><thead><tr><th>Kode</th><th>Jenis</th><th>Warna</th><th>Rol</th><th>Kg</th><th>Harga/Rol</th><th>Harga/Kg</th><th>Total</th></tr></thead>
              <tbody>{dummyProduk.map((p, i) => (
                <tr key={i}>
                  <td>{p.kode}</td><td>{p.jenis}</td><td>{p.warna}</td><td>{p.rol}</td><td>{p.kg}</td><td>{p.hargaRol}</td><td>{p.hargaKg}</td><td>{(p.rol * p.hargaRol).toLocaleString()}</td>
                </tr>
              ))}</tbody></Table>
            <Button variant="secondary" onClick={() => setSelectedGudang(null)}>Tutup</Button>
          </Card.Body>
        </Card>
      )}

      {/* Card Penjualan */}
      <h5>Penjualan Hari Ini</h5>
      <Row className="mb-3">
        {['Cideng', 'AA17'].map(toko => (
          <Col md={6} key={toko}><Card className="mb-3" onClick={() => setSelectedToko(toko)} style={{ cursor: 'pointer' }}><Card.Body><Card.Title>{toko}</Card.Title><Card.Text>Click to view transaksi</Card.Text></Card.Body></Card></Col>
        ))}
      </Row>

      {selectedToko && (
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Transaksi - {selectedToko}</Card.Title>
            <Table striped bordered><thead><tr><th>Nota</th><th>Rol</th><th>Kg</th><th>Total</th></tr></thead>
              <tbody>{dummyPenjualan.map((p, i) => (
                <tr key={i}><td>{p.nota}</td><td>{p.rol}</td><td>{p.kg}</td><td>{p.total.toLocaleString()}</td></tr>
              ))}</tbody></Table>
            <Button variant="secondary" onClick={() => setSelectedToko(null)}>Tutup</Button>
          </Card.Body>
        </Card>
      )}

      {/* Mutasi Gudang */}
      <h5>Mutasi Gudang</h5>
      <Form className="mb-3">
        <Row>
          <Col md={4}><Form.Control type="date" value={tanggalMutasi} onChange={(e) => setTanggalMutasi(e.target.value)} /></Col>
          <Col md={2}><Button onClick={() => setShowMutasi(true)}>Lihat</Button></Col>
        </Row>
      </Form>

      {showMutasi && tanggalMutasi && (
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Data Mutasi - {tanggalMutasi}</Card.Title>
            <Table striped bordered><thead><tr><th>Tanggal</th><th>Dari</th><th>Ke</th><th>Barang</th><th>Rol</th><th>Kg</th></tr></thead>
              <tbody>{dummyMutasi.filter(m => m.tanggal === tanggalMutasi).map((m, i) => (
                <tr key={i}><td>{m.tanggal}</td><td>{m.dari}</td><td>{m.ke}</td><td>{m.barang}</td><td>{m.rol}</td><td>{m.kg}</td></tr>
              ))}</tbody></Table>
            <Button variant="secondary" onClick={() => setShowMutasi(false)}>Tutup</Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Dashboard;