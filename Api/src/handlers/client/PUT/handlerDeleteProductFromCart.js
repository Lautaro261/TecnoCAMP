const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUser = require("../../../controllers/admin/GET/getUser");
const deleteProductFromCart = require("../../../controllers/client/PUT/deleteProductFromCart");

const handlerDeleteProductFromCart = async (req, res) => {
  //1) Decodificar token con jwt
  const decoToken = await jwt.verify(req.token, KEY_SECRET);

  //2) Traer usuario y verificar si tiene rol Admin
  const user = await getUser(decoToken.sub);

  if (user.rol !== "client") {
    return res
      .status(404)
      .json({ message: "No cuenta con permisos para realizar la peticion" });
  }

  const { userSub, productId, inventoryId } = req.body;

  try {
    // Crear el producto
    const cartWithProduct = await deleteProductFromCart(
      userSub,
      productId,
      inventoryId
    );

    res.status(200).json(cartWithProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerDeleteProductFromCart;
