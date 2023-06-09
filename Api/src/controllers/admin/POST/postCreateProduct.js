const { Product, Brand, Category, Inventory } = require("../../../db");
const { Op } = require("sequelize");

const postCreateProduct = async (
  name,
  price,
  price_promotion,
  photo,
  product_description,
  colors,
  quantities,
  e_product_type,
  total_quantity_inventory,
  is_available,
  product_favorite,
  categoryId,
  brandId
) => {
  const formattedName = name.toLowerCase().trim();

  const existingProduct = await Product.findOne({
    where: {
      name: {
        [Op.iLike]: formattedName,
      },
    },
  });

  if (existingProduct) {
    return { message: "Nombre de producto ya creado" };
  }

  if (price <= 0 || price_promotion <= 0) {
    return { message: "Los precios deben ser mayores que cero" };
  }

  const brand = await Brand.findByPk(brandId);
  const category = await Category.findByPk(categoryId);

  if (!brand || !category) {
    return { message: "Marca o categoría no válida" };
  }

  if (colors.length !== quantities.length) {
    return { message: "El número de colores y cantidades no coincide" };
  }

  const newProduct = await Product.create({
    name,
    price,
    price_promotion,
    photo,
    product_description,
    e_product_type,
    total_quantity_inventory,
    is_available,
    product_favorite,
    categoryId,
    brandId,
  });

  const areQuantitiesValid = quantities.every(
    (quantity) => Number.isInteger(quantity) && quantity > 0
  );
  if (!areQuantitiesValid) {
    return {
      message:
        "Las cantidades de inventario deben ser números enteros positivos",
    };
  }

  // Crear las entradas en el inventario para los colores del producto
  for (let i = 0; i < colors.length; i++) {
    const color = colors[i];
    const quantity = quantities[i];

    const newInventoryEntry = await Inventory.create({
      color: color,
      quantity_inventory: quantity,
      is_available,
    });

    // Establecer la relación entre el nuevo producto y su entrada en el inventario
    await newProduct.addInventory(newInventoryEntry);

    newInventoryEntry.productId = newProduct.id;
    await newInventoryEntry.save();
  }

  const inventoryQuantities = quantities.reduce((acc, curr) => acc + curr, 0);
  newProduct.total_quantity_inventory = inventoryQuantities;
  await newProduct.save();

  return newProduct;
};

module.exports = postCreateProduct;
