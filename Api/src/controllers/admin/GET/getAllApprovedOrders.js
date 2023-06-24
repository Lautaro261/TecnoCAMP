const { Order } = require("../../../db");
const { Op } = require("sequelize");

const getAllApprovedOrders = async () => {
  // Obtener todas las órdenes pagadas con estado "approved"
  const allOrders = await Order.findAll({
    where: {
      payment_status: "approved",
      payment_transaction_id: {
        [Op.not]: null,
      },
    },
    attributes: [
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
      "departmentId",
      "municipalityId",
    ],
  });

  return allOrders;
};

const getDataOfOrders = async () => {
  // Obtener todas las órdenes pagadas con estado "approved"
  const allOrders = await Order.findAll({
    where: {
      payment_status: "approved",
      payment_transaction_id: {
        [Op.not]: null,
      },
    },
  });

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

module.exports = { getAllApprovedOrders, getDataOfOrders };
