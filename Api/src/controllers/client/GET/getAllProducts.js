const { Product, Inventory } = require("../../../db");

const getAllProducts = async () => {
  const allProducts = await Product.findAll({
    include: [
      {
        model: Inventory,
        attributes: ["id", "color", "quantity_inventory", "is_available"],
        through: {
          attributes: [],
        }
      },
    ],
  });

  if (allProducts.length === 0) {
    return { message: "No hay productos creados" };
  }

  return allProducts;
};

module.exports = getAllProducts;
