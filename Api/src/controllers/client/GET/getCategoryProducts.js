const { Product } = require("../../../db");

const getCategoryProducts = async (id) => {
  const filterCategory = await Product.findAll({ where: { categoryId: id } });

  if (!filterCategory) {
    return { message: "No existe productos relacionados con esa Categoria" };
  }

  return filterCategory;
};

module.exports = getCategoryProducts;
