const { Product, Inventory } = require("../../../db");

const getAllProducts = async () => {
  const allProducts = await Product.findAll({
    attributes: [
      "id",
      "name",
      "price",
      "price_promotion",
      "photo",
      "product_description",
      "e_product_type",
      "total_quantity_inventory",
      "cartId",
      "categoryId",
      "brandId",
    ],
    include: [
      {
        model: Inventory,
        attributes: ["id", "color", "quantity_inventory"],
      },
    ],
  });

  if (allProducts.length === 0) {
    return { message: "No hay productos creados" };
  }

  return allProducts;
};

module.exports = getAllProducts;
