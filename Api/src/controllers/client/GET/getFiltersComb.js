const { Op } = require("sequelize");
const { Product } = require("../../../db");

const getFiltersComb = async (idCategory, idBrand = [], minPrice, maxPrice) => {
  const filters = {};

  if (idCategory) {
    filters.categoryId = idCategory;
  }

  if (idBrand) {
    filters.brandId = idBrand;
  }

  if (minPrice && maxPrice) {
    filters.price = {
      [Op.between]: [minPrice, maxPrice],
    };
  }

  const filtersProducts = await Product.findAll({ where: filters });

  return filtersProducts;
};

module.exports = getFiltersComb;
