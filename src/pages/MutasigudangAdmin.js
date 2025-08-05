import { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";

const MutasiGudangAdmin = () => {
  const [mutasiList, setMutasiList] = useState([]);
  const [form, setForm] = useState({
    tanggal: "",
    asal: "",
    tujuan: "",
    kode: "",
    nama: "",
    beratPerRoll: [""],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBeratChange = (idx, value) => {
    const updated = [...form.beratPerRoll];
    updated[idx] = value;
    setForm({ ...form, beratPerRoll: updated });
  };

  const handleAddRoll = () => {
    setForm({ ...form, beratPerRoll: [...form.beratPerRoll, ""] });
  };

  const handleSubmit = () => {
    if (!form.tanggal || !form.asal || !form.tujuan || !form.kode) {
      return alert("Harap lengkapi semua field.");
    }

    // Filter berat yang valid saja (tidak kosong dan angka)
    const beratRollValid = form.beratPerRoll.filter(
      (b) => b !== "" && !isNaN(parseFloat(b))
    );

    const totalBerat = beratRollValid.reduce(
      (sum, b) => sum + parseFloat(b),
      0
    );

    setMutasiList([
      ...mutasiList,
      {
        ...form,
        beratPerRoll: beratRollValid,
        jumlahRoll: beratRollValid.length,
        totalBerat: totalBerat.toFixed(2),
      },
    ]);

    // Reset form
    setForm({
      tanggal: "",
      asal: "",
      tujuan: "",
      kode: "",
      nama: "",
      beratPerRoll: [""],
    });
  };
  return (
    <div>
      <div className="container my-4">
        <h4>Mutasi Gudang</h4>

        <div className="row mb-3">
          <div className="col-md-3">
            <Form.Label>Tanggal</Form.Label>
            <Form.Control
              type="date"
              name="tanggal"
              value={form.tanggal}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <Form.Label>Gudang Asal</Form.Label>
            <Form.Select name="asal" value={form.asal} onChange={handleChange}>
              <option value="">Pilih</option>
              <option value="Cideng">Cideng</option>
              <option value="AA17">AA17</option>
              <option value="A38">A38</option>
            </Form.Select>
          </div>
          <div className="col-md-3">
            <Form.Label>Gudang Tujuan</Form.Label>
            <Form.Select
              name="tujuan"
              value={form.tujuan}
              onChange={handleChange}
            >
              <option value="">Pilih</option>
              <option value="Cideng">Cideng</option>
              <option value="AA17">AA17</option>
              <option value="A38">A38</option>
            </Form.Select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-3">
            <Form.Label>Kode Barang</Form.Label>
            <Form.Control
              name="kode"
              value={form.kode}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <Form.Label>Nama Barang</Form.Label>
            <Form.Control
              name="nama"
              value={form.nama}
              onChange={handleChange}
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
                <Button variant="secondary" onClick={handleAddRoll}>
                  + Tambah Roll
                </Button>
              )}
            </div>
          ))}
        </div>

        <Button onClick={handleSubmit}>Simpan Mutasi</Button>

        <h5 className="mt-4">Riwayat Mutasi</h5>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Asal</th>
              <th>Tujuan</th>
              <th>Kode</th>
              <th>Nama</th>
              <th>Jumlah Roll</th>
              <th>Detail Berat</th>
              <th>Total Berat</th>
            </tr>
          </thead>
          <tbody>
            {mutasiList.map((item, idx) => (
              <tr key={idx}>
                <td>{item.tanggal}</td>
                <td>{item.asal}</td>
                <td>{item.tujuan}</td>
                <td>{item.kode}</td>
                <td>{item.nama}</td>
                <td>{item.jumlahRoll}</td>
                <td>
                  {item.beratPerRoll
                    .map((b, i) => parseFloat(b).toFixed(2))
                    .join(", ")}
                </td>
                <td>{item.totalBerat} kg</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default MutasiGudangAdmin;
