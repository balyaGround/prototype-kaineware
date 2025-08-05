import { useState } from "react";
import { Container, Card, Row, Col, Table } from "react-bootstrap";

const dummyStok = {
  Cideng: [
    {
      nama: "Kain TLB-K01",
      kode: "TLB-K01",
      rol: 3,
      beratTotal: 66.9,
      hargaRol: 1050000,
      hargaKg: 47500,
    },
    {
      nama: "Kain SJR-X01",
      kode: "SJR-X01",
      rol: 2,
      beratTotal: 43.2,
      hargaRol: 950000,
      hargaKg: 49000,
    },
  ],
  AA17: [
    {
      nama: "Kain TLP-A03",
      kode: "TLP-A03",
      rol: 4,
      beratTotal: 84.5,
      hargaRol: 1100000,
      hargaKg: 50000,
    },
  ],
  A38: [
    {
      nama: "Kain MLG-B02",
      kode: "MLG-B02",
      rol: 1,
      beratTotal: 22.0,
      hargaRol: 990000,
      hargaKg: 46000,
    },
  ],
};

const Stok = () => {
  const [gudang, setGudang] = useState("");

  const renderTabel = () => {
    const stok = dummyStok[gudang] || [];
    return (
      <Card className="mt-4">
        <Card.Body>
          <Card.Title>Stok Barang - {gudang}</Card.Title>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Nama Barang</th>
                <th>Kode</th>
                <th>Jumlah Rol</th>
                <th>Total Berat (kg)</th>
                <th>Harga per Rol</th>
                <th>Harga per Kg</th>
                <th>Total Nilai Stok</th>
              </tr>
            </thead>
            <tbody>
              {stok.map((item, i) => (
                <tr key={i}>
                  <td>{item.nama}</td>
                  <td>{item.kode}</td>
                  <td>{item.rol}</td>
                  <td>{item.beratTotal.toFixed(2)} kg</td>
                  <td>Rp {item.hargaRol.toLocaleString()}</td>
                  <td>Rp {item.hargaKg.toLocaleString()}</td>
                  <td>Rp {(item.rol * item.hargaRol).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container>
      <h2 className="mb-4">📊 Stok Gudang Real-Time</h2>
      <Row className="mb-3">
        {Object.keys(dummyStok).map((nama, i) => (
          <Col md={4} key={i}>
            <Card
              onClick={() => setGudang(nama)}
              className="cursor-pointer"
              style={{ cursor: "pointer" }}
            >
              <Card.Body>
                <Card.Title>{nama}</Card.Title>
                <Card.Text>Cek sisa stok barang di gudang {nama}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {gudang && renderTabel()}
    </Container>
  );
};

export default Stok;
