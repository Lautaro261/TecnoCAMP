const {
  Product,
  Inventory,
  Order,
  Cart,
  Department,
  Municipality,
} = require("../../../db");
const { Op } = require("sequelize");

const getAllApprovedOrders = async () => {
  // Obtener todas las órdenes pagadas con estado "approved"
  const allOrders = await Order.findAll({
    where: {
      payment_status: "approved",
      payment_transaction_id: {
        [Op.not]: null,
      },
      shipping_status: {
        [Op.or]: ["En preparacion", "Despachado"],
      },
    },
    attributes: [
      "id",
      "userSub",
      "total_amount_all_products",
      "total_quantity_all_products",
      "shipping_status",
      "payment_date",
      "payment_transaction_id",
      "contact_name",
      "contact_cellphone",
      "address",
      "neighborhood",
    ],
    include: [
      {
        model: Department,
        attributes: ["name"],
      },
      {
        model: Municipality,
        attributes: ["name"],
      },
    ],
  });

  if (allOrders.length === 0) {
    return { message: "No hay ordenes activas" };
  }

  return allOrders;
};

const getHistoryOfOrders = async () => {
  // Obtener todas las órdenes pagadas con estado "approved"
  const ordersDelivered = await Order.findAll({
    where: {
      payment_status: "approved",
      payment_transaction_id: {
        [Op.not]: null,
      },
      shipping_status: "Entregado",
    },
    attributes: [
      "id",
      "userSub",
      "total_amount_all_products",
      "total_quantity_all_products",
      "shipping_status",
      "payment_date",
      "payment_transaction_id",
      "contact_name",
      "contact_cellphone",
      "address",
      "neighborhood",
      "cartId",
    ],
    order: [["payment_date", "DESC"]],
    include: [
      {
        model: Department,
        attributes: ["name"],
      },
      {
        model: Municipality,
        attributes: ["name"],
      },
    ],
  });

  const ordersAndProducts = [];

  for (const order of ordersDelivered) {
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

  if (ordersAndProducts.length === 0) {
    return { message: "No hay ordenes entregadas" };
  }

  return ordersAndProducts;
};

const getDataOfOrders = async () => {
  // Obtener el número total de registros de órdenes pagadas
  const totalNumberOrders = await Order.count({
    where: {
      payment_status: "approved",
      payment_transaction_id: {
        [Op.not]: null,
      },
    },
  });

  // Obtener la suma total de la columna "total_amount_all_products" de todas las órdenes pagadas
  const totalSalesRevenue = await Order.sum("total_amount_all_products", {
    where: {
      payment_status: "approved",
      payment_transaction_id: {
        [Op.not]: null,
      },
    },
  });

  // Obtener la suma total de la columna "total_quantity_all_products" de todas las órdenes pagadas
  const totalProductsSold = await Order.sum("total_quantity_all_products", {
    where: {
      payment_status: "approved",
      payment_transaction_id: {
        [Op.not]: null,
      },
    },
  });

  return [{
    totalNumberOrders,
    totalSalesRevenue,
    totalProductsSold,
  }];
};

module.exports = { getAllApprovedOrders, getDataOfOrders, getHistoryOfOrders };
