const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUser = require("../../../controllers/admin/GET/getUser");
const getHistoryOrders = require("../../../controllers/client/GET/getHistoryOrders");

const handlerGetHistoryOrders = async (req, res) => {
  //1) Decodificar token con jwt
  //const { token } = req.params

  const decoToken = await jwt.verify(req.token, KEY_SECRET);

  //2) Traer usuario y verificar si tiene rol Admin
  const user = await getUser(decoToken.sub);

  if (user.rol !== "client") {
    return res
      .status(404)
      .json({ message: "No cuenta con permisos para realizar la peticion" });
  }

  try {
    // Obtener ordenes pagadas por su ID
    const historyOrders = await getHistoryOrders(decoToken.sub);

    res.status(200).json(historyOrders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerGetHistoryOrders;
