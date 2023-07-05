const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUser = require("../../../controllers/admin/GET/getUser");
const deleteColorProduct = require("../../../controllers/admin/PUT/deleteColorProduct");

const handlerDeleteColorProduct = async (req, res) => {
    //1) Decodificar token con jwt
    const decoToken = await jwt.verify(req.token, KEY_SECRET);

    //2) Traer usuario y verificar si tiene rol Admin
    const user = await getUser(decoToken.sub);

    if (user.rol !== "admin") {
        return res
            .status(404)
            .json({ message: "No cuenta con permisos para realizar la peticion" });
    }

    const { productId, color } = req.body;

    try {
        const deleteColor = await deleteColorProduct(productId, color);
        res.status(200).json(deleteColor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

module.exports = handlerDeleteColorProduct;