const { User } = require("../../../db");
const { Profile } = require("../../../db");

const getClientById = async (sub) => {
  const rolName = "admin";

  const userById = await User.findByPk(sub, { where: { rol: rolName } });

  if (!userById) {
    return "El admin que intenta buscar no existe";
  }

  const profileById = await Profile.findOne({
    where: { userSub: userById.sub },
  });

  const userAndProfile = { userById, profileById };

  return userAndProfile;
};

module.exports = getClientById;
