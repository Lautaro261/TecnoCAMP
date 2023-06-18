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
    include: [
      {
        model: Product,
        where: { id: productId },
        include: {
          model: Inventory,
          where: { id: inventoryId },
        },
      },
    ],
  });

  // // Si el usuario no tiene un carrito activo, crear uno nuevo
  // if (!cart) {
  //   cart = await Cart.create({
  //     userSub,
  //   });
  // }

  // Verificar si la cantidad de productos ingresado para agregar al carrito es correcta
  if (quantity <= 0) {
    return { message: "La cantidad de productos no es válida" };
  }

  // Verificar si el producto existe y está disponible en el inventario
  const product = await Product.findByPk(productId, {
    include: {
      model: Inventory,
      where: { id: inventoryId, is_available: true },
    },
  });

  if (!product || !product.is_available) {
    return {
      message:
        "El producto o el color del producto no existe o no esta disponible",
    };
  }

  const inventory = await Inventory.findOne({
    where: { id: inventoryId, productId: productId },
  });

  if (!inventory || inventory.quantity_inventory < quantity) {
    return {
      message:
        "No hay suficiente disponibilidad en inventario del producto seleccionado",
    };
  }

  // Verificar si el producto ya existe en el carrito
  const existingCartItem = await Cart.findOne({
    where: {
      userSub,
      productId,
      inventoryId,
    },
  });

  if (existingCartItem) {
    // Verificar si el producto y color del producto existen en el inventario
    const inventory = await Inventory.findOne({
      where: { id: inventoryId, productId: productId },
    });

    // Verificar si hay suficiente disponibilidad en el inventario del producto seleccionado
    if (
      parseFloat(existingCartItem.quantity_unit_product) +
        parseFloat(quantity) >
      parseFloat(inventory.quantity_inventory)
    ) {
      return {
        message:
          "No hay suficiente disponibilidad en inventario del producto seleccionado",
      };
    }

    // Actualizar el quantity_unit_product y amount_unit_product del color existente
    existingCartItem.quantity_unit_product =
      parseFloat(existingCartItem.quantity_unit_product) + parseFloat(quantity);
    existingCartItem.amount_unit_product =
      parseFloat(existingCartItem.amount_unit_product) +
      parseFloat(quantity * product.price);

    await existingCartItem.save();
  } else {
    // Verificar si el carrito ya existe
    const idCart = await Cart.findOne({
      where: {
        userSub,
        cart_status: {
          [Op.or]: ["Vacio"],
        },
      },
    });
    console.log(idCart.dataValues.id);
    // Agregar un nuevo producto al carrito existente
    cart = await Cart.build({
      idCart: idCart.dataValues.id,
      userSub,
      productId,
      inventoryId,
      quantity_unit_product: quantity,
      amount_unit_product: quantity * product.price,
    });

    // Guardar cambios en el carrito
    await cart.save();

    // El producto es nuevo, aumentar la cantidad de productos únicos
    const uniqueProductCount = await Cart.count({
      where: {
        userSub,
      },
      distinct: true,
      col: "inventoryId", // Contar la cantidad de productos únicos basado en la columna inventoryId
    });

    // Actualizar quantity_all_products del carrito
    cart.quantity_all_products = uniqueProductCount;

    // Actualizar el campo quantity_all_products en cada registro del carrito
    await Cart.update(
      {
        quantity_all_products: cart.quantity_all_products,
      },
      {
        where: {
          userSub,
          cart_status: {
            [Op.or]: ["Por pagar"],
          },
        },
      }
    );

    // Actualizar el estado del carrito a "Por pagar" si la cantidad de productos es mayor o igual a 1
    if (cart.quantity_all_products >= 1 && cart.cart_status !== "Por pagar") {
      cart.cart_status = "Por pagar";
    }

    // Guardar cambios en el carrito
    await cart.save();
  }

  // Actualizar cart_total_amount del carrito
  const allProductsItems = await Cart.findAll({
    where: {
      userSub,
      cart_status: {
        [Op.or]: ["Por pagar"],
      },
    },
  });

  const totalAmountCart = allProductsItems.reduce(
    (acc, item) => acc + item.amount_unit_product,
    0
  );

  // Actualizar el campo cart_total_amount en cada registro del carrito
  await Cart.update(
    {
      cart_total_amount: totalAmountCart,
    },
    {
      where: {
        userSub,
        cart_status: {
          [Op.or]: ["Por pagar"],
        },
      },
    }
  );

  return cart;
};

module.exports = postAddProductToCart;
