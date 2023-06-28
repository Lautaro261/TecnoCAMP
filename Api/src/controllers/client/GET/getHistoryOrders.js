const { Product, Inventory, Cart, Order } = require("../../../db");
const { Op } = require("sequelize");

const getHistoryOrders = async (userId) => {
  const orders = await Order.findAll({
    where: {
      userSub: userId,
      payment_status: "approved",
      payment_transaction_id: { [Op.not]: null },
    },
    attributes: [
      "id",
      "payment_transaction_id",
      "payment_date",
      "shipping_status",
      "userSub",
      "cartId",
      "total_quantity_all_products",
      "total_amount_all_products",
    ],
    order: [["payment_date", "DESC"]],
  });

  const ordersAndProducts = [];

  for (const order of orders) {
    const cartId = order.cartId;

    const products = await Cart.findAll({
      where: {
        idCart: cartId,
      },
      attributes: ["quantity_unit_product"],
      include: [
        {
          model: Product,
          attributes: ["id", "name", "price", "photo", "product_description"],
        },
        {
          model: Inventory,
          attributes: ["id", "color"],
        },
      ],
    });

    ordersAndProducts.push({ order, products });
  }

  return ordersAndProducts;
};

module.exports = getHistoryOrders;
