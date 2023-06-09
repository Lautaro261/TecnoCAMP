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
        type: DataTypes.ENUM(
          "Blanco",
          "Negro",
          "Azul",
          "Rojo",
          "Amarillo",
          "Rosado"
        ),
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
    },
    { timestamps: false }
  );
};
