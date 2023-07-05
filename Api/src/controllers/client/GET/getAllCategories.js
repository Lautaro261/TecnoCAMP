const { Category } = require("../../../db");

const getAllCategories = async () => {
  const categories = await Category.findAll({
    attributes: ["id", "name", "is_available"],
    where: {
      is_available: true
    },
    order: [["name", "ASC"]],
  });

  if (categories.length === 0) {
    return { message: "No hay categorias disponibles" };
  }

  return categories;
};

module.exports = getAllCategories;


