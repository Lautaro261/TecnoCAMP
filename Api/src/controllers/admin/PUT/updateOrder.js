const { Order } = require("../../../db");

const updateOrder = async (orderId, shipping_status, contact_name, contact_cellphone, address, neighborhood) => {

    const order = await Order.findByPk(orderId);
    if (!order) {
        return { message: "La orden no existe" };
    }

    order.shipping_status = shipping_status;
    order.contact_name = contact_name;
    order.contact_cellphone = contact_cellphone;
    order.address = address;
    order.neighborhood = neighborhood;
    // Actualizar los campos especificados en la orden

    await order.save();

    // Obtener solo los atributos deseados de la orden
    const updatedOrder = await Order.findByPk(orderId, {
        attributes: [
            "id",
            "shipping_status",
            "contact_name",
            "contact_cellphone",
            "address",
            "neighborhood",
            "userSub"
        ],
    });

    return updatedOrder;

}

module.exports = updateOrder;
