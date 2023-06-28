const { User, Product, Inventory, Cart } = require("../../../db");

const getUserCarts = async (userId) => {
  // Verificar si el usuario existe
  const user = await User.findByPk(userId);
  if (!user) {
    return {
      message: "El usuario no existe",
    };
  }

  // Buscar si el usuario tiene carritos activos
  const carts = await Cart.findAll({
    where: {
      userSub: user.sub,
      cart_status: "Vacio",
    },
  });

  if (carts.length === 0) {
    return { message: "El usuario no tiene carritos activos" };
  }

  // Obtener todos los carritos asociados al usuario
  const cartsWithProducts = await Cart.findAll({
    where: {
      userSub: user.sub,
      cart_status: "Por pagar",
    },
    attributes: [
      "idCart",
      "quantity_all_products",
      "cart_total_amount",
      "quantity_unit_product",
      "amount_unit_product",
      "id",
      "cart_status",
      "productId",
      "inventoryId",
    ],
    order: [
      // Ordenar los productos del carrito por fecha de creación descendente
      ["createdAt", "ASC"],
    ],
    // raw: true,
    include: [
      {
        model: Product,
        attributes: ["id", "name", "price", "photo", "product_description"],
        include: {
          model: Inventory,
          attributes: ["id", "color", "quantity_inventory"],
        },
      },
    ],
    // raw: true,
  });

  if (cartsWithProducts.length === 0) {
    return { message: "El usuario no tiene productos agregados en el carrito" };
  }

  return cartsWithProducts;
};

module.exports = getUserCarts;
