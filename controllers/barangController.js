import Barang from "../models/barangSchema"; // Assuming you have the corresponding model file

// Create a new barang
const createBarang = async (req, res) => {
  try {
    const { idBarang, noBuku, level, tanggalTerima, tanggalKembali, status } =
      req.body;

    // Validate required fields
    if (!idBarang || !noBuku || !level || !status) {
      return res.status(400).json({
        error: "idBarang, noBuku, level, and status are required fields",
      });
    }

    // Validate unique idBarang
    const existingBarang = await Barang.findOne({ idBarang });
    if (existingBarang) {
      return res.status(400).json({ error: "idBarang must be unique" });
    }

    const barang = new Barang(req.body);
    const savedBarang = await barang.save();
    res.status(201).json(savedBarang);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all barangs with optional filtering
const getAllBarangs = async (req, res) => {
  try {
    const barangs = await Barang.find();
    res.json(barangs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a specific barang by its idBarang
const getBarangById = async (req, res) => {
  try {
    const barang = await Barang.findById(req.params.id);
    if (barang) {
      res.json(barang);
    } else {
      res.status(404).json({ error: "Barang not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a specific barang by its idBarang
const updateBarangById = async (req, res) => {
  try {
    const barang = await Barang.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (barang) {
      res.json(barang);
    } else {
      res.status(404).json({ error: "Barang not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a specific barang by its idBarang
const deleteBarangById = async (req, res) => {
  try {
    const barang = await Barang.findByIdAndDelete(req.params.id);
    if (barang) {
      res.json({ message: "Barang deleted successfully" });
    } else {
      res.status(404).json({ error: "Barang not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// You can now use the following API endpoints to filter the results:
// - To filter by level: /api/barangs?level=<desired_level>
// - To filter by tanggalTerima: /api/barangs?tanggalTerima=<desired_tanggalTerima>
// - To filter by tanggalKembali: /api/barangs?tanggalKembali=<desired_tanggalKembali>
// - To filter by status: /api/barangs?status=<desired_status>

const getFilteredBarangs = async (req, res) => {
  try {
    const { level, tanggalTerima, tanggalKembali, status } = req.query;
    const filter = {};

    if (level) {
      filter.level = level;
    }
    if (tanggalTerima) {
      filter.tanggalTerima = tanggalTerima;
    }
    if (tanggalKembali) {
      filter.tanggalKembali = tanggalKembali;
    }
    if (status) {
      filter.status = status;
    }

    const barangs = await Barang.find(filter);
    res.json(barangs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { getFilteredBarangs };
