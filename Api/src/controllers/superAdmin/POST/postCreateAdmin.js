const { User, Profile } = require("../../../db");
require("dotenv").config();

const postCreateAdmin = async (sub, email, hashPassword) => {
  const user = await User.findOne({ where: { sub: sub } });

  if (user) {
    console.log("Usuario ya existe");
  }

  const newObjUser = {
    sub,
    email,
  };

  if (hashPassword !== undefined || hashPassword !== null) {
    newObjUser.password = hashPassword;
  }

  newObjUser.rol = "admin";

  const newUser = await User.create(newObjUser);

  const findProfile = await Profile.findOne({ where: { userSub: sub } });

  if (!findProfile) {
    await Profile.create({ userSub: sub });
  }

  // await sendRegisterEmail(newUser);

  return newUser;
};

module.exports = postCreateAdmin;
