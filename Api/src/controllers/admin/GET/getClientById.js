const { User } = require("../../../db");
const { Profile } = require("../../../db");

const getClientById = async (sub) => {

    const rolName = "client";
    
    const userById = await User.findByPk(sub,{ where: { rol: rolName }});

    if(!userById){
      return null
    }
  
    const profileById = await Profile.findOne({
      where: { userSub: userById.sub },
    });
  
    const userAndProfile = { userById, profileById };
  
    return userAndProfile;
  };

  module.exports = getClientById;