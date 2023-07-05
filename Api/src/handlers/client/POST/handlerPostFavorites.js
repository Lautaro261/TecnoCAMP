const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUser = require("../../../controllers/admin/GET/getUser");
const getMyFavourites = require("../../../controllers/client/GET/getMyFavourites");
const postFavorites = require("../../../controllers/client/POST/postFavorites");

const handlerPostFavorites = async (req, res) => {
  const { productId } = req.body;
  const decoToken = await jwt.verify(req.token, KEY_SECRET);

  const user = await getUser(decoToken.sub);

  if (user.rol !== "client") {
    return res.status(404).json({
      message: "No cuenta con permisos para realizar la petición"
    });
  }

  try {
    const result = await postFavorites(decoToken.sub, productId);

    if (!result) {
      res
        .status(201)
        .json({ message: `El producto ${productId} ya está en favoritos` });
    } else {

      const favorites = await getMyFavourites(decoToken.sub);
      res.status(200).json(favorites);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerPostFavorites;
