const { Favorite } =require("../../../db");

const deleteFavorite = async(id_favorite)=>{
    const exist = await Favorite.findByPk(id_favorite);

    if(!exist){
        return null
    }
   
    exist.favorite =! exist.favorite;

    await Favorite.update({favorite: exist.favorite});
    return true;
}

module.exports = deleteFavorite;