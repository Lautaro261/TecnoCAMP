const { Cart, User } = require("../../../db");

const deleteProductFromCart = async (userSub, productId, inventoryId) => {
  // Validar la existencia del usuario
  const user = await User.findOne({ where: { sub: userSub } });
  if (!user) {
    return { message: "El usuario no existe" };
  }

  // Verificar si el usuario tiene un carrito activo
  const cart = await Cart.findOne({
    where: {
      userSub,
      cart_status: "Por pagar",
    },
  });

  if (!cart) {
    return { message: "El carrito no existe o no está activo" };
  }

  // Verificar si el producto existe en el carrito
  const cartItem = await Cart.findOne({
    where: {
      userSub,
      productId,
      inventoryId,
    },
  });

  if (!cartItem) {
    return { message: "El producto no existe en el carrito" };
  }

  // Eliminar el producto del carrito
  await cartItem.destroy();

  // Actualizar quantity_all_products del carrito
  const uniqueProductCount = await Cart.count({
    where: {
      userSub,
      cart_status: "Por pagar",
    },
    distinct: true,
    col: "inventoryId",
  });

  // Actualizar quantity_all_products en cada registro del carrito
  await Cart.update(
    {
      quantity_all_products: uniqueProductCount,
    },
    {
      where: {
        userSub,
        cart_status: "Por pagar",
      },
    }
  );

  // Actualizar cart_total_amount del carrito
  const allProductsItems = await Cart.findAll({
    where: {
      userSub,
      cart_status: "Por pagar",
    },
  });

  const totalAmountCart = allProductsItems.reduce(
    (acc, item) => acc + item.amount_unit_product,
    0
  );

  // Actualizar cart_total_amount en cada registro del carrito
  await Cart.update(
    {
      cart_total_amount: totalAmountCart,
    },
    {
      where: {
        userSub,
        cart_status: "Por pagar",
      },
    }
  );

  return { message: "El producto ha sido eliminado del carrito exitosamente" };
};

module.exports = deleteProductFromCart;
