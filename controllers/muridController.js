import Murid from "../models/muridSchema.js";

export const apiGetAllMurid = async (req, res) => {
  try {
    const murid = await Murid.find();
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
      nama: req.body.nama,
      kode: req.body.kode,
      jenis_kelamin: req.body.jenis_kelamin,
      level_sekarang: req.body.level_sekarang,
      pembayaran: req.body.pembayaran,
      status: req.body.status,
      profile: req.body.profile,
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
        jenis_kelamin: req.body.jenis_kelamin,
        level_sekarang: req.body.level_sekarang,
        pembayaran: req.body.pembayaran,
        status: req.body.status,
        profile: req.body.profile,
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
    const filter = strFilter
      ? { nama: { $regex: new RegExp(strFilter, "i") } }
      : {};
    const murid = await Murid.find(filter);
    res.status(200).json(murid);
  } catch (err) {
    res.status(400).json(err);
  }
};

// export const apiFilterMuridByCabang = async (req, res) => {
//   try {
//     const strFilter = req.query.cabang;
//     const filter = strFilter ? { cabang: { $regex: new RegExp(strFilter, 'i') } } : {};
//     const murid = await Murid.find(filter);
//     res.status(200).json(murid);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// }

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
