import { useState, useRef, useContext } from "react";
import { Table, Button, Form } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";

const dummyBarang = [
  { kode: "TLB-K01", nama: "Kain Tebal", hargaRol: 150000, hargaKg: 120000, beratPerRol: 0.75 },
  { kode: "SJR-X01", nama: "Sutra Jepang", hargaRol: 80000, hargaKg: 100000, beratPerRol: 0.6 },
  { kode: "KTN-123", nama: "Katun", hargaRol: 90000, hargaKg: 110000, beratPerRol: 0.5 },
];

const Kasir = () => {
  const { currentUser } = useContext(AuthContext);
  const kasirNama = currentUser?.displayName || "Kasir";

  const [kode, setKode] = useState("");
  const [jumlahRol, setJumlahRol] = useState(0);
  const [jumlahKg, setJumlahKg] = useState(0);
  const [tunai, setTunai] = useState(0);
  const [transaksi, setTransaksi] = useState([]);
  const printRef = useRef();

  const handleTambah = () => {
    const barang = dummyBarang.find((b) => b.kode === kode.toUpperCase());
    if (!barang) return alert("Kode barang tidak ditemukan");

    let total = 0;
    let deskripsi = "";

    if (jumlahRol > 0) {
      total += jumlahRol * barang.hargaRol;
      deskripsi += `${jumlahRol} Rol (${(jumlahRol * barang.beratPerRol).toFixed(2)}kg)`;
    }
    if (jumlahKg > 0) {
      total += jumlahKg * barang.hargaKg;
      deskripsi += jumlahRol > 0 ? ` + ${jumlahKg.toFixed(2)} kg` : `${jumlahKg.toFixed(2)} kg`;
    }

    setTransaksi([...transaksi, {
      kode: barang.kode,
      nama: barang.nama,
      hargaRol: barang.hargaRol,
      hargaKg: barang.hargaKg,
      jumlahRol,
      jumlahKg,
      beratPerRol: barang.beratPerRol,
      total,
      deskripsi,
    }]);

    setKode("");
    setJumlahRol(0);
    setJumlahKg(0);
  };

  const totalBelanja = transaksi.reduce((sum, item) => sum + item.total, 0);
  const kembali = tunai - totalBelanja;

  const handlePrint = () => {
    const printContents = printRef.current.innerText;
    const win = window.open("", "", "width=600,height=700");
    win.document.write(`
      <html><head><title>Nota</title>
        <style>
          body { font-family: monospace; white-space: pre-wrap; font-size: 14px; }
          .center { text-align: center; }
        </style>
      </head>
      <body>${printContents}</body></html>
    `);
    win.document.close();
    win.print();
  };

  return (
    <>
      <Header />
      <div className="container my-4">
        <h4>Input Penjualan</h4>
        <div className="row mb-3">
          <div className="col-md-3">
            <Form.Label>Kode Barang</Form.Label>
            <Form.Control value={kode} onChange={(e) => setKode(e.target.value.toUpperCase())} />
          </div>
          <div className="col-md-2">
            <Form.Label>Jumlah Rol</Form.Label>
            <Form.Control type="number" value={jumlahRol} min="0" onChange={(e) => setJumlahRol(Number(e.target.value))} />
          </div>
          <div className="col-md-2">
            <Form.Label>Jumlah Kg</Form.Label>
            <Form.Control type="number" step="0.01" value={jumlahKg} min="0" onChange={(e) => setJumlahKg(Number(e.target.value))} />
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <Button variant="primary" onClick={handleTambah}>Tambah</Button>
          </div>
          <div className="col-md-3">
            <Form.Label>Tunai</Form.Label>
            <Form.Control type="number" value={tunai} min="0" onChange={(e) => setTunai(Number(e.target.value))} />
          </div>
        </div>

        <h5>Daftar Transaksi</h5>
        <Table striped bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Kode</th>
              <th>Nama</th>
              <th>Harga Rol</th>
              <th>Harga Kg</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {transaksi.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{item.kode}</td>
                <td>{item.nama}</td>
                <td>{item.hargaRol.toLocaleString()}</td>
                <td>{item.hargaKg.toLocaleString()}</td>
                <td>{item.deskripsi}</td>
                <td>{item.total.toLocaleString()}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={6} className="text-end fw-bold">Total</td>
              <td className="fw-bold">{totalBelanja.toLocaleString()}</td>
            </tr>
          </tbody>
        </Table>

        <Button variant="success" onClick={handlePrint}>🖨 Print Nota</Button>

        <div ref={printRef} style={{ display: "none" }}>
{`
========================================
       TOKO KAIN MAJU JAYA
     Jl. Textile No. 123, Kota
      Telp: 0812-3456-7890
========================================
Tgl   : ${new Date().toLocaleString()}
Kasir : ${kasirNama}
========================================
No. Kode      Harga                  Qty                     Total
---------------------------------------------------------------------
${transaksi.map((item, i) => {
  const no = (i + 1).toString().padEnd(3);
  const kode = item.kode.padEnd(9);

  let harga = "";
  if (item.jumlahRol > 0) {
    harga = `${item.hargaRol.toLocaleString()} @ ${item.jumlahRol}`;
  } else if (item.jumlahKg > 0) {
    harga = `${item.hargaKg.toLocaleString()} @ ${item.jumlahKg.toFixed(2)}`;
  }
  harga = harga.padEnd(24);

  let qty = "";
  if (item.jumlahRol > 0) {
    qty = `${item.jumlahRol} Rol (${(item.jumlahRol * item.beratPerRol).toFixed(2)}kg)`;
  } else if (item.jumlahKg > 0) {
    qty = `${item.jumlahKg.toFixed(2)} kg`;
  }
  qty = qty.padEnd(26);

  const total = item.total.toLocaleString().padStart(10);

  return `${no}${kode}${harga}${qty}${total}`;
}).join("\n")}
---------------------------------------------------------------------
Total Belanja : Rp ${totalBelanja.toLocaleString()}
Tunai         : Rp ${tunai.toLocaleString()}
Kembali       : Rp ${kembali > 0 ? kembali.toLocaleString() : 0}
========================================
    Terima kasih atas kunjungan Anda!
========================================
`}
</div>

      </div>
      <Footer />
    </>
  );
};

export default Kasir;
