const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUser = require("../../../controllers/admin/GET/getUser");
const createBrand = require("../../../controllers/admin/POST/postCreateBrand");

const handlerCreateBrand = async (req, res) => {
  const { name } = req.body;

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
    //3) Resto de logica del handler
    const newBrand = await createBrand(name);

    res.status(200).json(newBrand);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerCreateBrand;
