const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const postCreateUser = require("../../../controllers/admin/POST/postCreateUser");

const handlerCreateUser = async (req, res) => {
  const { sub, email, password } = req.body;

  try {
    const newUser = await postCreateUser(req.body);

    if (!newUser) {
      return res
        .status(404)
        .json({ message: `El usuario con el email ${email}, ya existe` });
    }

    if (newUser) {
      jwt.sign({ sub, email }, KEY_SECRET, (err, token) => {
        res.status(200).json({
          message: "¡Usuario creado correctamente!",
          token: token,
          rol: newUser.dataValues.rol,
          erased: newUser.dataValues.erased,
          photo: newUser.dataValues.photo,
          name: newUser.dataValues.name
        });
      });
    } else {
      res.status(404).json({ message: "¡Credenciales Incorrectas!" });
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message  });
  }
};

module.exports = handlerCreateUser;
