const { Router } = require("express");
// VERIFY TOKEN
const verifyToken = require("../utils/verifyToken.js");

//// ROUTER CLIENT ////
const clientRouter = Router();

/////////// HANDLERS ////////////

// PRODUCTOS
const handlerGetAllProducts = require("../handlers/client/GET/handlerGetAllProducts.js");
const handlerGetProductById = require("../handlers/client/GET/handlerGetProductById.js");

// CATEGORIAS
const handlerGetAllCategories = require("../handlers/client/GET/handlerGetAllCategories.js");
const handlerGetCategoryById = require("../handlers/client/GET/handlerGetCategoryById.js");

// MARCAS
const handlerGetAllBrands = require("../handlers/client/GET/handlerGetAllBrands.js");
const handlerGetBrandById = require("../handlers/client/GET/handlerGetBrandById.js");

// CARRITO DE COMPRAS
const handlerGetCartById = require("../handlers/client/GET/handlerGetCartById.js");
const handlerGetUserCarts = require("../handlers/client/GET/handlerGetUserCarts.js");
const handlerCreateCart = require("../handlers/client/POST/handlerCreateCart.js");
const handlerAddProductToCart = require("../handlers/client/POST/handlerAddProductToCart.js");

// DEPARTAMENTOS Y MUNICIPIOS DE COLOMBIA
const {
  handlerGetAllDepartments,
  handlerGetMunicipalitiesByDepartment,
} = require("../handlers/client/GET/handlerGetDepMunCo.js");

/////////// ROUTES ////////////

// PRODUCTOS
clientRouter.get("/allproducts", verifyToken, handlerGetAllProducts);
clientRouter.get("/product", verifyToken, handlerGetProductById);

// CATEGORIAS
clientRouter.get("/allcategories", verifyToken, handlerGetAllCategories);
clientRouter.get("/category", verifyToken, handlerGetCategoryById);

// MARCAS
clientRouter.get("/allbrands", verifyToken, handlerGetAllBrands);
clientRouter.get("/brand", verifyToken, handlerGetBrandById);

// CARRITO DE COMPRAS
clientRouter.get("/cartid", verifyToken, handlerGetCartById);
clientRouter.get("/cartofuser", verifyToken, handlerGetUserCarts);
clientRouter.post("/createcart", verifyToken, handlerCreateCart);
clientRouter.post("/addproductcart", verifyToken, handlerAddProductToCart);

// DEPARTAMENTOS Y MUNICIPIOS DE COLOMBIA
clientRouter.get("/alldepartments", verifyToken, handlerGetAllDepartments);
clientRouter.get(
  "/munbydep",
  verifyToken,
  handlerGetMunicipalitiesByDepartment
);

//// EXPORTACION DE RUTAS ////
module.exports = clientRouter;
