const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const { User } = require("../../../db");
const getUser = require("../../../controllers/admin/GET/getUser");
const deleteUser = require("../../../controllers/admin/PUT/deleteUser");

const handlerDeleteUser = async (req, res) => {
  const { sub } = req.body;

  try {
    //1) Decodificar token con jwt
    const decoToken = await jwt.verify(req.token, KEY_SECRET);
    //2) Traer usuario y verificar si tiene rol Admin
    const user = await getUser(decoToken.sub);

    if (user.rol !== "admin") {
      return res
        .status(404)
        .json({ message: "No cuenta con permisos para realizar la peticion" });
    }
    const userDelet = await deleteUser(sub, "erased");

    if (userDelet) {
      const updatedUser = await User.findOne({ where: { sub: sub } }); // Traemos el usuario modificado

      res.status(200).json({
        message: `¡Se ha baneado correctamente el usuario ${sub}!`,
        erased: !!updatedUser.erased, // Convierte el valor a booleano
      });
    } else {
      res.status(404).json({ message: `No se encontro el usuario ${sub}` });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerDeleteUser;
