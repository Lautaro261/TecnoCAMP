const { User, Product, Inventory, Cart } = require("../../../db");

const getUserCarts = async (userId) => {
  // Verificar si el usuario existe
  const user = await User.findByPk(userId);
  if (!user) {
    return {
      message: "El usuario no existe",
    };
  }

  // Obtener todos los carritos asociados al usuario
  const carts = await Cart.findAll({
    where: {
      userSub: user.sub,
    },
    attributes: [
      "idCart",
      "quantity_all_products",
      "cart_total_amount",
      "quantity_unit_product",
      "amount_unit_product",
      "id",
      "cart_status",
    ],
    // raw: true,
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
        ],
        include: {
          model: Inventory,
          attributes: ["id", "color", "quantity_inventory"],
        },
      },
    ],
    // raw: true,
  });

  if (carts.length === 0) {
    return { message: "El usuario no tiene carritos activos" };
  }

  return carts;
};

module.exports = getUserCarts;
