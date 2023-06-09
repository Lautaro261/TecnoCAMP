const { Router } = require("express");
// VERIFY TOKEN
const verifyToken = require("../utils/verifyToken.js");

//// ROUTER ADMIN ////
const adminRouter = Router();

/////////// HANDLERS ////////////

// USUARIOS
const handlerGetAllClients = require("../handlers/admin/GET/handlerGetAllClients.js");
const handlerGetClientById = require("../handlers/admin/GET/handlerGetClientById.js");
const handlerDeleteUser = require("../handlers/admin/PUT/handlerDeleteUser.js");

// CATEGORIAS
const handlerCreateCategory = require("../handlers/admin/POST/handlerCreateCategory.js");
const handlerGetAllCategories = require("../handlers/admin/GET/handlerGetAllCategories.js");
const {
  handlerUpdateCategory,
  handlerDeleteCategory,
} = require("../handlers/admin/PUT/handlerPutCategory.js");

// MARCAS
const handlerCreateBrand = require("../handlers/admin/POST/handlerCreateBrand.js");
const handlerGetAllBrands = require("../handlers/admin/GET/handlerGetAllBrands.js");
const {
  handlerUpdateBrand,
  handlerDeleteBrand,
} = require("../handlers/admin/PUT/handlerPutBrand.js");

// PRODUCTOS
const handlerCreateProduct = require("../handlers/admin/POST/handlerCreateProduct.js");
const handlerGetAllProducts = require("../handlers/admin/GET/handlerGetAllProducts.js");
const handlerGetProductById = require("../handlers/admin/GET/handlerGetProductById.js");
const handlerUpdateProduct = require("../handlers/admin/PUT/handlerUpdateProduct.js");

// DEPARTAMENTOS Y MUNICIPIOS DE COLOMBIA
const handlerCreateDepMunCo = require("../handlers/admin/POST/handlerCreateDepMunCo.js");

/////////// ROUTES ////////////

// USUARIOS
adminRouter.get("/allclients", verifyToken, handlerGetAllClients);
adminRouter.get("/client/:sub", verifyToken, handlerGetClientById);
adminRouter.put("/client/delete", verifyToken, handlerDeleteUser);

// CATEGORIAS
adminRouter.get("/allcategories", verifyToken, handlerGetAllCategories);
adminRouter.post("/createcategory", verifyToken, handlerCreateCategory);
adminRouter.put("/updatecategory", verifyToken, handlerUpdateCategory);
adminRouter.put("/deletecategory", verifyToken, handlerDeleteCategory);

// MARCAS
adminRouter.get("/allbrands", verifyToken, handlerGetAllBrands);
adminRouter.post("/createbrand", verifyToken, handlerCreateBrand);
adminRouter.put("/updatebrand", verifyToken, handlerUpdateBrand);
adminRouter.put("/deletebrand", verifyToken, handlerDeleteBrand);

// PRODUCTOS
adminRouter.get("/allproducts", verifyToken, handlerGetAllProducts);
adminRouter.get("/product", verifyToken, handlerGetProductById);
adminRouter.post("/createproduct", verifyToken, handlerCreateProduct);
adminRouter.put("/update/:id", verifyToken, handlerUpdateProduct);

// DEPARTAMENTOS Y MUNICIPIOS DE COLOMBIA
adminRouter.post("/loadcities", handlerCreateDepMunCo);

//// EXPORTACION DE RUTAS ////
module.exports = adminRouter;
