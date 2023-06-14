// const { sequelize } = require("sequelize"); // Importar la instancia de Sequelize
const { Cart, Product, Inventory, User } = require("../../../db");
const { Op } = require("sequelize");

const postAddProductToCart = async (
  userSub,
  productId,
  inventoryId,
  quantity
) => {
  // Validar la existencia del usuario
  const user = await User.findOne({ where: { sub: userSub } });
  if (!user) {
    return { message: "El usuario no existe" };
  }

  // Verificar si el usuario tiene un carrito activo
  let cart = await Cart.findOne({
    where: {
      userSub,
      cart_status: {
        [Op.or]: ["Vacio", "Por pagar"],
      },
    },
    include: {
      model: Product,
      include: {
        model: Inventory,
      },
    },
  });

  // Si el usuario no tiene un carrito activo, crear uno nuevo
  if (!cart) {
    cart = await Cart.create({
      userSub,
      cart_status: "Vacio",
    });
  }

  // Verificar si la cantidad de productos ingresado para agregar al carrito es correcta

  if (quantity <= 0) {
    return { message: "La cantidad de productos no es válida" };
  }

  // Verificar si el producto existe y está disponible en el inventario
  const product = await Product.findByPk(productId, {
    include: {
      model: Inventory,
      where: { id: inventoryId },
    },
  });

  if (!product || !product.is_available) {
    return { message: "El producto o el color del producto no existe" };
  }

  const inventory = await Inventory.findOne({
    where: { id: inventoryId, productIdInventory: productId },
  });

  if (!inventory || inventory.quantity_inventory < quantity) {
    return {
      message:
        "No hay suficiente disponibilidad en inventario del producto seleccionado",
    };
  }

  // Verificar si el producto ya está en el carrito
  const existingProduct = await cart.hasProduct(product, {
    through: { where: { "$inventory.id$": inventoryId } },
  });

  if (existingProduct) {
    return { message: "El producto ya está en el carrito" };
  }

  await cart.addProduct(product, {
    through: {
      quantity_product: quantity,
      inventoryId: inventoryId,
    },
  });

  // Actualizar el estado del carrito
  const productCount = await cart.countProducts({
    distinct: true,
    col: "inventoryId", // Contar productos distintos basado en el inventoryId
  });
  cart.quantity_products = productCount;
  cart.cart_status = productCount >= 1 ? "Por pagar" : "Vacio";

  // Actualizar el monto del carrito
  const products = await cart.getProducts();

  const totalAmount = products.reduce((amount, product) => {
    const quantity = product.cart_products.quantity_product;
    const price = product.price;
    return amount + quantity * price;
  }, 0);

  cart.cart_amount = totalAmount;

  // Actualizar el carrito de compras con los nuevos valores
  await cart.save();

  return cart;
};

module.exports = postAddProductToCart;
