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
const handlerPutProductQuantityCart = require("../handlers/client/PUT/handlerPutProductQuantityCart.js");
const handlerDeleteProductFromCart = require("../handlers/client/PUT/handlerDeleteProductFromCart.js");

// FILTROS
const handlerFilterCategory = require("../handlers/client/GET/handlerFilterCategory.js");
const handlerFilterBrand = require("../handlers/client/GET/handlerFilterBrand.js");
const handlerFilterPrice = require("../handlers/client/GET/handlerFilterPrice.js");
const handlerFiltersComb = require("../handlers/client/GET/handlerFiltersComb.js");

// DEPARTAMENTOS Y MUNICIPIOS DE COLOMBIA
const {
  handlerGetAllDepartments,
  handlerGetMunicipalitiesByDepartment,
} = require("../handlers/client/GET/handlerGetDepMunCo.js");

/////////// ROUTES ////////////

// PRODUCTOS
clientRouter.get("/allproducts", handlerGetAllProducts);
clientRouter.get("/product/:id", handlerGetProductById);

// CATEGORIAS
clientRouter.get("/allcategories", handlerGetAllCategories);
clientRouter.get("/category/:id", handlerGetCategoryById);

// MARCAS
clientRouter.get("/allbrands", handlerGetAllBrands);
clientRouter.get("/brand", handlerGetBrandById);

// CARRITO DE COMPRAS
clientRouter.get("/cart/:id", verifyToken, handlerGetCartById);
clientRouter.get("/cartuser/:sub", verifyToken, handlerGetUserCarts);
clientRouter.post("/createcart", verifyToken, handlerCreateCart);
clientRouter.post("/addproductcart", verifyToken, handlerAddProductToCart);
clientRouter.put("/updatecart", verifyToken, handlerPutProductQuantityCart);
clientRouter.put(
  "/deleteproductcart",
  verifyToken,
  handlerDeleteProductFromCart
);

// FILTROS
clientRouter.get("/filterCategory/:id", handlerFilterCategory);
clientRouter.get("/filterBrand", handlerFilterBrand);
clientRouter.get("/filterPrice", handlerFilterPrice);
clientRouter.post("/filtersComb", handlerFiltersComb);

// DEPARTAMENTOS Y MUNICIPIOS DE COLOMBIA
clientRouter.get("/alldepartments", verifyToken, handlerGetAllDepartments);
clientRouter.get(
  "/munbydep",
  verifyToken,
  handlerGetMunicipalitiesByDepartment
);

//// EXPORTACION DE RUTAS ////
module.exports = clientRouter;
