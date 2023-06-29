const { Product, Inventory, Cart, Order } = require("../../../db");
const { Op } = require("sequelize");

const getHistoryOrders = async (userId) => {
  const orders = await Order.findAll({
    where: {
      userSub: userId,
      payment_status: "approved",
      payment_transaction_id: { [Op.not]: null },
    },
    attributes: [
      "id",
      "payment_transaction_id",
      "payment_date",
      "shipping_status",
      "userSub",
      "cartId",
      "total_quantity_all_products",
      "total_amount_all_products",
    ],
    order: [["payment_date", "DESC"]],
  });

  const ordersAndProducts = [];

  for (const order of orders) {
    const cartId = order.cartId;

    const products = await Cart.findAll({
      where: {
        idCart: cartId,
      },
      attributes: ["quantity_unit_product"],
      include: [
        {
          model: Product,
          attributes: ["id", "name", "price", "photo", "product_description"],
          include: [
            {
              model: Inventory,
              attributes: ["id", "color"],
            },
          ],
        },
        {
          model: Inventory,
          attributes: ["id", "color"],
        },
      ],
    });

    const groupedProducts = {};

    for (const product of products) {
      const productId = product.product.id;
      const cartQuantity = product.quantity_unit_product;
      const inventoryId = product.inventory.id;
      const color = product.inventory.color;
      console.log(inventoryId);
      console.log(color);
      console.log(cartQuantity);

      if (productId) {
        if (groupedProducts[productId]) {
          if (inventoryId) {
            const inventory = groupedProducts[productId].inventoryIds.find(
              (inv) => inv.id === inventoryId
            );
            if (inventory) {
              inventory.quantity_unit_product += cartQuantity; // Incrementar la cantidad de productos en la propiedad "quantity_unit_product"
            } else {
              groupedProducts[productId].inventoryIds.push({
                id: inventoryId,
                color: color,
                quantity_unit_product: cartQuantity, // Agregar la propiedad "quantity_unit_product"
              });
            }
          }
        } else {
          groupedProducts[productId] = {
            id: product.product.id,
            name: product.product.name,
            price: product.product.price,
            photo: product.product.photo,
            product_description: product.product.product_description,
            inventoryIds: [],
          };

          if (inventoryId) {
            groupedProducts[productId].inventoryIds.push({
              id: inventoryId,
              color: color,
              quantity_unit_product: cartQuantity, // Agregar la propiedad "quantity_unit_product"
            });
          }
        }
      }
    }

    const productsWithInventoryIds = Object.values(groupedProducts);

    ordersAndProducts.push({ order, products: productsWithInventoryIds });
  }

  if (ordersAndProducts.length === 0) {
    return { message: "No hay ordenes pagadas" };
  }

  return ordersAndProducts;
};

module.exports = getHistoryOrders;
