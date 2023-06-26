const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUser = require("../../../controllers/admin/GET/getUser");
const getFilterOrderByUser = require("../../../controllers/admin/GET/getFilterOrderByUser");

const handlerGetFilterOrderByUser = async (req, res) => {
  //1) Decodificar token con jwt
  const decoToken = await jwt.verify(req.token, KEY_SECRET);

  //2) Traer usuario y verificar si tiene rol Admin
  const user = await getUser(decoToken.sub);

  if (user.rol !== "admin") {
    return res
      .status(404)
      .json({ message: "No cuenta con permisos para realizar la peticion" });
  }
  try {
    const ordersByUser = await getFilterOrderByUser();

    res.status(200).json(ordersByUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerGetFilterOrderByUser;
