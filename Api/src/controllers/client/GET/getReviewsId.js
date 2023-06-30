const { Review, Product, User } = require("../../../db");

const getReviewId = async (productId) => {

    const reviews = await Review.findAll({
        where: {
            productId: productId,
        },
        order: [["rating", "DESC"]],
        include: [{
            model: Product,
            attributes: ["name"],
        }, {
            model: User,
            attributes: ["name"],
        }]
    });

    if (reviews.length === 0) {
        return { message: "No hay reviews registradas para el producto con el ID proporcionado" };
    }

    return reviews;
}

module.exports = getReviewId;
