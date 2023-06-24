const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUser = require("../../../controllers/admin/GET/getUser");
const postReview = require("../../../controllers/client/POST/postReviw");

const handlerCreateReview = async (req, res) => {
    const { rating, comment, userSub, productId } = req.body;

    //1) Decodificar token con jwt
    const decoToken = await jwt.verify(req.token, KEY_SECRET);

    //2) Traer usuario y verificar si tiene rol Admin
    const user = await getUser(decoToken.sub);

    if (user.rol !== "client") {
        return res
            .status(404)
            .json({ message: "No cuenta con permisos para realizar la peticion" });
    }

    try {
        const newReview = await postReview(
            rating,
            comment,
            userSub,
            productId
        );

        res.status(200).json(newReview);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = handlerCreateReview;