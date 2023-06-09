const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUser = require("../../../controllers/admin/GET/getUser");
const {
  updateCategory,
  deleteCategory,
} = require("../../../controllers/admin/PUT/putCategory");

const handlerUpdateCategory = async (req, res) => {
  const { id, name } = req.body;

  //1) Decodificar token con jwt
  const decoToken = await jwt.verify(req.token, KEY_SECRET);

  //2) Traer usuario y verificar si tiene rol Admin
  const user = await getUser(decoToken.sub);

  if (user.rol !== "admin") {
    return res
      .status(404)
      .json({ message: "No cuenta con permisos para realizar la peticion" });
  }

  try {
    const categoryModified = await updateCategory(id, name);

    res.status(200).json({
      categoryModified,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handlerDeleteCategory = async (req, res) => {
  const { id } = req.body;

  //1) Decodificar token con jwt
  const decoToken = await jwt.verify(req.token, KEY_SECRET);

  //2) Traer usuario y verificar si tiene rol Admin
  const user = await getUser(decoToken.sub);

  if (user.rol !== "admin") {
    return res
      .status(404)
      .json({ message: "No cuenta con permisos para realizar la peticion" });
  }

  try {
    const categoryDeleted = await deleteCategory(id);

    res.status(200).json({
      categoryDeleted,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  handlerUpdateCategory,
  handlerDeleteCategory,
};
