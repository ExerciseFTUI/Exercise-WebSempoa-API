import mongoose from "mongoose";
import Invoice from "./invoiceSchema.js";

const muridSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    index: true,
    default: 0,
  },
  kode: { type: Number, required: true },
  nama: { type: String, required: true },
  jenis_kelamin: { type: String, required: true },
  level_sekarang: { type: String, required: true },
  pembayaran: [Invoice],
  status: { type: String, required: true },
  profile: { type: String, required: true },
  cabang: { type: mongoose.Schema.Types.ObjectId, ref: "Cabang" },
});

const Murid = mongoose.model("Murid", muridSchema);

export default Murid;
