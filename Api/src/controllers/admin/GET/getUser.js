const { User } = require("../../../db");

const getUser = async (sub) => {
  const user = await User.findOne({ where: { sub: sub } });

  return user;
};

module.exports = getUser;