const { User } = require("../../../db");

const getNumberClients = async () => {
  const rolName = "client";

  const totalNumberOfActiveClients = await User.count({
    where: {
      rol: rolName,
    },
  });

  return { totalNumberOfActiveClients };
};

module.exports = getNumberClients;
