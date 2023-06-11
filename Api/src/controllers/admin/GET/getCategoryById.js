const { Category } = require("../../../db");

const getCategoryById = async (categoryId) => {
  const categoria = await Category.findByPk(categoryId);

  if (!categoria) {
    return { message: "Categoría no encontrada" };
  }

  return categoria;
};

module.exports = getCategoryById;
