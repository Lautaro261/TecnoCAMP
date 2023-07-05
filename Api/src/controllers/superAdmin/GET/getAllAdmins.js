const { User } = require("../../../db");

const getAllAdmins = async () => {
  const rolName = "admin";

  const allAdmin = await User.findAll({
    where: { rol: rolName },
    attributes: ["sub", "name", "email", "rol", "photo","erased"],
  });

  if (allAdmin.length === 0) {
    return { message: "No hay admins creados" };
  }

  return allAdmin;
};

module.exports = getAllAdmins;
