const { Op } = require("sequelize");
const { Product } = require("../../../db");

const getPriceProducts = async (minPrice, maxPrice) =>{
    
    const filterPrice = await Product.findAll({
        where:{
            price: {
                [Op.between]: [minPrice, maxPrice]
            },
        },
    });

    if (filterPrice < 0 || !filterPrice) {
        return { message: "El precio no puede ser inferior a 0 ni pueden ser letras" };
    }

    return filterPrice
}   

module.exports = getPriceProducts;