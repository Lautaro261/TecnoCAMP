const getAllBrands = require("../../../controllers/client/GET/getAllBrands");

const handlerGetAllBrands = async (req, res) => {
  try {
    const allBrands = await getAllBrands();

    res.status(200).json(allBrands);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerGetAllBrands;
