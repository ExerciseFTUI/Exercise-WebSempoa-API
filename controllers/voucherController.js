import mongoose from "mongoose";
import Cabang from "../models/cabangSchema.js";
import Kupon from "../models/kuponSchema.js";
import Murid from "../models/muridSchema.js";

// Route untuk membuat kupon
export const addKupon = async (req, res) => {
  try {
    const { bundle, kuponId, cabangId } = req.body;

    // Membuat instance baru dari model Kupon
    const newKupon = new Kupon({ bundle, kuponId, cabang: cabangId });

    // Menyimpan kupon baru ke database
    await newKupon.save();

    res.status(201).json(newKupon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Route untuk mendapatkan semua
export const getAllKupon = async (req, res) => {
  try {
    // Mengambil semua kupon dari database
    const kupons = await Kupon.find();

    res.status(200).json(kupons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Route untuk mendapatkan kupon berdasarkan i
export const getKuponById = async (req, res) => {
  try {
    const kupon = await Kupon.findById(req.params.id);

    if (!kupon) {
      return res.status(404).json({ error: "Kupon not found" });
    }

    res.status(200).json(kupon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Route untuk mendapatkan kupon berdasarkan cabang
export const getKuponByCabang = async (req, res) => {
  const cabangId = req.params.cabangId;

  try {
    const kupon = await Kupon.find({ cabang: cabangId }).populate("cabang");

    if (!kupon) {
      return res.status(404).json({ error: "Kupon not found" });
    }

    res.status(200).json(kupon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Route untuk Menggunakan Kupon
export const useKupon = async (req, res) => {
  const kuponId = req.params.kuponId;

  try {
    const kupon = await Kupon.findOneAndUpdate(
      { kuponId: kuponId, isUsed: false },
      { isUsed: true },
      { new: true }
    );

    if (!kupon) {
      return res.status(404).json({ error: "Kupon not found or already used" });
    }

    res.status(200).json(kupon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Route untuk mengupdate kupon berdasarkan id
export const updateKupon = async (req, res) => {
  try {
    const { bundle, kuponId } = req.body;

    const updatedKupon = await Kupon.findByIdAndUpdate(
      req.params.id,
      { bundle, kuponId },
      { new: true }
    );

    if (!updatedKupon) {
      return res.status(404).json({ error: "Kupon not found" });
    }

    res.json(updatedKupon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Route untuk menghapus kupon berdasarkan id
export const deleteKupon = async (req, res) => {
  try {
    const deletedKupon = await Kupon.findByIdAndRemove(req.params.id);

    if (!deletedKupon) {
      return res.status(404).json({ error: "Kupon not found" });
    }

    res.json({ message: "Kupon deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const rekapKupon = async (req, res) => {
  try {
    const { cabang, bulan, tahun } = req.query;

    const dataCabang = await Cabang.findById(cabang);
    console.log(dataCabang);
    const kuponTerjual = await getKuponUsageByMonth(cabang, tahun, bulan);
    console.log(kuponTerjual);
    const siswaAktif = await Murid.countDocuments({
      cabang: cabang,
      status: "Lulus",
    });
    console.log(siswaAktif);

    res.status(200).json({
      namaCabang: dataCabang.namaCabang,
      kuponTerjual: kuponTerjual,
      siswaAktif: siswaAktif,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fungsi untuk melakukan rekap penggunaan kupon pada bulan tertentu di cabang tertentu
async function getKuponUsageByMonth(cabangId, year, month) {
  try {
    const startDate = new Date(year, month - 1, 1); // Buat tanggal awal bulan
    const endDate = new Date(year, month, 0); // Buat tanggal akhir bulan

    let mongooseCabangId = new mongoose.Types.ObjectId(cabangId);
    console.log(cabangId);

    // Lakukan agregasi untuk menghitung jumlah kupon yang digunakan
    const result = await Kupon.aggregate([
      {
        $match: {
          cabang: mongooseCabangId,
          isUsed: true,
          updatedAt: { $gte: startDate, $lte: endDate }, // Filter berdasarkan tanggal
        },
      },
      {
        $group: {
          _id: null,
          totalKuponUsed: { $sum: 1 }, // Hitung jumlah kupon yang digunakan
        },
      },
    ]);

    // Jika data ditemukan, kembalikan hasilnya
    if (result.length > 0) {
      return result[0].totalKuponUsed;
    } else {
      return 0; // Jika tidak ada penggunaan kupon pada bulan tersebut, kembalikan 0
    }
  } catch (error) {
    console.error("Error while getting kupon usage:", error);
    throw error;
  }
}
