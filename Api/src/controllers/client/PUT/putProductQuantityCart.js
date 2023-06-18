const { Cart, Product, Inventory } = require("../../../db");
const { Op } = require("sequelize");

const putProductQuantityCart = async (
  cartId,
  productId,
  inventoryId,
  quantity
) => {
  // Verificar si el carrito existe
  const cart = await Cart.findOne({ where: { idCart: cartId } });
  if (!cart) {
    return { message: "El carrito no existe" };
  }

  // Verificar si el producto existe en el carrito
  const cartItem = await Cart.findOne({
    where: { idCart: cartId, productId, inventoryId },
  });

  if (!cartItem) {
    return { message: "El producto no existe en el carrito" };
  }

  // Verificar si la cantidad ingresada es válida
  if (quantity <= 0) {
    return { message: "La cantidad de productos no es válida" };
  }

  // Verificar si el producto y color del producto existen en el inventario
  const inventory = await Inventory.findOne({
    where: { id: inventoryId, productId: productId },
  });

  // Verificar si hay suficiente disponibilidad en el inventario del producto seleccionado
  if (!inventory || inventory.quantity_inventory < quantity) {
    return {
      message:
        "No hay suficiente disponibilidad en inventario del producto seleccionado",
    };
  }

  // Actualizar la cantidad unitaria del producto en el carrito
  cartItem.quantity_unit_product = quantity;

  // Actualizar el monto unitario del producto en el carrito
  const product = await Product.findByPk(productId);

  cartItem.amount_unit_product = quantity * product.price;

  // Guardar los cambios en el carrito
  await cartItem.save();

  // Actualizar el total del carrito
  const allProductsItems = await Cart.findAll({
    where: { idCart: cartId },
  });

  const totalAmountCart = allProductsItems.reduce(
    (acc, item) => acc + item.amount_unit_product,
    0
  );

  // Actualizar el campo cart_total_amount en cada registro del carrito
  await Cart.update(
    {
      cart_total_amount: totalAmountCart,
    },
    {
      where: {
        idCart: cartId,
        cart_status: {
          [Op.or]: ["Por pagar"],
        },
      },
    }
  );

  // Guardar cambios
  await cart.save();

  return cartItem;
};

module.exports = putProductQuantityCart;
