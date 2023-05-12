import mongoose from "mongoose";
import Guru from "../models/guruSchema.js";

const toId = mongoose.Types.ObjectId;

export const getAllGuru = async (req, res) => {
  try {
    //Find All Sample
    const guru = await Guru.find();

    //Response
    res.status(200).json({ data: guru });
  } catch (error) {
    //Status error menyesuaikan
    //Untuk send error masih blm fix selalu gini
    res.status(404).json({ message: error.message });
  }
};

export const addGuru = async (req, res) => {
  try {
    //Get Data from req.body
    const {
      namaGuru,
      namaPanggilan,
      gender,
      alamatGuru,
      tanggalLahir,
      notelp,
      pendidikanTerakhir,
      emailGuru,
    } = req.body;

    console.log(req.body);
    //Create a new guru and add it to the database
    const guru = new Guru({
      namaGuru,
      namaPanggilan,
      gender,
      alamatGuru,
      tanggalLahir,
      notelp,
      pendidikanTerakhir,
      emailGuru,
    });
    const newGuru = await guru.save();
    //response
    res
      .status(200)
      .json({ data: newGuru, messsage: "Sukses Menambahkan Guru Baru" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGuruById = async (req, res) => {
  try {
    //Find Guru by ID
    const guru = Guru.findById(req.params.id);

    //Response
    res.status(200).json({ data: guru });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
