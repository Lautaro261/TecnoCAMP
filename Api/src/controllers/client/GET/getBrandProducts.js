const { Product } = require("../../../db");

const getBrandProducts = async (id) => {
  const filterBrand = await Product.findAll({ where: { brandId: id } });

  if (!filterBrand) {
    return { message: "No existe productos relacionados con esa Categoria" };
  }

  return filterBrand;
};

module.exports = getBrandProducts;
