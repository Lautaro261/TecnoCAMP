const { User } = require("../../../db");
const { Profile } = require("../../../db");

const getUserAndProfile = async (sub) => {
  const user = await User.findOne({ 
    where: { sub: sub },
    include: [{model: Profile}],
    attributes: { exclude: ['password']}
 });
  return user;
};

module.exports = getUserAndProfile;