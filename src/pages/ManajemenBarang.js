import { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";

const dummyData = [
  {
    kode: "TLB-K01",
    nama: "Kain Tebal",
    jenis: "Tebal",
    warna: "Merah",
    hargaRol: 150000,
    hargaKg: 120000,
  },
  {
    kode: "SJR-X01",
    nama: "Sutra Jepang",
    jenis: "Sutra",
    warna: "Biru",
    hargaRol: 80000,
    hargaKg: 100000,
  },
  {
    kode: "KTN-123",
    nama: "Katun",
    jenis: "Katun",
    warna: "Putih",
    hargaRol: 90000,
    hargaKg: 110000,
  },
];

const ManajemenBarang = () => {
  const [barangList, setBarangList] = useState(dummyData);
  const [filterJenis, setFilterJenis] = useState("");
  const [filterWarna, setFilterWarna] = useState("");
  const [form, setForm] = useState({
    kode: "",
    nama: "",
    jenis: "",
    warna: "",
    hargaRol: "",
    hargaKg: "",
  });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.kode || !form.nama) return alert("Kode dan nama wajib diisi");
    const barangBaru = {
      ...form,
      hargaRol: Number(form.hargaRol),
      hargaKg: Number(form.hargaKg),
    };
    setBarangList([...barangList, barangBaru]);
    setForm({
      kode: "",
      nama: "",
      jenis: "",
      warna: "",
      hargaRol: "",
      hargaKg: "",
    });
  };

  const filteredBarang = barangList.filter(
    (b) =>
      (filterJenis === "" ||
        b.jenis.toLowerCase().includes(filterJenis.toLowerCase())) &&
      (filterWarna === "" ||
        b.warna.toLowerCase().includes(filterWarna.toLowerCase()))
  );

  return (
    <div className="page-container">
      <div className="container page-content my-4">
        <h4>Manajemen Barang</h4>

        {/* Filter */}
        <div className="row mb-4">
          <div className="col-md-3">
            <Form.Label>Filter Jenis</Form.Label>
            <Form.Control
              value={filterJenis}
              onChange={(e) => setFilterJenis(e.target.value)}
              placeholder="Contoh: Sutra"
            />
          </div>
          <div className="col-md-3">
            <Form.Label>Filter Warna</Form.Label>
            <Form.Control
              value={filterWarna}
              onChange={(e) => setFilterWarna(e.target.value)}
              placeholder="Contoh: Merah"
            />
          </div>
        </div>

        {/* Form Tambah Barang */}
        <h5>Tambah / Edit Barang</h5>
        <div className="row mb-3">
          <div className="col-md-2">
            <Form.Label>Kode</Form.Label>
            <Form.Control
              name="kode"
              value={form.kode}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-2">
            <Form.Label>Nama</Form.Label>
            <Form.Control
              name="nama"
              value={form.nama}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-2">
            <Form.Label>Jenis</Form.Label>
            <Form.Control
              name="jenis"
              value={form.jenis}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-2">
            <Form.Label>Warna</Form.Label>
            <Form.Control
              name="warna"
              value={form.warna}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-2">
            <Form.Label>Harga/Rol</Form.Label>
            <Form.Control
              name="hargaRol"
              type="number"
              value={form.hargaRol}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-2">
            <Form.Label>Harga/Kg</Form.Label>
            <Form.Control
              name="hargaKg"
              type="number"
              value={form.hargaKg}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <Button onClick={handleSubmit}>Simpan Barang</Button>

        {/* Tabel Daftar Barang */}
        <h5 className="mt-4">Daftar Barang</h5>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Kode</th>
              <th>Nama</th>
              <th>Jenis</th>
              <th>Warna</th>
              <th>Harga/Rol</th>
              <th>Harga/Kg</th>
            </tr>
          </thead>
          <tbody>
            {filteredBarang.map((item, idx) => (
              <tr key={idx}>
                <td>{item.kode}</td>
                <td>{item.nama}</td>
                <td>{item.jenis}</td>
                <td>{item.warna}</td>
                <td>{item.hargaRol.toLocaleString()}</td>
                <td>{item.hargaKg.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ManajemenBarang;
