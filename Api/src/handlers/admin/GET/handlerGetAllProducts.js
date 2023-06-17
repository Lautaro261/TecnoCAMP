const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUser = require("../../../controllers/admin/GET/getUser");
const getAllProducts = require("../../../controllers/admin/GET/getAllProducts");

const handlerGetAllProducts = async (req, res) => {
  //1) Decodificar token con jwt
  const decoToken = await jwt.verify(req.token, KEY_SECRET);

  //2) Traer usuario y verificar si tiene rol Admin
  const user = await getUser(decoToken.sub);

  if (user.rol !== "admin") {
    return res
      .status(404)
      .json({ message: "No cuenta con permisos para realizar la peticion" });
  }

  const { name } = req.query;

  try {
    const allProducts = await getAllProducts();
    if (name) {
      let productName = await allProducts.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      productName.length
        ? res.status(200).send(productName)
        : res.status(202).send("No se encuentra el producto");
    } else {
      res.status(200).json(allProducts);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerGetAllProducts;
