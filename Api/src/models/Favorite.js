const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "favorite",
    {
      id_favorite: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: true,
      },
      favorite: {
        type: DataTypes.BOOLEAN,
      },
      
    },
    { timestamps: false }
  );
};