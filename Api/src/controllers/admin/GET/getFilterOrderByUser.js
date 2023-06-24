const { Order, User } = require("../../../db");
const { Op } = require("sequelize");
const sequelize = require("sequelize");

const getFilterOrderByUser = async () => {
  // Obtener todos los clientes con el rol "Client"
  const clients = await User.findAll({
    where: {
      // Solo clientes
      rol: "client",
      // Que no esten baneados
      erased: {
        [Op.not]: true,
      },
    },
    include: [
      {
        model: Order,
        where: {
          payment_status: "approved",
          payment_transaction_id: {
            [Op.not]: null,
          },
        },
        attributes: [],
      },
    ],
    // Filtro para que muestre solo los userSub que tengas minimo 1 orden pagada
    group: ["user.sub"],
    having: sequelize.literal("COUNT(orders.id) >= 1"),
  });

  if (clients.length === 0) {
    return { message: "No hay clientes con ordenes pagadas" };
  }

  // Array para almacenar los datos filtrados de cada cliente
  const clientsData = [];

  // Recorrer todos los clientes y obtener los datos filtrados para cada uno
  for (const client of clients) {
    // Cada userSub va a ser un cliente diferente
    let userSub = client.sub;

    // Filtrar por usuario y obtener el número de órdenes pagadas
    const totalNumberOfOrdesPaid = await Order.count({
      where: {
        userSub,
        payment_status: "approved",
        payment_transaction_id: {
          [Op.not]: null,
        },
      },
    });

    // Filtrar por usuario y obtener la suma total de la columna "total_quantity_all_products" de todas las órdenes pagadas
    const totalNumberProductsPurchased = await Order.sum(
      "total_quantity_all_products",
      {
        where: {
          userSub,
          payment_status: "approved",
          payment_transaction_id: {
            [Op.not]: null,
          },
        },
      }
    );

    // Filtrar por usuario y obtener la suma total de la columna "total_amount_all_products" de todas las órdenes pagadas
    const totalAmountMoneyPaid = await Order.sum("total_amount_all_products", {
      where: {
        userSub,
        payment_status: "approved",
        payment_transaction_id: {
          [Op.not]: null,
        },
      },
    });

    // Agregar los datos filtrados del cliente al array
    clientsData.push({
      userSub,
      totalNumberOfOrdesPaid,
      totalNumberProductsPurchased,
      totalAmountMoneyPaid,
    });
  }

  return clientsData;
};

module.exports = getFilterOrderByUser;
