const { DataTypes } = require("sequelize");
const { Op } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "cart",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      idCart: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      quantity_all_products: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      cart_total_amount: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      quantity_unit_product: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      amount_unit_product: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      cart_status: {
        type: DataTypes.ENUM("Por pagar", "Pagado", "Vacio"),
        defaultValue: "Vacio",
        allowNull: true,
      },
    },
    { timestamps: false },
    {
      indexes: [
        // Crea un índice condicional que incluye solo los carritos con estado "Vacio" o "Por pagar"
        {
          name: "active_cart",
          fields: ["userSub", "cart_status"],
          where: {
            cart_status: { [Op.or]: ["Vacio", "Por pagar"] },
          },
          unique: true,
        },
      ],
    }
  );
};
