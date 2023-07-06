import mongoose from "mongoose";

const kuponSchema = new mongoose.Schema({
  bundle: {
    type: String,
    required: true,
  },
  kuponId: {
    type: String,
    required: true,
    unique: true,
  },
  cabang: { type: mongoose.Schema.Types.ObjectId, ref: "Cabang" },
});

const Kupon = mongoose.model("Kupon", kuponSchema);
export default Kupon;
