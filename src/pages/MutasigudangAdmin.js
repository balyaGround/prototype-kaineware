// src/pages/MutasiGudang.jsx
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Form, Button, Table } from "react-bootstrap";

const dummyBarang = [
  { kode: "TLB-K01", nama: "Kain Tebal" },
  { kode: "SJR-X01", nama: "Sutra Jepang" },
];

const gudangList = ["Cideng", "AA17", "A38"];

const MutasiGudangAdmin = () => {
  const [mutasiList, setMutasiList] = useState([]);
  const [form, setForm] = useState({
    kode: "",
    dari: "",
    ke: "",
    jumlahRol: "",
    beratPerRol: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const barang = dummyBarang.find(b => b.kode === form.kode);
    if (!barang || form.dari === form.ke) return alert("Data tidak valid");

    const totalBerat = Number(form.jumlahRol) * Number(form.beratPerRol);
    const dataBaru = {
      ...form,
      nama: barang.nama,
      totalBerat: totalBerat.toFixed(2),
      waktu: new Date().toLocaleString(),
    };
    setMutasiList([...mutasiList, dataBaru]);
    setForm({ kode: "", dari: "", ke: "", jumlahRol: "", beratPerRol: "" });
  };

  return (
    <div>
      <Header />
      <div className="container my-4" style={{ minHeight: "60vh" }}>
        <h4>Mutasi Gudang</h4>

        <div className="row mb-3">
          <div className="col-md-2">
            <Form.Label>Kode Barang</Form.Label>
            <Form.Select name="kode" value={form.kode} onChange={handleChange}>
              <option value="">Pilih</option>
              {dummyBarang.map((b) => (
                <option key={b.kode} value={b.kode}>{b.kode} - {b.nama}</option>
              ))}
            </Form.Select>
          </div>
          <div className="col-md-2">
            <Form.Label>Gudang Asal</Form.Label>
            <Form.Select name="dari" value={form.dari} onChange={handleChange}>
              <option value="">Pilih</option>
              {gudangList.map((g) => <option key={g}>{g}</option>)}
            </Form.Select>
          </div>
          <div className="col-md-2">
            <Form.Label>Gudang Tujuan</Form.Label>
            <Form.Select name="ke" value={form.ke} onChange={handleChange}>
              <option value="">Pilih</option>
              {gudangList.map((g) => <option key={g}>{g}</option>)}
            </Form.Select>
          </div>
          <div className="col-md-2">
            <Form.Label>Jumlah Rol</Form.Label>
            <Form.Control name="jumlahRol" type="number" value={form.jumlahRol} onChange={handleChange} />
          </div>
          <div className="col-md-2">
            <Form.Label>Berat per Rol</Form.Label>
            <Form.Control name="beratPerRol" type="number" step="0.01" value={form.beratPerRol} onChange={handleChange} />
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <Button onClick={handleSubmit}>Simpan</Button>
          </div>
        </div>

        <h5>Riwayat Mutasi</h5>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Waktu</th>
              <th>Kode</th>
              <th>Nama</th>
              <th>Dari</th>
              <th>Ke</th>
              <th>Jumlah Rol</th>
              <th>Total Berat (kg)</th>
            </tr>
          </thead>
          <tbody>
            {mutasiList.map((m, i) => (
              <tr key={i}>
                <td>{m.waktu}</td>
                <td>{m.kode}</td>
                <td>{m.nama}</td>
                <td>{m.dari}</td>
                <td>{m.ke}</td>
                <td>{m.jumlahRol}</td>
                <td>{m.totalBerat}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Footer />
    </div>
  );
};

export default MutasiGudangAdmin;
