// Modelos de base de base de datos
const { Order, Cart, Product, Inventory } = require("../../../db");
const postCreateCart = require("../../client/POST/postCreateCart"); // importar la función createCart
const { Op } = require("sequelize");
// const sendPaymentStatusEmail = require("../notificationEmail");

// Controlador handlerNotification
const postNotificationMP = async (
  preference_id,
  collection_id,
  collection_status
) => {
  // Buscar todas las reserva correspondientes en la base de datos
  const order = await Order.findOne({
    where: {
      preference_id: preference_id,
      payment_status: { [Op.or]: ["pending", "rejected"] },
    },
  });

  if (!order) {
    return {
      message: "El numero de preferencia no corresponde al de la orden",
    };
  }

  // Actualizar el estado de pago de la reserva a "approved"
  order.payment_status = collection_status;
  order.payment_transaction_id = collection_id;

  if (order.payment_status === "approved") {
    order.shipping_status = "Por revisar";
    // await sendPaymentStatusEmail(order);
  } else {
    order.shipping_status = "En proceso de pago";
    order.payment_status = "rejected";
    // await sendPaymentStatusEmail(order);
  }

  // Guardar cambios en el modelo Orden
  await order.save();

  // Verificamos que el estado del pago este aprobado
  if (
    order.payment_status === "approved" &&
    order.payment_transaction_id !== null
  ) {
    // Actualizar el estado de todos los registro del carrito del usuario a "Pagado"
    await Cart.update(
      { cart_status: "Pagado" },
      {
        where: {
          userSub: order.userSub,
          cart_status: { [Op.or]: ["Vacio", "Por pagar"] },
        },
        returning: true, // Devolver las filas actualizadas para verificar el estado del carrito
      }
    );

    // Verificar si todos los registros del carrito con el mismo userSub están en "Pagado"
    const cartCount = await Cart.count({
      where: {
        userSub: order.userSub,
        cart_status: { [Op.or]: ["Vacio", "Por pagar"] },
      },
    });

    if (cartCount === 0) {
      // Crear un nuevo carrito si no hay registros de carrito pendientes de pago
      await postCreateCart(order.userSub);
    }

    // Obtener todos los registros de carrito que tienen el mismo userSub y están en "Pagado"
    const cartItems = await Cart.findAll({
      where: {
        userSub: order.userSub,
        cart_status: "Pagado",
        idCart: order.cartId,
      },
    });

    // Actualizar el stock de inventario basado en los productos del carrito
    for (const item of cartItems) {
      const inventory = await Inventory.findOne({
        where: {
          id: item.inventoryId,
          productId: item.productId,
        },
      });

      if (inventory) {
        inventory.quantity_inventory -= item.quantity_unit_product;
        await inventory.save();

        // Actualizar el total_quantity_inventory en el modelo Product
        const product = await Product.findByPk(item.productId);
        if (product) {
          product.total_quantity_inventory -= item.quantity_unit_product;
          await product.save();
        }
        if (inventory.quantity_inventory === 0) {
          inventory.is_available = false;
        }
        if (product.total_quantity_inventory === 0) {
          product.is_available = false;
        }
        await product.save();
      }
    }

    return order;
  }
};

module.exports = postNotificationMP;
