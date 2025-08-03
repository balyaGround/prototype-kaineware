import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Form, Button, Table } from "react-bootstrap";

const BarangMasukAdmin = () => {
  const [dataMasuk, setDataMasuk] = useState([]);
  const [form, setForm] = useState({
    tanggal: "",
    gudang: "",
    kodeBarang: "",
    namaBarang: "",
    beratPerRoll: [""],
  });

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBeratChange = (index, value) => {
    const updatedBerat = [...form.beratPerRoll];
    updatedBerat[index] = value;
    setForm({ ...form, beratPerRoll: updatedBerat });
  };

  const handleAddBerat = () => {
    setForm({ ...form, beratPerRoll: [...form.beratPerRoll, ""] });
  };

  const handleSubmit = () => {
    if (!form.kodeBarang || !form.tanggal || !form.gudang) {
      alert("Harap lengkapi semua field wajib.");
      return;
    }

    // Validasi hanya berat yang bukan kosong & angka
    const beratValid = form.beratPerRoll.filter(
      (b) => b !== "" && !isNaN(parseFloat(b))
    );

    const totalBerat = beratValid.reduce((sum, b) => sum + parseFloat(b), 0);

    setDataMasuk([
      ...dataMasuk,
      {
        ...form,
        beratPerRoll: beratValid,
        jumlahRoll: beratValid.length,
        totalBerat: totalBerat.toFixed(2),
      },
    ]);

    setForm({
      tanggal: "",
      gudang: "",
      kodeBarang: "",
      namaBarang: "",
      beratPerRoll: [""],
    });
  };

  return (
    <div>
      <Header />
      <div className="container my-4">
        <h4>Input Barang Masuk</h4>

        <div className="row mb-3">
          <div className="col-md-3">
            <Form.Label>Tanggal</Form.Label>
            <Form.Control
              type="date"
              name="tanggal"
              value={form.tanggal}
              onChange={handleInput}
            />
          </div>
          <div className="col-md-3">
            <Form.Label>Gudang Asal</Form.Label>
            <Form.Select
              name="gudang"
              value={form.gudang}
              onChange={handleInput}
            >
              <option value="">Pilih Gudang</option>
              <option value="Cideng">Cideng</option>
              <option value="AA17">AA17</option>
              <option value="A38">A38</option>
            </Form.Select>
          </div>
          <div className="col-md-3">
            <Form.Label>Kode Barang</Form.Label>
            <Form.Control
              name="kodeBarang"
              value={form.kodeBarang}
              onChange={handleInput}
            />
          </div>
          <div className="col-md-3">
            <Form.Label>Nama Barang</Form.Label>
            <Form.Control
              name="namaBarang"
              value={form.namaBarang}
              onChange={handleInput}
            />
          </div>
        </div>

        <div className="mb-3">
          <Form.Label>Berat per Roll (kg)</Form.Label>
          {form.beratPerRoll.map((b, idx) => (
            <div key={idx} className="d-flex gap-2 mb-2">
              <Form.Control
                type="number"
                step="0.01"
                value={b}
                onChange={(e) => handleBeratChange(idx, e.target.value)}
              />
              {idx === form.beratPerRoll.length - 1 && (
                <Button variant="secondary" onClick={handleAddBerat}>
                  + Tambah Roll
                </Button>
              )}
            </div>
          ))}
        </div>

        <Button onClick={handleSubmit}>Simpan Data</Button>

        <h5 className="mt-4">Riwayat Barang Masuk</h5>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Gudang</th>
              <th>Kode</th>
              <th>Nama Barang</th>
              <th>Jumlah Roll</th>
              <th>Rincian Berat</th>
              <th>Total Berat (kg)</th>
            </tr>
          </thead>
          <tbody>
            {dataMasuk.map((item, idx) => (
              <tr key={idx}>
                <td>{item.tanggal}</td>
                <td>{item.gudang}</td>
                <td>{item.kodeBarang}</td>
                <td>{item.namaBarang}</td>
                <td>{item.jumlahRoll}</td>
                <td>
                  {item.beratPerRoll
                    .map((b) => parseFloat(b).toFixed(2))
                    .join(", ")}
                </td>
                <td>{item.totalBerat} Kg</td>
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
