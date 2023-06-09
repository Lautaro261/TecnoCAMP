const { Product, Inventory } = require("../../../db");

const getProductById = async (id) => {
  const products = await Inventory.findAll({
    where: { productId: id },
    attributes: ["id", "color", "quantity_inventory", "productId"],
    include: [
      {
        model: Product,
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
      },
    ],
  });

  if (products.length === 0) {
    return {
      message:
        "No se encontraron productos con el ID proporcionado, revise los datos ingresados",
    };
  }

  return products;
};

module.exports = getProductById;
