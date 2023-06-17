const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUser = require("../../../controllers/admin/GET/getUser");
const getAdminById = require("../../../controllers/superAdmin/GET/getAdminById");

const handlerGetAdminById = async (req, res) => {
  const { sub } = req.params;

  try {
    const decoToken = await jwt.verify(req.token, KEY_SECRET);
    const user = await getUser(decoToken.sub);

    if (user.rol !== "superAdmin") {
      return res
        .status(404)
        .json({ message: "No cuenta con permisos para realizar la peticion" });
    }

    const userAndProfile = await getAdminById(sub);

    if (userAndProfile) {
      res.status(200).json(userAndProfile);
    } else {
      res.status(202).json({ message: `No se encontro user con id: ${sub}` });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = handlerGetAdminById;
