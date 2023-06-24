const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUser = require("../../../controllers/admin/GET/getUser");
const postCreateCart = require("../../../controllers/client/POST/postCreateCart");

const handlerCreateCart = async (req, res) => {
  //1) Decodificar token con jwt
  const decoToken = await jwt.verify(req.token, KEY_SECRET); // {sub, email, rol}

  //2) Traer usuario y verificar si tiene rol Admin
  const user = await getUser(decoToken.sub);

  if (user.rol !== "client") {
    return res
      .status(404)
      .json({ message: "No cuenta con permisos para realizar la peticion" });
  }

  //const { userSub } = req.body;

  try {
    // Crear el producto
    const newCart = await postCreateCart(decoToken.sub);

    if (newCart) {
      res.status(200).json(newCart);
    }
    if (!newCart) {
      res.status(202).json({
        message: "El usuario ya tiene un carrito activo",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerCreateCart;
