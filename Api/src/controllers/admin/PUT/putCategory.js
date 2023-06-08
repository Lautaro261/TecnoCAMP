const { Category } = require("../../../db");

const updateCategory = async (id, name) => {
  const category = await Category.findByPk(id);

  if (!category) {
    return { message: "Categoría no encontrada" };
  }

  const categoryModified = await category.update({ name });

  return categoryModified;
};

const deleteCategory = async (id) => {
  const category = await Category.findByPk(id);

  if (!category) {
    return { message: "Categoría no encontrada" };
  }

  let availableTrue = category.is_available;

  let availableChange = category.is_available;

  availableChange = availableTrue ? false : true;

  const categoryDeleted = await category.update({
    is_available: availableChange,
  });

  return categoryDeleted;
};

module.exports = {
  updateCategory,
  deleteCategory,
};
