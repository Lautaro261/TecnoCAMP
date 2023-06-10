const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "inventory",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity_inventory: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      productIdInventory: {
        // Agrega la columna "productIdInventory"
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
