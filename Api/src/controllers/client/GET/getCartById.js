const { Product, Inventory, Cart } = require("../../../db");

const getCartById = async (cartId) => {
  // Verificar si el carrito existe
  const cart = await Cart.findByPk(cartId);
  if (!cart) {
    return {
      message: "Carrito no existe",
    };
  }

  // Obtener todos los productos asociados al carrito
  const products = await cart.getProducts({
    attributes: ["id", "name", "price"],
  });

  return products;
};

module.exports = getCartById;
