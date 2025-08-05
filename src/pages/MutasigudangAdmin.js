import { useState, useEffect, useContext } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const MutasiGudangAdmin = () => {
  const [mutasiList, setMutasiList] = useState([]);
  const [userGudang, setUserGudang] = useState(""); // Gudang asal dari user
  const [form, setForm] = useState({
    tanggal: "",
    tujuan: "",
    kode: "",
    nama: "",
    beratPerRoll: [""],
  });

  const { currentUser } = useContext(AuthContext);

  // Load gudang user saat komponen dimount
  useEffect(() => {
    if (
      currentUser &&
      currentUser.gudangAkses &&
      currentUser.gudangAkses.length > 0
    ) {
      // Langsung ambil dari currentUser yang sudah include gudangAkses
      setUserGudang(currentUser.gudangAkses[0]);
    }
  }, [currentUser]);

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
    if (!form.tanggal || !form.tujuan || !form.kode) {
      return alert("Harap lengkapi semua field.");
    }

    if (!userGudang) {
      return alert("Gudang asal tidak terdeteksi. Silakan refresh halaman.");
    }

    // Filter berat yang valid saja (tidak kosong dan angka)
    const beratRollValid = form.beratPerRoll.filter(
      (b) => b !== "" && !isNaN(parseFloat(b))
    );

    if (beratRollValid.length === 0) {
      return alert("Masukkan minimal satu berat roll yang valid.");
    }

    const totalBerat = beratRollValid.reduce(
      (sum, b) => sum + parseFloat(b),
      0
    );

    setMutasiList([
      ...mutasiList,
      {
        ...form,
        asal: userGudang, // Otomatis diisi dari gudang user
        beratPerRoll: beratRollValid,
        jumlahRoll: beratRollValid.length,
        totalBerat: totalBerat.toFixed(2),
      },
    ]);

    // Reset form
    setForm({
      tanggal: "",
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

        {/* Info Gudang Asal */}
        {userGudang && (
          <div className="alert alert-info mb-4">
            <strong>Gudang Asal:</strong> {userGudang}
          </div>
        )}

        <div className="row mb-3">
          <div className="col-md-4">
            <Form.Label>Tanggal</Form.Label>
            <Form.Control
              type="date"
              name="tanggal"
              value={form.tanggal}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <Form.Label>Gudang Tujuan</Form.Label>
            <Form.Select
              name="tujuan"
              value={form.tujuan}
              onChange={handleChange}
            >
              <option value="">Pilih Gudang Tujuan</option>
              <option value="AA17">AA17</option>
              <option value="A38">A38</option>
            </Form.Select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <Form.Label>Kode Barang</Form.Label>
            <Form.Control
              name="kode"
              value={form.kode}
              onChange={handleChange}
              placeholder="Contoh: TLB-K01"
            />
          </div>
          <div className="col-md-6">
            <Form.Label>Nama Barang</Form.Label>
            <Form.Control
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Contoh: Kain Tebal"
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
                placeholder={`Roll ${idx + 1}`}
              />
              {idx === form.beratPerRoll.length - 1 && (
                <Button variant="secondary" onClick={handleAddRoll}>
                  + Tambah Roll
                </Button>
              )}
            </div>
          ))}
        </div>

        <Button variant="primary" onClick={handleSubmit} disabled={!userGudang}>
          Simpan Mutasi
        </Button>

        <h5 className="mt-4">Riwayat Mutasi</h5>
        <Table striped bordered hover responsive>
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
            {mutasiList.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  Belum ada data mutasi
                </td>
              </tr>
            ) : (
              mutasiList.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.tanggal}</td>
                  <td>
                    <strong>{item.asal}</strong>
                  </td>
                  <td>{item.tujuan}</td>
                  <td>{item.kode}</td>
                  <td>{item.nama}</td>
                  <td>{item.jumlahRoll}</td>
                  <td>
                    {item.beratPerRoll
                      .map((b, i) => parseFloat(b).toFixed(2))
                      .join(", ")}{" "}
                    kg
                  </td>
                  <td>
                    <strong>{item.totalBerat} kg</strong>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default MutasiGudangAdmin;
