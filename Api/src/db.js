const { Sequelize } = require("sequelize");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/tecnocamp`,
  {
    logging: false,
    native: false,
  }
);

/*  const sequelize = new Sequelize(
  DB_DEPLOY,
  {
    logging: false,
    native: false,
  }
); 
 */
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

/////// ACA IMPORTAMOS LOS MODELOS ///////

const {
  User,
  Profile,
  Product,
  Inventory,
  Order,
  Review,
  Cart,
  Category,
  Brand,
  Department,
  Municipality,
} = sequelize.models;

/////// ACA VIENEN LAS RELACIONES ///////

// Usuario con Perfil
User.hasOne(Profile);
Profile.belongsTo(User);

// Usuario con Carrito
User.hasOne(Cart);
Cart.belongsTo(User);

// Usuario con Orden
User.hasMany(Order);
Order.belongsTo(User);

// Usuario con Review
User.hasMany(Review);
Review.belongsTo(User);

////////////////////////////////////

// Producto con Inventario
Product.hasMany(Inventory);
Inventory.belongsTo(Product);

// Carrito con Producto
Product.hasMany(Cart);
Cart.belongsTo(Product, { foreignKey: "productId" });

// Carrito con Inventario
Inventory.hasMany(Cart);
Cart.belongsTo(Inventory, { foreignKey: "inventoryId" });

// Carrito con Order
Cart.hasOne(Order);
Order.belongsTo(Cart);

////////////////////////////////////

// Producto con Review
Product.hasMany(Review);
Review.belongsTo(Product);

// Producto con Categoría
Category.hasMany(Product);
Product.belongsTo(Category);

// Producto con Marca
Brand.hasMany(Product);
Product.belongsTo(Brand);

// Departamento con Municipio
Department.hasMany(Municipality);
Municipality.belongsTo(Department);

// Orden con Departamento
Order.belongsTo(Department);
Department.hasOne(Order);

// Orden con Municipio
Order.belongsTo(Municipality);
Municipality.hasOne(Order);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
