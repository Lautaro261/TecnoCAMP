const { Brand } = require("../../../db");

const getAllBrands = async () => {
  const allBrands = await Brand.findAll({
    attributes: ["id", "name", "is_available"],
    where: {
      is_available: true
    },
    order: [["name", "ASC"]],
  });
  if (allBrands.length === 0) {
    return { message: "No hay marcas creadas" };
  }
  return allBrands;
};

module.exports = getAllBrands;
