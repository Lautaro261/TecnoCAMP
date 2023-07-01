const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUserAndProfile = require("../../../controllers/client/GET/getUserAndProfile");

const handlerProfileByUser = async (req, res) => {
  //1) Decodificar token con jwt
  try {
    const decoToken = await jwt.verify(req.token, KEY_SECRET);
    //2) Traer usuario y verificar si tiene rol Admin

    const user = await getUserAndProfile(decoToken.sub);

    if (!user) {
      return res
        .status(404)
        .json({ message: "No se encontró el perfil del usuario." });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerProfileByUser;
