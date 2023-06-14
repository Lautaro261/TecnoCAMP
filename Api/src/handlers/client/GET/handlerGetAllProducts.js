const getAllProducts = require("../../../controllers/client/GET/getAllProducts");

const handlerGetAllProducts = async (req, res) => {
  const {name} = req.query
  try {
    const allProducts = await getAllProducts();
    if (name) {
      let productName = await allProducts.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()));
      productName.length?
      res.status(200).send(productName):
      res.status(202).send("No se encuentra el producto");
    }else{
      res.status(200).json(allProducts);
    }   
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerGetAllProducts;
