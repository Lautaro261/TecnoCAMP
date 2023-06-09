const { User } = require("../../../db");

const getAllClients = async () => {
  const rolName = "client";

  const allClients = await User.findAll({
    where: { rol: rolName },
    attributes: ["sub", "name", "email", "rol", "photo"],
  });

  if (allClients.length === 0) {
    return { message: "No hay clientes creados" };
  }

  return allClients;
};

module.exports = getAllClients;
