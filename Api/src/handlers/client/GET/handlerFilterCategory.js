const getCategoryProducts = require("../../../controllers/client/GET/getCategoryProducts");

const handlerFilterCategory = async (req, res) => {
    const id = req.params.id;
    try {
        const filterCategory = await getCategoryProducts(id);
        res.status(200).json(filterCategory);
    } catch (error) {
        res.status(404).json( { message: error.message });
    }
}

module.exports = handlerFilterCategory;