const getBrandProducts = require("../../../controllers/client/GET/getBrandProducts");

const handlerFilterBrand = async (req, res) => {
  const id = req.body.id;
  try {
    const filterBrand = await getBrandProducts(id);
    res.status(200).json(filterBrand);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = handlerFilterBrand;
