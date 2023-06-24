const { Product, Inventory, sequelize } = require("../../../db");
const { Op } = require("sequelize");

const getProductById = async (id) => {
  const product = await Product.findOne({
    where: {
      id: id,
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

  if (!product) {
    return { message: "Producto no encontrado" };
  }

  return product;
};

module.exports = getProductById;
