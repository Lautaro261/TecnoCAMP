const { Product } = require("../../../db");

const getNumberInventories = async () => {
  const totalProductReferenceNumber = await Product.count({
    where: {
      is_available: true,
    },
  });

  const totalNumberOfProducts = await Product.sum("total_quantity_inventory", {
    where: {
      is_available: true,
    },
  });
  return { totalProductReferenceNumber, totalNumberOfProducts };
};

module.exports = getNumberInventories;
