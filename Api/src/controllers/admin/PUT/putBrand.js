const { Brand } = require("../../../db");

const updateBrand = async (id, name) => {
  const brand = await Brand.findByPk(id);

  if (!brand) {
    return { message: "Marca de producto no encontrada" };
  }

  const brandModified = await brand.update({ name });

  return brandModified;
};

const deleteBrand = async (id) => {
  const brand = await Brand.findByPk(id);

  if (!brand) {
    return { message: "Marca de producto no encontrada" };
  }

  let availableTrue = brand.is_available;

  let availableChange = brand.is_available;

  availableChange = availableTrue ? false : true;

  const brandDeleted = await brand.update({
    is_available: availableChange,
  });

  return brandDeleted;
};

module.exports = {
  updateBrand,
  deleteBrand,
};
