const getCategoryById = require("../../../controllers/client/GET/getCategoryById");

const handlerGetCategoryById = async (req, res) => {
  const id = req.params.id;

  try {
    // Obtener el producto por su ID
    const category = await getCategoryById(id);

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerGetCategoryById;
