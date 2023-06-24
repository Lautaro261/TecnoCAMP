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
const handlerGetNumberClients = require("../handlers/admin/GET/handlerGetNumberClients.js");

// CATEGORIAS
const handlerCreateCategory = require("../handlers/admin/POST/handlerCreateCategory.js");
const handlerGetAllCategories = require("../handlers/admin/GET/handlerGetAllCategories.js");
const handlerGetCategoryById = require("../handlers/admin/GET/handlerGetCategoryById.js");
const {
  handlerUpdateCategory,
  handlerDeleteCategory,
} = require("../handlers/admin/PUT/handlerPutCategory.js");

// MARCAS
const handlerCreateBrand = require("../handlers/admin/POST/handlerCreateBrand.js");
const handlerGetAllBrands = require("../handlers/admin/GET/handlerGetAllBrands.js");
const handlerGetBrandById = require("../handlers/admin/GET/handlerGetBrandById.js");
const {
  handlerUpdateBrand,
  handlerDeleteBrand,
} = require("../handlers/admin/PUT/handlerPutBrand.js");

// PRODUCTOS
const handlerCreateProduct = require("../handlers/admin/POST/handlerCreateProduct.js");
const handlerCreateColorProduct = require("../handlers/admin/POST/handlerCreateColorProduct.js");
const handlerGetAllProducts = require("../handlers/admin/GET/handlerGetAllProducts.js");
const handlerGetProductById = require("../handlers/admin/GET/handlerGetProductById.js");
const handlerUpdateProduct = require("../handlers/admin/PUT/handlerPutProduct.js");
const handlerDeleteProduct = require("../handlers/admin/PUT/handlerDeleteProduct.js");

//Visualizar REVIEWS
const handlerGetAllReview = require("../handlers/admin/GET/handlerGetAllReview.js");

// DEPARTAMENTOS Y MUNICIPIOS DE COLOMBIA
const handlerCreateDepMunCo = require("../handlers/admin/POST/handlerCreateDepMunCo.js");

//  INVENTARIOS 

const handlerGetNumberInventories = require("../handlers/admin/GET/handlerGetNumberInventories.js");

/////////// ROUTES ////////////

// USUARIOS
adminRouter.get("/allclients", verifyToken, handlerGetAllClients);
adminRouter.get("/client/:sub", verifyToken, handlerGetClientById);
adminRouter.put("/client/delete", verifyToken, handlerDeleteUser);
adminRouter.get("/clients/number",verifyToken, handlerGetNumberClients);

// CATEGORIAS
adminRouter.get("/allcategories", verifyToken, handlerGetAllCategories);
adminRouter.get("/category", verifyToken, handlerGetCategoryById);
adminRouter.post("/createcategory", verifyToken, handlerCreateCategory);
adminRouter.put("/updatecategory", verifyToken, handlerUpdateCategory);
adminRouter.put("/deletecategory", verifyToken, handlerDeleteCategory);

// MARCAS
adminRouter.get("/allbrands", verifyToken, handlerGetAllBrands);
adminRouter.get("/brand", verifyToken, handlerGetBrandById);
adminRouter.post("/createbrand", verifyToken, handlerCreateBrand);
adminRouter.put("/updatebrand", verifyToken, handlerUpdateBrand);
adminRouter.put("/deletebrand", verifyToken, handlerDeleteBrand);

// PRODUCTOS
adminRouter.get("/allproducts", verifyToken, handlerGetAllProducts);
adminRouter.get("/product", verifyToken, handlerGetProductById);
adminRouter.post("/createproduct", verifyToken, handlerCreateProduct);
adminRouter.post("/createcolorproduct", verifyToken, handlerCreateColorProduct);
adminRouter.put("/update/:id", verifyToken, handlerUpdateProduct);
adminRouter.put("/delete", verifyToken, handlerDeleteProduct);

//INVENNTARIOS
adminRouter.get("/inventories/number", verifyToken, handlerGetNumberInventories);

//REVIEWS
adminRouter.get("/allReviews", verifyToken, handlerGetAllReview);

// DEPARTAMENTOS Y MUNICIPIOS DE COLOMBIA
adminRouter.post("/loadcities", handlerCreateDepMunCo);

//// EXPORTACION DE RUTAS ////
module.exports = adminRouter;
