import mongoose from "mongoose";

const guruSchema = new mongoose.Schema({
  namaGuru: {
    type: String,
    required: true,
  },
  namaPanggilan: {
    type: String,
  },
  gender: {
    type: String,
    required: true,
  },
  alamatGuru: {
    type: String,
    required: true,
  },
  tanggalLahir: {
    type: Date,
  },
  notelp: {
    type: String,
    required: true,
  },
  pendidikanTerakhir: {
    type: String,
    required: true,
  },
  emailGuru: {
    type: String,
    required: true,
  },
  cabang: { type: mongoose.Schema.Types.ObjectId, ref: "Cabang" },
  // timestamps: true,
});

const Guru = mongoose.model("Guru", guruSchema);
export default Guru;
