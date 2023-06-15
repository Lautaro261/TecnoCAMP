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
    attributes: ["id", "cart_status", "cart_amount", "quantity_products"],
    include: {
      model: Product,
      attributes: ["id", "name", "price"],
    },
  });

  return carts;
};

module.exports = getUserCarts;
