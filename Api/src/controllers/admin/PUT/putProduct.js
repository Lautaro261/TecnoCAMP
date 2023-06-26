const { Product, Inventory, Category, Brand } = require("../../../db");

const updateProduct = async (
  id,
  name,
  price,
  photo,
  product_description,
  e_product_type,
  is_available,
  product_favorite,
  /* categoryId,
  brandId, */
  inventoryItems
) => {
  // Validar que el producto, la categoría y la marca existen
  const product = await Product.findByPk(id);

  if (!product) {
    return { message: "Producto no encontrado" };
  }

 /*  const brand = await Brand.findByPk(brandId);
  const category = await Category.findByPk(categoryId); */

  // if (!brand || !category) {
  //   return { message: "Marca o categoría no válida" };
  // }

  // Validar que los ID de colores no se repitan
  const inventoryIds = inventoryItems.map((item) => item.id);
  const uniqueInventoryIds = new Set(inventoryIds);

  if (inventoryIds.length !== uniqueInventoryIds.size) {
    return { message: "No se permiten ID de colores duplicados" };
  }

  // // Validar valores numéricos de precio y precio de promoción
  // if (price <= 0 || price_promotion <= 0) {
  //   return { message: "Los precios deben ser mayores que cero" };
  // }

  for (const item of inventoryItems) {
    if (item.quantity <= 0) {
      return { message: "El número de inventario debe ser mayor a cero" };
    }
  }

  // Validar que los ID de colores pertenezcan al mismo producto
  const existingInventoryItems = await Inventory.findAll({
    where: {
      id: inventoryIds,
      productId: product.id,
    },
  });

  const existingInventoryItemIds = existingInventoryItems.map(
    (item) => item.id
  );

  const invalidInventoryItemIds = inventoryIds.filter(
    (itemId) => !existingInventoryItemIds.includes(itemId)
  );

  if (invalidInventoryItemIds.length > 0) {
    return {
      message:
        "Los ID de colores de inventario no corresponden al producto actual",
      invalidInventoryItemIds,
    };
  }

  // Actualizar los datos principales del producto
  product.name = name;
  product.price = price;
  product.photo = photo;
  product.product_description = product_description;
  product.e_product_type = e_product_type;
  product.is_available = is_available;
  product.product_favorite = product_favorite;
 /*  product.categoryId = categoryId;
  product.brandId = brandId; */

  // Actualizar los elementos de inventario asociados
  if (inventoryItems && inventoryItems.length > 0) {
    const updatedInventoryItems = [];

    for (const item of inventoryItems) {
      const inventoryItem = await Inventory.findByPk(item.id);

      if (!inventoryItem) {
        continue; // Si el elemento de inventario no existe, continuar con el siguiente
      }

      // Actualizar el color y la cantidad del elemento de inventario
      inventoryItem.color = item.color;
      inventoryItem.quantity_inventory = item.quantity;
      inventoryItem.is_available = item.is_available; // Agregar esta línea para actualizar la propiedad "is_available" individualmente

      if (!item.is_available) {
        inventoryItem.quantity_inventory = 0; // Establecer el stock a 0 si "is_available" es false
      }

      await inventoryItem.save();
      updatedInventoryItems.push(inventoryItem);
    }

    // Obtener todos los elementos de inventario asociados al producto
    const allInventoryItems = await Inventory.findAll({
      where: {
        productId: product.id,
      },
    });

    // Actualizar el total_quantity_inventory del producto basado en todos los elementos de inventario
    const totalQuantity = allInventoryItems.reduce(
      (acc, item) => acc + item.quantity_inventory,
      0
    );
    product.total_quantity_inventory = totalQuantity;
  }

  // Verificar si se cambió la disponibilidad del producto
  const oldAvailability = product.is_available;
  const newAvailability = is_available;

  if (!oldAvailability && newAvailability) {
    // Recalcular el total_quantity_inventory si el producto se vuelve disponible
    const allInventoryItems = await Inventory.findAll({
      where: {
        productId: product.id,
      },
    });

    const totalQuantity = allInventoryItems.reduce(
      (acc, item) => acc + item.quantity_inventory,
      0
    );
    product.total_quantity_inventory = totalQuantity;
  }

  if (newAvailability === false) {
    product.total_quantity_inventory = 0;
  }

  if (product.total_quantity_inventory === 0) {
    product.is_available = false;
  }

  await product.save();

  // Actualizar los elementos de inventario asociados si se cambió la disponibilidad del producto

  if (newAvailability === false || product.total_quantity_inventory === 0) {
    const inventoryUpdateData = {
      is_available: false,
      quantity_inventory: 0,
    };

    await Inventory.update(inventoryUpdateData, {
      where: {
        productId: product.id,
      },
    });
  }

  const productModified = await Product.findByPk(id, {
    include: [
      {
        model: Inventory,
        attributes: ["id", "color", "quantity_inventory", "is_available"],
      },
    ],
  });

  return productModified;
};

module.exports = updateProduct;
