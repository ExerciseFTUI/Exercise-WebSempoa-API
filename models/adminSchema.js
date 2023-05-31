import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  cabang: { type: mongoose.Schema.Types.ObjectId, ref: "Cabang" },
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
