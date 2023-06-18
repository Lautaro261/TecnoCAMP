const { Product, Inventory } = require("../../../db");

const createColorProduct = async (productId, color, quantity) => {
  // Verificar si el producto existe
  const product = await Product.findByPk(productId);

  if (!product) {
    return { message: "Producto no encontrado" };
  }

  // Verificar si el nombre de color ya existe en el inventario del producto
  const existingColor = await Inventory.findOne({
    where: {
      color: color,
      productId: productId,
    },
  });

  if (existingColor) {
    return { message: "El color ya existe en el inventario del producto" };
  }

  // Validar que la cantidad en inventario sea mayor a 0
  if (quantity <= 0) {
    return { message: "La cantidad en inventario debe ser mayor a 0" };
  }

  // Crear el nuevo elemento de inventario
  const newColorProduct = await Inventory.create({
    color: color,
    quantity_inventory: quantity,
    productId: productId,
  });

  // Actualizar la cantidad total de inventario del producto
  const allInventoryItems = await Inventory.findAll({
    where: {
      productId: productId,
    },
  });

  const totalQuantity = allInventoryItems.reduce(
    (acc, item) => acc + item.quantity_inventory,
    0
  );

  product.total_quantity_inventory = totalQuantity;

  await product.save();

  // Agregar el nuevo color al producto utilizando el método addInventory
  await product.addInventory(newColorProduct);

  return newColorProduct;
};

module.exports = createColorProduct;
