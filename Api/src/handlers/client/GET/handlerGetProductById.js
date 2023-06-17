const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUser = require("../../../controllers/admin/GET/getUser");
const getProductById = require("../../../controllers/client/GET/getProductById");

const handlerGetProductById = async (req, res) => {
  const { id } = req.params;

  try {
    // Obtener el producto por su ID
    const product = await getProductById(id);

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerGetProductById;
