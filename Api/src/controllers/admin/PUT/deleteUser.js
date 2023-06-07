const { User } = require("../../../db");

const deleteUser = async (sub, delet) => {
  const findUser = await User.findOne({ where: { sub: sub } });
  let userDelete;

  if (findUser[delet]) {
    userDelete = false;
  } else {
    userDelete = true;
  }

  const user = await User.update(
    { [delet]: userDelete },
    { where: { sub: sub } }
  );

  return user;
};

module.exports = deleteUser;
