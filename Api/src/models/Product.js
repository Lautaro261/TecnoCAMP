const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      price_promotion: {
        type: DataTypes.FLOAT,
        // allowNull: false,
      },
      photo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      product_description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      e_color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      e_product_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity_inventary: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      product_favorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: false }
  );
};
