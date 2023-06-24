const { Product, Inventory } = require("../../../db");
const { Op } = require("sequelize");

const getAllProducts = async () => {
  const allProducts = await Product.findAll({
    where: {
      categoryId: {
        [Op.not]: null,
      },
      brandId: {
        [Op.not]: null,
      },
    },
    include: [
      {
        model: Inventory,
        attributes: ["id", "color", "quantity_inventory", "is_available"],
      },
    ],
  });

  if (allProducts.length === 0) {
    return { message: "No hay productos creados" };
  }

  return allProducts;
};

module.exports = getAllProducts;
