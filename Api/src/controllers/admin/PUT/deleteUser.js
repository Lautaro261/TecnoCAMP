const { User } = require("../../../db");

const deleteUser = async (sub, delet) => {
    let userDelete;
    const findUser = await User.findOne({where: { sub: sub }});

    if (findUser[delet]){
        userDelete = false;
    }else {
        userDelete = true;
    }

    const user = await User.update(
        { [delet]: userDelete },
        { where: { sub: sub } }
    );

    return user;
}

module.exports = deleteUser;