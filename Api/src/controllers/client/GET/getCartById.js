const { Cart, Product, Inventory } = require("../../../db");

const getCartById = async (cartId) => {
  // Verificar si el carrito existe por su idCart
  const cart = await Cart.findAll({
    where: {
      idCart: cartId,
    },
    attributes: [
      "idCart",
      "quantity_all_products",
      "cart_total_amount",
      "quantity_unit_product",
      "amount_unit_product",
      "id",
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

  if (!cart) {
    return { message: "El carrito no existe" };
  }

  if (cart.length === 0) {
    return { message: "El carrito no tiene productos agregados" };
  }

  return cart;
};

module.exports = getCartById;
