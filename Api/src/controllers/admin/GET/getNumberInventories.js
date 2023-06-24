const { Product } = require ("../../../db");

const getNumberInventories = async()=>{

    const count = await Product.count({
      where: {
        is_available: true
      }
    });
      return count;
   
}



module.exports = getNumberInventories; 