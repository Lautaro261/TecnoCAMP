const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUser = require("../../../controllers/admin/GET/getUser");
const {
  getAllApprovedOrders,
  getDataOfOrders,
  getHistoryOfOrders,
} = require("../../../controllers/admin/GET/getAllApprovedOrders");

const handlerGetAllApprovedOrders = async (req, res) => {
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
    const allOrders = await getAllApprovedOrders();

    res.status(200).json(allOrders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handlerGetHistoryOfOrders = async (req, res) => {
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
    const ordersDelivered = await getHistoryOfOrders();

    res.status(200).json(ordersDelivered);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handlerGetDataOfOrders = async (req, res) => {
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
    const dataOrders = await getDataOfOrders();

    res.status(200).json(dataOrders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  handlerGetAllApprovedOrders,
  handlerGetDataOfOrders,
  handlerGetHistoryOfOrders,
};
