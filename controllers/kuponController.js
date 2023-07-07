import Kupon from "../models/kuponSchema.js";

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

// Route untuk mendapatkan kupon berdasarkan i
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
