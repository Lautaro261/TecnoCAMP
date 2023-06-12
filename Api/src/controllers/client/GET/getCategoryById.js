const { Category } = require("../../../db");

const getCategoryById = async (categoryId) => {
  const category = await Category.findByPk(categoryId);

  if (!category) {
    return { message: "Categoría no encontrada" };
  }

  return category;
};

module.exports = getCategoryById;
