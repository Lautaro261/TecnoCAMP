const getReviewId = require("../../../controllers/client/GET/getReviewsId");

const handlerGetReviewId = async (req, res) => {
    const { productId } = req.query

    try {
        const reviewId = await getReviewId(productId);
        res.status(200).json(reviewId);
    } catch (error) {
        res.status(202).json({ error: error.message });
    }
}

module.exports = handlerGetReviewId;