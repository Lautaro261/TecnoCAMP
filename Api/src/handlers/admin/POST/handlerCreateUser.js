const postCreateUser = require("../../../controllers/admin/POST/postCreateUser");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;

const handlerCreateUser = async (req, res) => {
  try {
    const { sub, email, password } = req.body;

    const newUser = await postCreateUser(sub, email, password);

    if (!newUser) {
      res.status(404).json({ message: `El usuario con el email ${email}, Ya existe` });
    }

    //console.log(newUser.dataValues.rol)

    jwt.sign({ sub, email }, KEY_SECRET, (err, token) => {
      res.status(200).json({
        message: `Usuario creado correctamente`,
        rol: newUser.dataValues.rol,
        token: token,
      });
    });
  } catch (error) {
    res.status(400).json({ message: "No se pudo crear usuario", error: error.message });
  }
};

module.exports = handlerCreateUser;
