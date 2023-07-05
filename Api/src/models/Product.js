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
        allowNull: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      // price_promotion: {
      //   type: DataTypes.FLOAT,
      //   // allowNull: false,
      // },
      photo: {
        type: DataTypes.ARRAY(DataTypes.TEXT), // Utilizar ARRAY para almacenar varias fotos
        allowNull: true,
      },
      product_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      e_product_type: {
        type: DataTypes.ENUM(
          "Celular Smartphone",
          "Celular Convencional",
          "Audifonos alambricos",
          "Audífonos bluetooth",
          "Audifonos tipo diadema",
          "SmartWatch con bluetooth",
          "SmartWatch sin bluetooth"
        ),
        allowNull: true,
      },
      total_quantity_inventory: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },

    },
    { timestamps: false }
  );
};
