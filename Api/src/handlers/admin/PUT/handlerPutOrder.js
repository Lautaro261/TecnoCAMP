const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUser = require("../../../controllers/admin/GET/getUser");
const updateOrder = require("../../../controllers/admin/PUT/updateOrder");

const handlerPutOrder = async (req, res) => {
    const { orderId } = req.params;
    const {
        shipping_status,
        contact_name,
        contact_cellphone,
        address,
        neighborhood,
    } = req.body;

    const decoToken = await jwt.verify(req.token, KEY_SECRET);
    const user = await getUser(decoToken.sub);

    if (user.rol !== "admin") {
        return res
            .status(403)
            .json({ message: "No cuenta con permisos para realizar la petición" });
    }

    try {
        const updatedOrder = await updateOrder(
            orderId,
            shipping_status,
            contact_name,
            contact_cellphone,
            address,
            neighborhood
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "La orden no existe" });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = handlerPutOrder;
