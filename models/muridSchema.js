import mongoose from "mongoose";
import Invoice from "./invoiceSchema.js";

const muridSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    index: true,
    required: true,
  },
  kode: { type: Number, required: true },
  registration_date: { type: Date, default: Date.now },
  nama: { type: String, required: true },
  nickname: { type: String, required: true },
  jenis_kelamin: { type: String, required: true },
  level_sekarang: { type: String, required: true },
  pembayaran: [Invoice],
  status: { type: String, required: true },
  tanggal_lahir: { type: Date, required: true },
  tempat_lahir: { type: String, required: true },
  parent_name: { type: String, required: true },
  relation: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  postal_code: { type: String, required: true },
  cabang: { type: mongoose.Schema.Types.ObjectId, ref: "Cabang" },
});

const Murid = mongoose.model("Murid", muridSchema);

export default Murid;
