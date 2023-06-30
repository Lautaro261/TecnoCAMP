const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const postCreateUser = require("../../../controllers/admin/POST/postCreateUser");

const handlerCreateUser = async (req, res) => {
  const { sub, email, password } = req.body;

  try {
    const newUser = await postCreateUser(sub, email, password);

    if (!newUser) {
      return res
        .status(202)
        .json({ message: `El usuario con el email ${email}, ya existe` });
    }

    if (newUser) {
      jwt.sign({ sub, email }, KEY_SECRET, (err, token) => {
        res.status(200).json({
          message: "¡Usuario creado correctamente!",
          rol: newUser.dataValues.rol,
          token: token,
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
