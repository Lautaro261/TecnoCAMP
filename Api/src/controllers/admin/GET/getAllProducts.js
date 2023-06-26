const { Product, Inventory, Category, Brand } = require("../../../db");

const getAllProducts = async () => {
  const allProducts = await Product.findAll({
    include: [
      {
        model: Inventory,
        attributes: ["id", "color", "quantity_inventory", "is_available"],
      },
      {
        model: Category,
        attributes: ["name"]
      },
      {
        model: Brand,
        attributes: ["name"]
      }
    ],
  });

  if (allProducts.length === 0) {
    return { message: "No hay productos creados" };
  }

  return allProducts;
};

module.exports = getAllProducts;
