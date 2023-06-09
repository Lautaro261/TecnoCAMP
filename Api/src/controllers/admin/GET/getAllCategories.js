const { Category } = require("../../../db");

const getAllCategories = async () => {
  const categories = await Category.findAll({
    attributes: ["id", "name", "is_available"],
    order: [["name", "ASC"]],
  });
  if (categories.length === 0) {
    return { message: "No hay categorias creadas" };
  }
  return categories;
};

module.exports = getAllCategories;
