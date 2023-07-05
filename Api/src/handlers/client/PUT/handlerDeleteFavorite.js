const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUser = require("../../../controllers/admin/GET/getUser");
const getMyFavourites = require("../../../controllers/client/GET/getMyFavourites");
const deleteFavorite = require("../../../controllers/client/PUT/deleteFavorite");

const handlerDeleteFavorite = async(req, res)=>{
  const { id_favorite } = req.body;
  const decoToken = await jwt.verify(req.token, KEY_SECRET);

  const user = await getUser(decoToken.sub);

  if (user.rol !== "client") {
    return res
      .status(404)
      .json({ message: "No cuenta con permisos para realizar la peticion" });
  }

  try {
    //console.log(id_favorite)
    const deletefavorite = await deleteFavorite(id_favorite)
    if(!deletefavorite){
      res.status(202).json({message: `No existe en favoritos ${id_favorite}`})
    }
    const favorites = await getMyFavourites(decoToken.sub);

    res.status(200).json(favorites);
  } catch (error) {
    res.status(400).json({error : error.message});
  }

}

module.exports = handlerDeleteFavorite;