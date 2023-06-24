// Modelos de base de base de datos
const {
  User,
  Cart,
  Product,
  Order,
  Department,
  Municipality,
} = require("../../../db");
const { Op } = require("sequelize");

// Mercado Pago

const mercadoPago = require("mercadopago");
require("dotenv").config();

// VARIABLES DE ENTORNO URLS
const { URL_SUCCESS, URL_PENDING, URL_FAILURE } = process.env;

// VARIABLE DE ENTORNO TOKEN MP
mercadoPago.configure({ access_token: process.env.MERCADOPAGO_KEY });

// Controller para crear reservaciones
const postCreateOrderMP = async (
  userSub,
  contact_name,
  contact_cellphone,
  departmentId,
  municipalityId,
  address,
  neighborhood
) => {
  // Verificar si el usuario existe
  const user = await User.findByPk(userSub);
  if (!user) {
    return { message: "El usuario no existe" };
  }

  // Obtener el carrito activo del usuario
  const cart = await Cart.findOne({
    where: {
      userSub: user.sub,
      cart_status: "Por pagar",
    },
    // order: [
    //   // Ordenar los productos del carrito por fecha de creación descendente
    //   ["createdAt", "DESC"],
    // ],
    // include: {
    //   model: Product,
    // },
  });

  if (!cart) {
    return {
      message: "El carrito no existe o el usuario no tiene carritos por pagar",
    };
  }

  // Recorrer items del carrito
  const allProductsItems = await Cart.findAll({
    where: {
      userSub,
      cart_status: "Por pagar",
    },
  });

  // Calcular total de productos, sumando productos unitarios
  const totalUnitsProductsInCart = allProductsItems.reduce(
    (acc, item) => acc + item.quantity_unit_product,
    0
  );

  // Verificar si el departamento existe
  const department = await Department.findByPk(departmentId);
  if (!department) {
    return { message: "El departamento seleccionado no existe" };
  }

  // Verificar si el municipio existe
  const municipality = await Municipality.findByPk(municipalityId);
  if (!municipality) {
    return { message: "El municipio seleccionado no existe" };
  }

  // Verificar si ya existe una orden asociada al carrito
  let order = await Order.findOne({
    where: {
      userSub: user.sub,
      payment_status: { [Op.or]: ["pending", "rejected"] },
    },
  });

  if (order) {
    // Si ya existe una orden, actualizar los campos
    order.total_quantity_all_products = totalUnitsProductsInCart;
    order.total_amount_all_products = cart.cart_total_amount;
    order.contact_name = contact_name;
    order.contact_cellphone = contact_cellphone;
    order.departmentId = departmentId;
    order.municipalityId = municipalityId;
    order.address = address;
    order.neighborhood = neighborhood;

    await order.save();

    //// Asignar datos a la preferencia de pago en Mercado Pago en base a las actualizaciones de la orden que ya existe ////
    const preference = {
      items: [
        {
          id: `${user.id}-${cart.id}`,
          title: `Compra de un total de ${order.total_quantity_all_products} productos`,
          description: `Compra de un total de ${cart.quantity_all_products} productos de diferentes cantidades unitarias para un total a pagar de ${cart.cart_total_amount} `,
          quantity: 1,
          currency_id: "COP",
          unit_price: order.total_amount_all_products,
        },
      ],
      payer: {
        name: String(user.name) ?? null,
        email: String(user.email) ?? null,
        //   phone: contact_cellphone,
        //   address: address,
        //   country_name: departmentId,
        //   city_name: municipalityId,
      },
      back_urls: {
        success: URL_SUCCESS,
        pending: URL_PENDING,
        failure: URL_FAILURE,
      },
      auto_return: "approved",
      binary_mode: true,
      // notification_url: "http://localhost:3001/reservation/notification",
    };

    //// Crear la preferencia de pago en Mercado Pago ////

    const responseUpdate = await mercadoPago.preferences.create(preference);

    // Actualizar TODOS los campos
    order.payment_link = responseUpdate.body.sandbox_init_point;
    order.preference_id = responseUpdate.body.id;

    await order.save();
  } else {
    //// Asignar datos a la preferencia de pago en Mercado Pago ////
    const preference = {
      items: [
        {
          id: `${user.id}-${cart.id}`,
          title: `Compra de un total de ${totalUnitsProductsInCart} productos`,
          description: `Compra de un total de ${cart.quantity_all_products} productos de diferentes cantidades unitarias para un total a pagar de ${cart.cart_total_amount} `,
          quantity: 1,
          currency_id: "COP",
          unit_price: cart.cart_total_amount,
        },
      ],
      payer: {
        name: String(user.name) ?? null,
        email: String(user.email) ?? null,
        //   phone: contact_cellphone,
        //   address: address,
        //   country_name: departmentId,
        //   city_name: municipalityId,
      },
      back_urls: {
        success: URL_SUCCESS,
        pending: URL_PENDING,
        failure: URL_FAILURE,
      },
      auto_return: "approved",
      binary_mode: true,
      // notification_url: "http://localhost:3001/reservation/notification",
    };

    //// Crear la preferencia de pago en Mercado Pago ////

    const response = await mercadoPago.preferences.create(preference);

    // Crear la reservación
    const newOrder = await Order.create({
      userSub,
      total_quantity_all_products: totalUnitsProductsInCart,
      total_amount_all_products: cart.cart_total_amount,
      payment_link: response.body.sandbox_init_point,
      preference_id: response.body.id,
      contact_name,
      contact_cellphone,
      departmentId,
      municipalityId,
      address,
      neighborhood,
      cartId: cart.idCart,
    });

    return newOrder;
  }

  return order;

  //   return response.body.sandbox_init_point;
};

module.exports = postCreateOrderMP;
