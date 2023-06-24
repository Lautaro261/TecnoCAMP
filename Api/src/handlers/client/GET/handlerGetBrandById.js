const getBrandById = require("../../../controllers/client/GET/getBrandById");

const handlerGetBrandById = async (req, res) => {
  const id = req.params.id;

  try {
    // Obtener el producto por su ID
    const brand = await getBrandById(id);

    res.status(200).json(brand);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerGetBrandById;
