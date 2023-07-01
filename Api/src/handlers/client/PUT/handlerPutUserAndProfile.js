const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUser = require("../../../controllers/admin/GET/getUser");
const putUserAndProfile = require("../../../controllers/client/PUT/putUserAndProfile");
const getUserAndProfile = require("../../../controllers/client/GET/getUserAndProfile");

const handlerPutUserAndProfile = async (req, res) => {
  //1) Decodificar token con jwt
  try {
    const decoToken = await jwt.verify(req.token, KEY_SECRET);
    //2) Traer usuario y verificar si tiene rol Admin

    const user = await getUser(decoToken.sub);

    if (!user) {
      return res
        .status(404)
        .json({ message: `No existe usuario con email ${email}` });
    }

    await putUserAndProfile(req.body, decoToken.sub);

    const userAndProfile = await getUserAndProfile(decoToken.sub);

    res.status(200).json(userAndProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerPutUserAndProfile;
