const deleteUser = require('../../../controllers/admin/PUT/deleteUser');

const handlerDeleteUser = async (req, res) => {
    const { sub } = req.body;
    try {
        const userDelet = await deleteUser (sub, "erased");
        res.status(200).json({ message: "Se ha borrado correctamente",
        delete: userDelet,
    });
    }catch(error){
        res.status(400).json({ message: `No se borro el usuario ${sub}`});
    }
}

module.exports = handlerDeleteUser;