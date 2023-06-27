const { Order, Department, Municipality } = require("../../../db");
const { Op } = require("sequelize");

const getAllApprovedOrders = async () => {
  // Obtener todas las órdenes pagadas con estado "approved"
  const allOrders = await Order.findAll({
    where: {
      payment_status: "approved",
      payment_transaction_id: {
        [Op.not]: null,
      },
      shipping_status: { [Op.or]: ["Por revisar", "Despachado", "En camino"] },
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

  if (ordersDelivered.length === 0) {
    return { message: "Aún no hay ordenes entregadas" };
  }

  return ordersDelivered;
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

  return {
    totalNumberOrders,
    totalSalesRevenue,
    totalProductsSold,
  };
};

module.exports = { getAllApprovedOrders, getDataOfOrders, getHistoryOfOrders };
