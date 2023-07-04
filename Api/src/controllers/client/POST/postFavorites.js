const { Favorite } =require("../../../db");

const postFavorites = async(favorite, userSub, productId)=>{

    const exist = await Favorite.findOne({
        where: {
            productId: productId,
            userSub: userSub
        }});

    if(!exist){
        const addFavorite = await Favorite.create({favorite, userSub, productId})
       // console.log(addFavorite);
        return addFavorite;
    }else{
        return null;
    }
}

module.exports = postFavorites;