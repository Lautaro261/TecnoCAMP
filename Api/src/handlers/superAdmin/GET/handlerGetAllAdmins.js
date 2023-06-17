const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUser = require("../../../controllers/admin/GET/getUser");
const getAllAdmins = require("../../../controllers/superAdmin/GET/getAllAdmins");

const handlerGetAllAdmmins = async (req, res) => {
  try {
    //1) Decodificar token con jwt
    const decoToken = await jwt.verify(req.token, KEY_SECRET);
    //2) Traer usuario y verificar si tiene rol Admin
    const user = await getUser(decoToken.sub);

    if (user.rol !== "superAdmin") {
      return res
        .status(404)
        .json({ message: "No cuenta con permisos para realizar la peticion" });
    }
    //3) Traer todos los usuarios con rol Client
    const AllAdmins = await getAllAdmins();
    if (AllAdmins) {
      res.status(200).json(AllAdmins);
    } else {
      res.status(404).json({ message: "¡Credenciales incorrectas!" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = handlerGetAllAdmmins;
