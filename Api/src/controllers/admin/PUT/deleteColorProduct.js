const { Product, Inventory } = require("../../../db");

const deleteColorProduct = async (productId, color) => {
    // Verificar si el producto existe
    const product = await Product.findByPk(productId);

    if (!product) {
        return { message: "Producto no encontrado" };
    }

    // Buscar el color en el inventario del producto
    const colorProduct = await Inventory.findOne({
        where: {
            color: color,
            productId: productId,
        },
    });

    if (!colorProduct) {
        return { message: "El color no existe en el inventario del producto" };
    }

    // Eliminar el color del inventario
    await colorProduct.destroy();

    // Actualizar la cantidad total de inventario del producto
    const allInventoryItems = await Inventory.findAll({
        where: {
            productId: productId,
        },
    });

    const totalQuantity = allInventoryItems.reduce(
        (acc, item) => acc + item.quantity_inventory,
        0
    );

    product.total_quantity_inventory = totalQuantity;

    await product.save();

    return { message: "Color eliminado exitosamente" };
};

module.exports = deleteColorProduct;