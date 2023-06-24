const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUser = require("../../../controllers/admin/GET/getUser");
const postNotificationMP = require("../../../controllers/client/POST/postNotificationMP");

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

  const { preference_id, collection_id, collection_status } = req.query;

  try {
    // Crear el producto
    const updateStatusAndStock = await postNotificationMP(
      preference_id,
      collection_id,
      collection_status
    );

    if (updateStatusAndStock) {
      res.status(200).json(updateStatusAndStock);
    } else {
      res.status(200).send({
        message: "¡Los estados y el stock ya se actualizaron correctamente!",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerCreateOrderMP;
