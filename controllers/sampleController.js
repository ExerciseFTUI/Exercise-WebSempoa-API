export const getAllSample = async (req, res) => {
  try {
    //Find All Sample

    //Response
    res.status(200).json({ data: ["sample1", "sample2"] });
  } catch (error) {
    //Status error menyesuaikan
    //Untuk send error masih blm fix selalu gini
    res.status(404).json({ message: error.message });
  }
};
