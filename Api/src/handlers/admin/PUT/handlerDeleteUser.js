const deleteUser = require("../../../controllers/admin/PUT/deleteUser");

const handlerDeleteUser = async (req, res) => {
  const { sub } = req.body;

  try {
    const userDelet = await deleteUser(sub, "erased");

    if (userDelet) {
      res.status(200).json({
        message: `¡Se ha baneado correctamente el usuario ${sub}!`,
        delete: userDelet,
      });
    } else {
      res.status(404).json({ message: `No se pudo banear el usuario ${sub}` });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerDeleteUser;
