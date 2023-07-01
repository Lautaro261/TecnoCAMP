const { User, Profile } = require("../../../db");

const putUserAndProfile = async (
  {
    name,
    photo,
    erased,
    nickname,
    phone,
    country,
    city,
    address,
    neighborhood,
  },
  sub
) => {
  const searchProfile = await Profile.findOne({ where: { userSub: sub } });

  if (!searchProfile) {
    return null;
  }

  const editProfile = await searchProfile.update({
    nickname,
    phone,
    country,
    city,
    address,
    neighborhood,
  });

  if (photo || name || erased != undefined) {
    const searchUser = await User.findOne({
      where: { sub: sub },
      attributes: { exclude: ["password"] },
    });

    const editUser = await searchUser.update({ photo, name, erased });

    const editTotal = { ...editUser.dataValues, ...editProfile.dataValues };
    return editTotal;
  }

  return editProfile;
};

module.exports = putUserAndProfile;
