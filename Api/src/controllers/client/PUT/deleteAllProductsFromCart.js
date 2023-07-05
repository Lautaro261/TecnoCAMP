const { Cart, User } = require("../../../db");

const deleteAllProductsFromCart = async (userSub) => {
    // Validar la existencia del usuario
    const user = await User.findOne({ where: { sub: userSub } });
    if (!user) {
        return { message: "El usuario no existe" };
    }

    // Verificar si el usuario tiene un carrito activo
    const cart = await Cart.findOne({
        where: {
            userSub,
            cart_status: "Por pagar",
        },
    });

    if (!cart) {
        return { message: "El carrito no existe o no está activo" };
    }

    // Eliminar todos los productos del carrito
    await Cart.destroy({
        where: {
            userSub,
            cart_status: "Por pagar",
        },
    });

    // Actualizar quantity_all_products del carrito a 0
    await Cart.update(
        {
            quantity_all_products: 0,
        },
        {
            where: {
                userSub,
                cart_status: "Por pagar",
            },
        }
    );

    // Actualizar cart_total_amount del carrito a 0
    await Cart.update(
        {
            cart_total_amount: 0,
        },
        {
            where: {
                userSub,
                cart_status: "Por pagar",
            },
        }
    );

    return { message: "El carrito ha sido vaciado exitosamente" };
};

module.exports = deleteAllProductsFromCart;