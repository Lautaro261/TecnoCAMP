const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUser = require("../../../controllers/admin/GET/getUser");
const getNumberClients = require("../../../controllers/admin/GET/getNumberClients");

const handlerGetNumberClients = async (req, res) => {
  try {
    //1) Decodificar token con jwt
    const decoToken = await jwt.verify(req.token, KEY_SECRET);
    //2) Traer usuario y verificar si tiene rol Admin
    const user = await getUser(decoToken.sub);

    if (user.rol !== "admin") {
      return res
        .status(404)
        .json({ message: "No cuenta con permisos para realizar la peticion" });
    }
    const sumClientsActives = await getNumberClients();
    res.status(200).json(sumClientsActives);
  } catch (error) {
    res.status(400).json({ message: "No se entró número de clientes" });
  }
};

module.exports = handlerGetNumberClients;
