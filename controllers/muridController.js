import Murid from "../models/muridSchema.js";
import Invoice from "../models/invoiceSchema.js";
import mongoose from "mongoose";

export const apiGetAllMurid = async (req, res) => {
  try {
    const cabang = req.query.cabang;
    let murid;
    if (cabang){
      murid = await Murid.find({cabang: req.query.cabang});
    }else{
      murid = await Murid.find();
    }
    res.status(200).json(murid);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const apiGetMuridById = async (req, res) => {
  try {
    const murid = await Murid.findOne({ id: req.params.id });
    res.json(murid);
  } catch (err) {
    res.status(404);
    res.json({ err: "Post doesn't exist!" });
  }
};

export const apiCreateMurid = async (req, res) => {
  try {
    const murid = new Murid({
      id: req.body.id,
      kode: req.body.kode,
      registration_date: req.body.registration_date,
      nama: req.body.nama,
      nickname: req.body.nickname,
      jenis_kelamin: req.body.jenis_kelamin,
      level_sekarang: req.body.level_sekarang,
      pembayaran: req.body.pembayaran,
      status: req.body.status,
      tanggal_lahir: req.body.tanggal_lahir,
      tempat_lahir: req.body.tempat_lahir,
      parent_name: req.body.parent_name,
      relation: req.body.relation,
      address: req.body.address,
      city: req.body.city,
      province: req.body.province,
      postal_code: req.body.postal_code,
      cabang: req.body.cabang,
    });
    await murid.save();
    res.status(200).json(murid);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const apiUpdateMurid = async (req, res) => {
  try {
    const murid = await Murid.findOneAndUpdate(
      { id: req.params.id },
      {
        nama: req.body.nama,
        kode: req.body.kode,
        registration_date: req.body.registration_date,
        nama: req.body.nama,
        nickname: req.body.nickname,
        jenis_kelamin: req.body.jenis_kelamin,
        level_sekarang: req.body.level_sekarang,
        pembayaran: req.body.pembayaran,
        status: req.body.status,
        tanggal_lahir: req.body.tanggal_lahir,
        tempat_lahir: req.body.tempat_lahir,
        parent_name: req.body.parent_name,
        relation: req.body.relation,
        address: req.body.address,
        city: req.body.city,
        province: req.body.province,
        postal_code: req.body.postal_code,
        cabang: req.body.cabang,
      },
      { new: true }
    );
    res.status(200).json(murid);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const apiDeleteMurid = async (req, res) => {
  try {
    const murid = await Murid.findOneAndDelete({ id: req.params.id });
    if (!murid) {
      return res.status(404).json("Murid tidak ditemukan");
    }
    res.status(200).json("Murid berhasil dihapus dari database");
  } catch (err) {
    res.status(400).json(err);
  }
};

export const apiFilterMuridByNama = async (req, res) => {
  try {
    const strFilter = req.query.nama;
    const cabangFilter = req.query.cabang;
    const filter = strFilter
      ? { nama: { $regex: new RegExp(strFilter, "i") }, cabang: cabangFilter }
      : {};
    const murid = await Murid.find(filter);
    res.status(200).json(murid);
  } catch (err) {
    res.status(400).json(err);
  }
};

// export const apiFilterMuridByTanggal = async (req, res) => {
//   try {
//     const date = new Date(req.query.tanggal);
//     const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
//     const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
//     const murid = await Murid.find({
//       tanggal: {
//         $gte: startDate,
//         $lt: endDate
//       }
//     });
//     if (murid.length === 0) {
//       return res.status(404).json({ murid: 'Data not found' });
//     }
//     res.status(200).json(murid);
//   } catch (err) {
//     console.log(err)
//     res.status(400).json(err);
//   }
// }

export const apiFilterMuridByRangeTanggal = async (req, res) => {
  try {
    const start = new Date(req.query.awal);
    const end = new Date(req.query.akhir);
    if (end < start) {
      return res.status(400).send(err);
    }
    const match_stage = {
      $match: {
        pembayaran: {
          $gte: start,
          $lte: end,
        },
      },
    };
    const pipeline = [match_stage];
    const murid = await Murid.aggregate(pipeline);
    res.status(200).json(murid || []);
  } catch (err) {
    res.status(400).send(err);
  }
};

// export const apiChangeMuridCabang = async (req, res) => {
//   try {
//     const updateResult = await Murid.updateMany({}, { cabang: "64a28477375fdbc5e44c8671" });
//     res.status(200).json({ message: "Murid cabang field updated successfully." });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// };


export const apiCreateNewInvoice = async (req, res) => {
  try {
    const invoice = req.body.invoice;
    const murid = await Murid.findOne({ id: req.params.id });
    
    const isBulanExists = murid.pembayaran.some(item => item.bulan === invoice.bulan);
    if (isBulanExists) {
      return res.status(400).json({ error: 'Invoice with the same date already exists' });
    }
    
    const updatedMurid = await Murid.findOneAndUpdate(
      { id: req.params.id },
      {
        $push: { pembayaran: invoice },
      },
      { new: true }
    );
    res.status(200).json(updatedMurid);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export const apiFilterMuridByMonthYear = async (req, res) => {
  try {
    const cabang = new mongoose.Types.ObjectId(req.query.cabang);
    const year = parseInt(req.query.year);
    const month = parseInt(req.query.month);
    
    if (cabang === undefined || cabang === null || cabang === '') {
      return res.status(400).json({ error: 'Invalid or no cabang' });
    }

    if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
      return res.status(400).json({ error: 'Invalid month or year' });
    }

    const pipeline = [
      {
        $match: {
          cabang: cabang,
        },
      },
      {
        $project: {
          _id: 1,
          id: 1,
          kode: 1,
          nama: 1,
          level_sekarang: 1,
          cabang: 1,
          pembayaran: {
            $filter: {
              input: "$pembayaran",
              as: "p",
              cond: {
                $eq: ["$$p.bulan", `${month}-${year}`],
              },
            },
          },
        },
      },
    ];
    
    const murid = await Murid.aggregate(pipeline);

    const sudah_bayar = murid.filter((m) => m.pembayaran.length > 0).length;
    const belum_bayar = murid.length - sudah_bayar;

    const result = murid.map((m) => ({
      ...m,
      pembayaran: m.pembayaran.length > 0 ? m.pembayaran[0] : null,
      status: m.pembayaran.length > 0,
    }));

    res.status(200).json({ sudah_bayar, belum_bayar, result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const apiFilterMuridInvoice = async (req, res) => {
  try {
    const cabangInput = req.query.cabang;
    const userId = parseInt(req.query.id);

    if (!cabangInput || cabangInput === undefined || cabangInput === null || cabangInput === '') {
      return res.status(400).json({ error: 'Invalid or no cabang' });
    }

    const cabang = new mongoose.Types.ObjectId(cabangInput);
    

    if (isNaN(userId) || userId === undefined || userId === null || userId === '') {
      return res.status(400).json({ error: 'Invalid or no userId' });
    }

    const murid = await Murid.findOne({ cabang: cabang, id: userId });

    res.status(200).json(murid);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};









