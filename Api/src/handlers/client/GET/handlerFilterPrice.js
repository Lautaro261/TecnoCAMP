const getPriceProducts = require("../../../controllers/client/GET/getPriceProducts");

const handlerFilterPrice = async (req, res) => {
    const minPrice = req.body.minPrice;
    const maxPrice = req.body.maxPrice;

    try {
        const filterPrice = await getPriceProducts(minPrice, maxPrice);
        res.status(200).json(filterPrice);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}   

module.exports = handlerFilterPrice;