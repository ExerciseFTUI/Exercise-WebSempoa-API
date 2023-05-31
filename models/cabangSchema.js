import mongoose from "mongoose";

const cabangSchema = new mongoose.Schema({
  namaCabang: {
    type: String,
    required: true,
    unique: true,
  },
  namaPemilik: {
    type: String,
    required: true,
  },
  kode: {
    type: String,
    required: true,
    unique: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  notelp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  murid: [{ type: mongoose.Schema.Types.ObjectId, ref: "Murid" }],
  guru: [{ type: mongoose.Schema.Types.ObjectId, ref: "Guru" }],
});

const Cabang = mongoose.model("Cabang", cabangSchema);
export default Cabang;
