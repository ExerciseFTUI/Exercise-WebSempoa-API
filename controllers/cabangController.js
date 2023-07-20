import mongoose from "mongoose";
import Cabang from "../models/cabangSchema.js";
import Murid from "../models/muridSchema.js";
import Kupon from "../models/kuponSchema.js";

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

export const rekapMuridCabang = async (req, res) => {
  try {
    const { cabang, bulan, tahun } = req.query;

    const dataCabang = await Cabang.findOne(
      { _id: cabang },
      { kode: 1, namaCabang: 1, namaPemilik: 1, _id: 0 }
    );
    const rekapStatus = await getRekapitulasiStatusMurid(cabang, tahun, bulan);
    const rekapMuridBaru = await getJumlahMuridBaru(cabang, tahun, bulan);
    const rekapKupon = await getKuponDibuatDanDigunakan(cabang, tahun, bulan);

    const response = {
      dataCabang: dataCabang,
      jumlahMuridBaru: rekapMuridBaru,
      jumlahMuridAktif: rekapStatus.Aktif.jumlahMurid,
      jumlahMuridLulus: rekapStatus.Lulus.jumlahMurid,
      jumlahMuridKeluar: rekapStatus.Keluar.jumlahMurid,
      kupon: rekapKupon.Total,
      kuponTerpakai: rekapKupon.Digunakan,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Fungsi untuk melakukan rekap penggunaan kupon pada bulan tertentu di cabang tertentu
async function getRekapitulasiStatusMurid(cabangId, year, month) {
  try {
    const startDate = new Date(year, month - 1, 1); // Buat tanggal awal bulan
    const endDate = new Date(year, month, 0); // Buat tanggal akhir bulan

    const mongooseCabangId = new mongoose.Types.ObjectId(cabangId);

    // Lakukan agregasi untuk menghitung jumlah murid dengan status "Lulus", "Aktif", dan "Keluar"
    const result = await Murid.aggregate([
      {
        $match: {
          cabang: mongooseCabangId,
          updatedAt: { $gte: startDate, $lte: endDate }, // Filter berdasarkan tanggal
        },
      },
      {
        $group: {
          _id: "$status", // Grup berdasarkan status
          jumlahMurid: { $sum: 1 }, // Hitung jumlah murid
          namaMurid: { $push: "$nama" }, // Mengumpulkan nama-nama murid dalam array
        },
      },
      {
        $project: {
          status: "$_id", // Proyeksikan _id ke bidang status
          jumlahMurid: 1, // Tampilkan jumlahMurid
          namaMurid: 1, // Tampilkan array namaMurid
          _id: 0, // Sembunyikan _id
        },
      },
    ]);

    // Menginisialisasi objek untuk menyimpan hasil rekapitulasi
    const rekapitulasi = {
      Lulus: { jumlahMurid: 0, namaMurid: [] },
      Aktif: { jumlahMurid: 0, namaMurid: [] },
      Keluar: { jumlahMurid: 0, namaMurid: [] },
    };

    // Mengisi nilai hasil rekapitulasi berdasarkan data dari agregasi
    result.forEach((data) => {
      rekapitulasi[data.status].jumlahMurid = data.jumlahMurid;
      rekapitulasi[data.status].namaMurid = data.namaMurid;
    });

    return rekapitulasi;
  } catch (error) {
    console.error("Error while getting rekap status murid:", error);
    throw error;
  }
}

async function getJumlahMuridBaru(cabangId, year, month) {
  try {
    const startDate = new Date(year, month - 1, 1); // Buat tanggal awal bulan
    const endDate = new Date(year, month, 0); // Buat tanggal akhir bulan

    const mongooseCabangId = new mongoose.Types.ObjectId(cabangId);

    // Lakukan agregasi untuk menghitung jumlah murid baru yang ditambahkan
    const result = await Murid.aggregate([
      {
        $match: {
          cabang: mongooseCabangId,
          registration_date: { $gte: startDate, $lte: endDate }, // Filter berdasarkan tanggal pendaftaran
        },
      },
      {
        $group: {
          _id: null,
          jumlahMuridBaru: { $sum: 1 }, // Hitung jumlah murid baru yang ditambahkan
        },
      },
    ]);

    // Jika data ditemukan, kembalikan jumlah murid baru
    if (result.length > 0) {
      return result[0].jumlahMuridBaru;
    } else {
      return 0; // Jika tidak ada murid baru, kembalikan 0
    }
  } catch (error) {
    console.error("Error while getting jumlah murid baru:", error);
    throw error;
  }
}

async function getKuponDibuatDanDigunakan(cabangId, year, month) {
  try {
    const startDate = new Date(year, month - 1, 1); // Buat tanggal awal bulan
    const endDate = new Date(year, month, 0); // Buat tanggal akhir bulan

    const mongooseCabangId = new mongoose.Types.ObjectId(cabangId);

    // Lakukan agregasi untuk menghitung jumlah kupon yang dibuat dan digunakan pada cabang dan rentang tanggal tertentu
    const result = await Kupon.aggregate([
      {
        $match: {
          cabang: mongooseCabangId,
          createdAt: { $gte: startDate, $lte: endDate }, // Filter berdasarkan tanggal pembuatan kupon
        },
      },
      {
        $group: {
          _id: "$isUsed", // Grup berdasarkan status kupon (dibuat atau digunakan)
          jumlahKupon: { $sum: 1 }, // Hitung jumlah kupon
        },
      },
      {
        $project: {
          status: {
            $cond: {
              if: { $eq: ["$_id", true] },
              then: "Digunakan",
              else: "Tersedia",
            },
          }, // Proyeksikan status kupon berdasarkan _id
          jumlahKupon: 1, // Tampilkan jumlahKupon
          _id: 0, // Sembunyikan _id
        },
      },
    ]);

    // Menginisialisasi objek untuk menyimpan hasil rekapitulasi
    const rekapitulasi = {
      Tersedia: 0,
      Digunakan: 0,
      Total: 0,
    };

    // Mengisi nilai hasil rekapitulasi berdasarkan data dari agregasi
    result.forEach((data) => {
      rekapitulasi[data.status] = data.jumlahKupon;
    });

    rekapitulasi.Total = rekapitulasi.Tersedia + rekapitulasi.Digunakan;

    return rekapitulasi;
  } catch (error) {
    console.error("Error while getting kupon dibuat dan digunakan:", error);
    throw error;
  }
}
