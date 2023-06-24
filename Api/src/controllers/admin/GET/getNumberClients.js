const { User } = require ("../../../db");

const getNumberClients = async()=>{
    const rolName = "client";

    const count = await User.count({
        where: {
          rol: rolName
        }
      });
      
    return count; 
}



module.exports = getNumberClients; 