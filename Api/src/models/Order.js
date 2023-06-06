const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "order",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      quantity_all_products: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_amount_all_products: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      payment_status: {
        type: DataTypes.ENUM("pending", "rejected", "approved"),
        defaultValue: "pending",
        allowNull: false,
      },
      shipping_status: {
        type: DataTypes.ENUM("Por enviar", "En camino", "Entregado"),
        defaultValue: "Por enviar",
        allowNull: false,
      },
      payment_date: {
        type: DataTypes.DATE,
        // allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      payment_link: {
        type: DataTypes.TEXT,
        // allowNull: false,
      },
      payment_transaction_id: {
        type: DataTypes.TEXT,
        // allowNull: false,
      },
      preference_id: {
        type: DataTypes.TEXT,
        // allowNull: false,
      },
      contact_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact_cellphone: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      neighborhood: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
