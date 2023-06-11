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

// DEPARTAMENTOS Y MUNICIPIOS DE COLOMBIA
clientRouter.get("/alldepartments", verifyToken, handlerGetAllDepartments);
clientRouter.get(
  "/munbydep",
  verifyToken,
  handlerGetMunicipalitiesByDepartment
);

//// EXPORTACION DE RUTAS ////
module.exports = clientRouter;
