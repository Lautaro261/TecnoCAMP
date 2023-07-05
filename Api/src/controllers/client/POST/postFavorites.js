const { Favorite } = require("../../../db");

const postFavorites = async (userSub, productId) => {
  const existingFavorite = await Favorite.findOne({
    where: {
      productId: productId,
      userSub: userSub
    }
  });

  if (!existingFavorite) {
    const newFavorite = await Favorite.create({
      userSub: userSub,
      productId: productId,
      favorite: true // Se crea automáticamente con el valor true
    });

    return newFavorite;
  } else {
    const updatedFavorite = await Favorite.update(
      {
        favorite: existingFavorite.favorite ? false : true
      }, // Modifica el atributo favorite: true -> false, false -> true
      {
        where: {
          productId: productId,
          userSub: userSub
        },
        returning: true // Devuelve el registro actualizado
      }
    );

    return updatedFavorite[1][0]; // Devuelve el primer registro actualizado
  }
};

module.exports = postFavorites;

