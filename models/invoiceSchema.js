import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  bulan: { type: String, required: true },
  status: { type: String, required: true },
  kupon: { type: String, required: true },
  tanggal: { type: Date, default: Date.now },
  jenis_pembayaran: { type: String, required: true },
});

export default invoiceSchema;
