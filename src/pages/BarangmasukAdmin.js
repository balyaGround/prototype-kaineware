import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, Form, Table } from "react-bootstrap";

const BarangMasukAdmin = () => {
  const [form, setForm] = useState({
    tanggal: "",
    kodeBarang: "",
    namaBarang: "",
    jumlahRol: "",
    beratPerRol: "",
    gudangAsal: "",
  });

  const [data, setData] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSimpan = () => {
    if (!form.kodeBarang || !form.namaBarang) return alert("Kode & Nama wajib diisi");
    setData([...data, { ...form }]);
    setForm({
      tanggal: "",
      kodeBarang: "",
      namaBarang: "",
      jumlahRol: "",
      beratPerRol: "",
      gudangAsal: "",
    });
  };

  return (
    <div>
      <Header />
      <div className="container my-4" style={{ minHeight: "60vh" }}>
        <h4>Input Barang Masuk</h4>

        <div className="row mb-3">
          <div className="col-md-2">
            <Form.Label>Tanggal</Form.Label>
            <Form.Control
              type="date"
              name="tanggal"
              value={form.tanggal}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <Form.Label>Kode Barang</Form.Label>
            <Form.Control
              name="kodeBarang"
              value={form.kodeBarang}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <Form.Label>Nama Barang</Form.Label>
            <Form.Control
              name="namaBarang"
              value={form.namaBarang}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <Form.Label>Jumlah Rol</Form.Label>
            <Form.Control
              type="number"
              name="jumlahRol"
              value={form.jumlahRol}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <Form.Label>Berat per Rol (kg)</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="beratPerRol"
              value={form.beratPerRol}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <Form.Label>Gudang Asal</Form.Label>
            <Form.Select
              name="gudangAsal"
              value={form.gudangAsal}
              onChange={handleChange}
            >
              <option value="">Pilih</option>
              <option value="Cideng">Cideng</option>
              <option value="AA17">AA17</option>
              <option value="A38">A38</option>
            </Form.Select>
          </div>
        </div>

        <Button onClick={handleSimpan}>Simpan</Button>

        <h5 className="mt-4">Riwayat Barang Masuk</h5>
        <Table striped bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Tanggal</th>
              <th>Kode</th>
              <th>Nama</th>
              <th>Jumlah Rol</th>
              <th>Berat/Rol</th>
              <th>Total Berat</th>
              <th>Gudang</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{item.tanggal}</td>
                <td>{item.kodeBarang}</td>
                <td>{item.namaBarang}</td>
                <td>{item.jumlahRol}</td>
                <td>{item.beratPerRol}</td>
                <td>{(item.jumlahRol * item.beratPerRol).toFixed(2)}</td>
                <td>{item.gudangAsal}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Footer />
    </div>
  );
};

export default BarangMasukAdmin;
