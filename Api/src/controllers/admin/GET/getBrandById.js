const { Brand } = require("../../../db");

const getBrandById = async (brandId) => {
  const marca = await Brand.findByPk(brandId);

  if (!marca) {
    return { message: "Marca no encontrada" };
  }

  return marca;
};

module.exports = getBrandById;
