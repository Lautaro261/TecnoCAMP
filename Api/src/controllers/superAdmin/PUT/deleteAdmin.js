const { User } = require("../../../db");

const deleteAdmin = async (sub, delet) => {
  let adminDelete;
  const findUser = await User.findOne({ where: { sub: sub } });

  if (!findUser) {
    return null;
  }

  if (findUser[delet]) {
    adminDelete = false;
  } else {
    adminDelete = true;
  }

  const user = await User.update(
    { [delet]: adminDelete },
    { where: { sub: sub } }
  );

  return user;
};

module.exports = deleteAdmin;
