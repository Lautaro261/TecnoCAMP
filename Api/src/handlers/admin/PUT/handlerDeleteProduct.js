const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUser = require("../../../controllers/admin/GET/getUser");
const deleteProduct = require("../../../controllers/admin/PUT/deleteProduct");

const handlerDeleteProduct = async (req, res) => {
  //1) Decodificar token con jwt
  const decoToken = await jwt.verify(req.token, KEY_SECRET);

  //2) Traer usuario y verificar si tiene rol Admin
  const user = await getUser(decoToken.sub);

  if (user.rol !== "admin") {
    return res
      .status(404)
      .json({ message: "No cuenta con permisos para realizar la peticion" });
  }

  const { productId, isAvailable } = req.body;

  try {
    // Crear el producto
    const modifiedProduct = await deleteProduct(productId, isAvailable);

    res.status(200).json(modifiedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerDeleteProduct;
