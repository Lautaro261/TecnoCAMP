const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUser = require("../../../controllers/admin/GET/getUser");
const postCreateAdmin = require("../../../controllers/superAdmin/POST/postCreateAdmin");

const handlerCreateAdmin = async (req, res) => {
  const { sub, email, password } = req.body;
  const hashNum = 10;

  try {
    const decoToken = await jwt.verify(req.token, KEY_SECRET);
    const user = await getUser(decoToken.sub);

    if (user.rol !== "superAdmin") {
      res
        .status(404)
        .json({ message: "No cuenta con permisos para realizar la peticion" });
    }

    const hashPassword = await bcrypt.hash(password, hashNum);
    const newUser = await postCreateAdmin(sub, email, hashPassword);

    jwt.sign({ sub, email }, KEY_SECRET, (err, token) => {
      res.status(200).json({
        message: `Administrador creado correctamente`,
        rol: newUser.dataValues.rol,
        token: token,
      });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerCreateAdmin;
