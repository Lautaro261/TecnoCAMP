const { User, Profile } = require("../../../db");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { EMAIL_ADMIN, PASS_ADMIN } = process.env;

const postCreateUser = async (sub, email, password) => {
  const user = await User.findOne({ where: { sub: sub } });
  const hashNum = 10;

  if (user) {
    return null;
  }

  const newObjUser = {
    sub,
    email,
  };

  if (password !== undefined || password !== null) {
    newObjUser.password = password;
  }

  if (newObjUser.email === EMAIL_ADMIN && newObjUser.password === PASS_ADMIN) {
    newObjUser.rol = "superAdmin";
  }

  const hashPassword = await bcrypt.hash(newObjUser.password, hashNum);

  newObjUser.password = hashPassword;

  const newUser = await User.create(newObjUser);
  const findProfile = await Profile.findOne({ where: { userSub: sub } });

  if (!findProfile) {
    await Profile.create({ userSub: sub });
  }

  // await sendRegisterEmail(newUser);

  return newUser;
};

module.exports = postCreateUser;
