const getFiltersComb = require("../../../controllers/client/GET/getFiltersComb");

const handlerFiltersComb = async (req, res) => {
    const { idCategory, idBrand, minPrice, maxPrice } = req.body;

    try {
        const filters = await getFiltersComb(idCategory, idBrand, minPrice, maxPrice);
        
        if (filters.length === 0) {
            res.status(200).json({ message: "No se encontraron productos que cumplan con los filtros especificados." });
        } else {
            res.status(200).json(filters);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = handlerFiltersComb;
