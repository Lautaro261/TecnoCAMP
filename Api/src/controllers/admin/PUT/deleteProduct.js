const { Product, Inventory } = require("../../../db");

const deleteProduct = async (productId) => {
  // Variable Producto que va a cambiar
  let product;

  // Verificar si el ID proporcionado es de un producto en la tabla "Product" o en la tabla "Inventory"
  if (productId.includes("-")) {
    // ID de un producto en la tabla "Product"
    product = await Product.findByPk(productId);
  } else {
    // ID de un producto en la tabla "Inventory"
    const inventoryItem = await Inventory.findByPk(productId);

    if (inventoryItem) {
      product = await Product.findByPk(inventoryItem.productId);
    }
  }

  if (!product) {
    return { message: "Producto no encontrado" };
  }

  // Actualizar la propiedad "is_available" del producto
  product.is_available = false;

  // Verificar si se deshabilita la disponibilidad del producto
  if (!product.isAvailable) {
    product.total_quantity_inventory = 0; // Establecer el stock total a 0
    product.categoryId = null;
    product.brandId = null;
  }

  await product.save();

  // Actualizar la propiedad "is_available" de los elementos de inventario asociados si el ID proporcionado es de un producto en la tabla "Product"
  if (productId.includes("-")) {
    await Inventory.update(
      { is_available: false, quantity_inventory: 0 },
      {
        where: {
          productId: product.id,
        },
      }
    );
  }

  const productModified = await Product.findByPk(product.id, {
    attributes: ["id", "name", "total_quantity_inventory", "is_available"],
    include: [
      {
        model: Inventory,
        attributes: ["id", "color", "quantity_inventory", "is_available"],
      },
    ],
  });

  return productModified;
};

module.exports = deleteProduct;
