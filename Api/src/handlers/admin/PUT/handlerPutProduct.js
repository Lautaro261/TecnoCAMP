const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUser = require("../../../controllers/admin/GET/getUser");
const updateProduct = require("../../../controllers/admin/PUT/putProduct");

const handlerUpdateProduct = async (req, res) => {
  //1) Decodificar token con jwt
  const decoToken = await jwt.verify(req.token, KEY_SECRET);

  //2) Traer usuario y verificar si tiene rol Admin
  const user = await getUser(decoToken.sub);

  if (user.rol !== "admin") {
    return res
      .status(404)
      .json({ message: "No cuenta con permisos para realizar la peticion" });
  }

  const { id } = req.params;

  const {
    name,
    price,
    photo,
    product_description,
    e_product_type,
    is_available,
    product_favorite,
   /*  categoryId,
    brandId, */
    inventoryItems,
  } = req.body;

  try {
    // Crear el producto
    const modifiedProduct = await updateProduct(
      id,
      name,
      price,
      photo,
      product_description,
      e_product_type,
      is_available,
      product_favorite,
    /*   categoryId,
      brandId, */
      inventoryItems
    );

    res.status(200).json(modifiedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerUpdateProduct;
