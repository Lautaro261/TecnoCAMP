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
      return res
        .status(404)
        .json({ message: "No cuenta con permisos para realizar la peticion" });
    }

    const hashPassword = await bcrypt.hash(password, hashNum);
    const newUser = await postCreateAdmin(sub, email, hashPassword);

    if (!newUser) {
      return res
        .status(404)
        .json({ message: `El administrador con el email ${email}, ya existe` });
    }

    if (newUser) {
      jwt.sign({ sub, email }, KEY_SECRET, (err, token) => {
        res.status(200).json({
          message: "¡Administrador creado correctamente!",
          rol: newUser.dataValues.rol,
          token: token,
        });
      });
    } else {
      res.status(404).json({ message: "¡Credenciales Incorrectas!" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerCreateAdmin;
