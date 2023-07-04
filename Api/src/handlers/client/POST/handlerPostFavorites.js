const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUser = require("../../../controllers/admin/GET/getUser");
const postFavorites =  require("../../../controllers/client/POST/postFavorites");

const handlerPostFavorites = async(req, res)=>{
  const { productId, favorite } = req.body;
  const decoToken = await jwt.verify(req.token, KEY_SECRET);

  const user = await getUser(decoToken.sub);

  if (user.rol !== "client") {
    return res
      .status(404)
      .json({ message: "No cuenta con permisos para realizar la peticion" });
  }

  try {
    const addFavorites = await postFavorites(favorite, decoToken.sub, productId);

    if(!addFavorites){
        res.status(201).json({message: `El producto ${productId}, ya esta en favoritos`})
    }else{
        
        res.status(200).json(addFavorites);
    }

  } catch (error) {
    res.status(400).json({error : error.message});
  }

}

module.exports = handlerPostFavorites;