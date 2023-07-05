const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const { User } = require("../../../db");
const getUser = require("../../../controllers/admin/GET/getUser");
const deleteAdmin = require("../../../controllers/superAdmin/PUT/deleteAdmin");

const handlerDeleteAdmin = async (req, res) => {
  const { sub } = req.body;

  try {
    //1) Decodificar token con jwt
    const decoToken = await jwt.verify(req.token, KEY_SECRET);
    //2) Traer usuario y verificar si tiene rol Admin
    const user = await getUser(decoToken.sub);

    if (user.rol !== "superAdmin") {
      return res
        .status(404)
        .json({ message: "No cuenta con permisos para realizar la peticion" });
    }
    const adminDelete = await deleteAdmin(sub, "erased");

    if (adminDelete) {
      const updatedAdmin = await User.findOne({ where: { sub: sub } }); // Traemos el usuario modificado

      res.status(200).json({
        message: `¡Se ha baneado correctamente el usuario ${sub}!`,
        erased: !!updatedAdmin.erased, // Convierte el valor a booleano
      });
    } else {
      res.status(404).json({ message: `No se encontro el usuario ${sub}` });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerDeleteAdmin;
