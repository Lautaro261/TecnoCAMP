const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUser = require("../../../controllers/admin/GET/getUser");
const postCreateOrderMP = require("../../../controllers/client/POST/postCreateOrderMP");

const handlerCreateOrderMP = async (req, res) => {
  //1) Decodificar token con jwt
  const decoToken = await jwt.verify(req.token, KEY_SECRET);

  //2) Traer usuario y verificar si tiene rol Admin
  const user = await getUser(decoToken.sub);

  if (user.rol !== "client") {
    return res
      .status(404)
      .json({ message: "No cuenta con permisos para realizar la peticion" });
  }

  const { sub } = req.params;

  const {
    contact_name,
    contact_cellphone,
    departmentId,
    municipalityId,
    address,
    neighborhood,
  } = req.body;

  try {
    // Crear el producto
    const orderData = await postCreateOrderMP(
      sub,
      contact_name,
      contact_cellphone,
      departmentId,
      municipalityId,
      address,
      neighborhood
    );

    res.status(200).json(orderData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerCreateOrderMP;
