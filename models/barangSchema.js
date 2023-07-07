import mongoose from "mongoose";

const babangSchema = new mongoose.Schema({
  idBarang: {
    type: String,
    required: true,
    unique: true,
  },
  noBuku: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  tanggalTerima: {
    type: String,
  },
  tanggalKembali: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
});

const Barang = mongoose.model("Barang", barangSchema);
export default barang;
