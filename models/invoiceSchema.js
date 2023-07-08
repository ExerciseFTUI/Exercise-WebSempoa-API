import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  bulan: { type: String, required: true },
  status: { type: String, required: true },
  kupon: { type: String, required: true },
  tipe: { type: String, required: true },
  harga: { type: Number, required: true },
  tanggal: { type: Date, default: Date.now },
  jenis_pembayaran: { type: String, required: true },
});

export default invoiceSchema;
