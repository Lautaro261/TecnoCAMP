const { Favorite, Product } = require("../../../db");
const getMyFavourites = async(sub)=>{

    const favorites = await Favorite.findAll({
        where: {
            userSub:sub,
            favorite: true
        },
        include: [{model: Product}]
    })
    //console.log(favorites);

    return favorites;
}

module.exports = getMyFavourites;