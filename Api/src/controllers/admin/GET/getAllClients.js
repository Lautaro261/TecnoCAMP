const { User } = require("../../../db");

const getAllClients = async () => {
  const rolName = "client";

  const allClients = await User.findAll({
    where: { rol: rolName },
    attributes: ["sub", "name", "email", "rol", "photo"],
  });

  if (!allClients) {
    return null;
  }

  return allClients;
};

module.exports = getAllClients;
