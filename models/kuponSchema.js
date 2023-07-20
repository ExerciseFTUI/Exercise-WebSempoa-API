import mongoose from "mongoose";

const kuponSchema = new mongoose.Schema(
  {
    bundle: {
      type: String,
      required: true,
    },
    kuponId: {
      type: String,
      required: true,
      unique: true,
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
    cabang: { type: mongoose.Schema.Types.ObjectId, ref: "Cabang" },
  },
  { timestamps: true }
);

const Kupon = mongoose.model("Kupon", kuponSchema);
export default Kupon;
