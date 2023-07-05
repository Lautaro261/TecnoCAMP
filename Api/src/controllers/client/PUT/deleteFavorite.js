const { Favorite } = require("../../../db");

const deleteFavorite = async (id_favorite) => {
  const favorite = await Favorite.findByPk(id_favorite);

  if (!favorite) {
    return null;
  }

  favorite.favorite = !favorite.favorite; 

  await favorite.save();

  return true;
};

module.exports = deleteFavorite;
