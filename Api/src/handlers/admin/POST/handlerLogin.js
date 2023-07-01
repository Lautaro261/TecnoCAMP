const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUser = require("../../../controllers/admin/GET/getUser");

const handlerLogin = async (req, res) => {
  const { sub, email, password } = req.body;

  try {
    const user = await getUser(sub);

    if (!user) {
      return res.status(404).json({ message: `No existe usuario con email ${email}` });
    }

    // Caso 1: Credenciales de autenticación con contraseña
    if (password !== undefined && sub === email) {
      const validatePassword = await bcrypt.compare(password, user.password);

      if (validatePassword) {
        const { rol, erased, photo, name } = user;
        const token = generateToken(sub, email, rol);
  
        return res.status(200).json({
          message: "¡Has ingresado correctamente!",
          token,
          rol,
          erased,
          photo,
          name
        });
      }
    }

    // Caso 2: Credenciales de autenticación sin contraseña
    if (password === undefined && sub !== email) {
      const { rol, erased, photo, name } = user;
      const token = generateToken(sub, email, rol);

      return res.status(200).json({
        message: "¡Has ingresado correctamente! (Auth)",
        token,
        rol,
        erased,
        photo,
        name
      });
    }

    // Credenciales incorrectas en ambos casos
    res.status(202).json({ message: "¡Credenciales Incorrectas!" });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Función para generar el token
const generateToken = (sub, email, rol) => {
  const options = {
    expiresIn: "22d", // Cambiar la duración de expiración aquí (30m-1h-2d)
  };

  return jwt.sign({ sub, email, rol }, KEY_SECRET, options);
};

module.exports = handlerLogin;
