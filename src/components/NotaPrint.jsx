// src/components/NotaPrint.jsx
import React from "react";
import dayjs from "dayjs";

const NotaPrint = React.forwardRef(({ transaksi, total, tunai, kembali }, ref) => {
  return (
    <div ref={ref} style={{ width: "300px", padding: "10px", fontFamily: "monospace" }}>
      <div style={{ textAlign: "center" }}>
        <strong>TOKO KAIN MAJU JAYA</strong><br />
        Jl. Textile No. 123, Kota<br />
        Telp: 0812-3456-7890<br />
        ================================<br />
      </div>
      <div>
        Tgl: {dayjs().format("DD/MM/YYYY HH:mm:ss")}<br />
        Kasir: Andi
      </div>
      ================================<br />
      {transaksi.map((item, idx) => (
        <div key={idx}>
          {idx + 1}. {item.kode} - {item.nama}<br />
          {item.deskripsi}<br />
          Qty: {item.qtyDisplay}<br />
          Total: Rp {item.total.toLocaleString()}<br />
          --------------------------------<br />
        </div>
      ))}
      <div>
        <strong>Total: Rp {total.toLocaleString()}</strong><br />
        Tunai: Rp {tunai.toLocaleString()}<br />
        Kembali: Rp {kembali.toLocaleString()}<br />
      </div>
      ================================<br />
      Terima kasih telah berbelanja!
    </div>
  );
});

export default NotaPrint;
