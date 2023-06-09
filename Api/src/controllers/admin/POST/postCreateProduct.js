const { Product, Brand, Category, Inventory } = require("../../../db");
const { Op } = require("sequelize");

const postCreateProduct = async (
  name,
  price,
  price_promotion,
  photo,
  product_description,
  e_color,
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

  const brand = await Brand.findByPk(brandId);
  const category = await Category.findByPk(categoryId);

  if (!brand || !category) {
    return { message: "Marca o categoría no válida" };
  }

  const newProduct = await Product.create({
    name,
    price,
    price_promotion,
    photo,
    product_description,
    e_color,
    e_product_type,
    total_quantity_inventory,
    is_available,
    product_favorite,
    categoryId,
    brandId,
  });

  // Crear la entrada en el inventario para el nuevo producto
  const newInventoryEntry = await Inventory.create({
    color: e_color,
    quantity_inventory: total_quantity_inventory,
    is_available: is_available,
  });

  // Establecer la relación entre el nuevo producto y su entrada en el inventario
  await newProduct.setInventory(newInventoryEntry);

  return newProduct;
};

const postAddColorsToProduct = async (productId, colors, quantities) => {
  const existingProduct = await Product.findByPk(productId);

  if (!existingProduct) {
    return { message: "El producto no existe" };
  }

  if (!Array.isArray(colors) || !Array.isArray(quantities)) {
    return { message: "Los colores y las cantidades deben ser arreglos" };
  }

  if (colors.length !== quantities.length) {
    return {
      message:
        "Los arreglos de colores y cantidades deben tener la misma longitud",
    };
  }

  const productPromises = colors.map(async (color, index) => {
    const newProduct = await Product.create({
      name: existingProduct.name,
      price: existingProduct.price,
      price_promotion: existingProduct.price_promotion,
      photo: existingProduct.photo,
      product_description: existingProduct.product_description,
      e_color: color,
      e_product_type: existingProduct.e_product_type,
      quantity_inventary: quantities[index],
      total_quantity_inventary: existingProduct.total_quantity_inventary,
      is_available: existingProduct.is_available,
      product_favorite: existingProduct.product_favorite,
      brandId: existingProduct.brandId,
      categoryId: existingProduct.categoryId,
    });

    return newProduct;
  });

  const newProducts = await Promise.all(productPromises);

  return newProducts;
};

module.exports = { postCreateProduct, postAddColorsToProduct };
