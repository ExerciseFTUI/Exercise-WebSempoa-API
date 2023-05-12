import Cabang from "../models/cabangSchema.js";

export const getAllCabang = async (req, res) => {
  try {
    //Find All Cabang
    const cabang = await Cabang.find();

    //Response
    res.status(200).json({ data: cabang });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCabang = async (req, res) => {
  try {
    //Get data from req.body
    const { namaCabang, namaPemilik, kode, alamat, notelp, email } = req.body;

    //Create a new Cabang and add it to the database
    const cabang = new Cabang({
      namaCabang,
      namaPemilik,
      kode,
      alamat,
      notelp,
      email,
    });
    const newCabang = await cabang.save();

    //Response
    res
      .status(200)
      .json({ data: newCabang, message: "Sukses Membuat Cabang Baru" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
