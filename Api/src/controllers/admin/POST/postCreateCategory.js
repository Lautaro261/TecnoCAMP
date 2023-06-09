const { Category } = require("../../../db");
const { Op } = require("sequelize");

const createCategory = async (name) => {
  // Convertir el nombre de la categoría a minúsculas y eliminar espacios adicionales
  const formattedName = name.toLowerCase().trim();

  // Verificar si ya existe una categoría con el mismo nombre (ignorando mayúsculas, minúsculas y espacios)
  const existingCategory = await Category.findOne({
    where: {
      name: {
        [Op.iLike]: formattedName,
      },
    },
  });

  if (existingCategory) {
    return { message: "Nombre de categoría ya creado" };
  }

  // Crear nueva categoria en base de datos
  await Category.create({ name });

  // Ordenar la base de datos por orden alfabético
  const sortedCategories = await Category.findAll({
    order: [["name", "ASC"]],
  });

  return sortedCategories;
};

module.exports = createCategory;
