const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUser = require("../../../controllers/admin/GET/getUser");
const postCreateProduct = require("../../../controllers/admin/POST/postCreateProduct");

const handlerCreateProduct = async (req, res) => {
  //1) Decodificar token con jwt
  const decoToken = await jwt.verify(req.token, KEY_SECRET);

  //2) Traer usuario y verificar si tiene rol Admin
  const user = await getUser(decoToken.sub);

  if (user.rol !== "admin") {
    return res
      .status(404)
      .json({ message: "No cuenta con permisos para realizar la peticion" });
  }

  const {
    name,
    price,
    price_promotion,
    photo,
    product_description,
    colors,
    quantities,
    e_product_type,
    total_quantity_inventory,
    is_available,
    product_favorite,
    categoryId,
    brandId,
  } = req.body;

  try {
    // Crear el producto
    const newProduct = await postCreateProduct(
      name,
      price,
      price_promotion,
      photo,
      product_description,
      colors,
      quantities,
      e_product_type,
      total_quantity_inventory,
      is_available,
      product_favorite,
      categoryId,
      brandId
    );

    res.status(200).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerCreateProduct;
