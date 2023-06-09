const { Brand } = require("../../../db");
const { Op } = require("sequelize");

const createBrand = async (name) => {
  // Convertir el nombre de la marca a minúsculas y eliminar espacios adicionales
  const formattedName = name.toLowerCase().trim();

  // Verificar si ya existe una marca con el mismo nombre (ignorando mayúsculas, minúsculas y espacios)
  const existingBrand = await Brand.findOne({
    where: {
      name: {
        [Op.iLike]: formattedName,
      },
    },
  });

  if (existingBrand) {
    return { message: "Nombre de marca ya creado" };
  }

  // Crear nueva marca en base de datos
  await Brand.create({ name });

  // Ordenar la base de datos por orden alfabético
  const sortedBrand = await Brand.findAll({
    order: [["name", "ASC"]],
  });

  return sortedBrand;
};

module.exports = createBrand;
