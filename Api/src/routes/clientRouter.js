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
const handlerDeleteAllProductsFromCart = require("../handlers/client/PUT/handlerDeleteAllProductsFromCart.js")

// ORDEN DE PEDIDO Y MERCADO PAGO
const handlerGetHistoryOrders = require("../handlers/client/GET/handlerGetHistoryOrders.js");
const handlerCreateOrderMP = require("../handlers/client/POST/handlerCreateOrderMP.js");
const postNotificationMP = require("../handlers/client/POST/handlerPostNotificationMP.js");

// FILTROS
const handlerFilterCategory = require("../handlers/client/GET/handlerFilterCategory.js");
const handlerFilterBrand = require("../handlers/client/GET/handlerFilterBrand.js");
const handlerFilterPrice = require("../handlers/client/GET/handlerFilterPrice.js");
const handlerFiltersComb = require("../handlers/client/GET/handlerFiltersComb.js");

// Reviews
const handlerCreateReview = require("../handlers/client/POST/handlerCreateReview.js");
const handlerGetReviewId = require("../handlers/client/GET/handlerGetReviewId.js");
// DEPARTAMENTOS Y MUNICIPIOS DE COLOMBIA
const {
  handlerGetAllDepartments,
  handlerGetMunicipalitiesByDepartment,
} = require("../handlers/client/GET/handlerGetDepMunCo.js");

//FAVORITES
const handlerMyFavourites = require("../handlers/client/GET/handlerMyFavourites.js");
const handlerPostFavorites = require("../handlers/client/POST/handlerPostFavorites.js");
const handlerDeleteFavorite = require("../handlers/client/PUT/handlerDeleteFavorite.js");

/////////// ROUTES ////////////

// PRODUCTOS
clientRouter.get("/allproducts", handlerGetAllProducts);
clientRouter.get("/product/:id", handlerGetProductById);

// CATEGORIAS
clientRouter.get("/allcategories", handlerGetAllCategories);
clientRouter.get("/category/:id", handlerGetCategoryById);

// MARCAS
clientRouter.get("/allbrands", handlerGetAllBrands);
clientRouter.get("/brand/:id", handlerGetBrandById);

// CARRITO DE COMPRAS
clientRouter.get("/cart/:id", verifyToken, handlerGetCartById);
clientRouter.get("/cartuser", verifyToken, handlerGetUserCarts);
clientRouter.post("/createcart", verifyToken, handlerCreateCart);
clientRouter.post("/addproductcart", verifyToken, handlerAddProductToCart);
clientRouter.put("/updatecart", verifyToken, handlerPutProductQuantityCart);
clientRouter.put(
  "/deleteproductcart",
  verifyToken,
  handlerDeleteProductFromCart
);
clientRouter.put("/deleteall", verifyToken, handlerDeleteAllProductsFromCart);

// ORDEN DE PEDIDO Y MERCADO PAGO
clientRouter.get("/historyorders", verifyToken, handlerGetHistoryOrders);
clientRouter.post("/createorder", verifyToken, handlerCreateOrderMP);
clientRouter.post("/postnotification", verifyToken, postNotificationMP);

// FILTROS
clientRouter.get("/filterCategory/:id", handlerFilterCategory);
clientRouter.get("/filterBrand", handlerFilterBrand);
clientRouter.get("/filterPrice", handlerFilterPrice);
clientRouter.post("/filtersComb", handlerFiltersComb);

//Reviews
clientRouter.post("/review", verifyToken, handlerCreateReview);
clientRouter.get("/reviews", handlerGetReviewId);

// DEPARTAMENTOS Y MUNICIPIOS DE COLOMBIA
clientRouter.get("/alldepartments", verifyToken, handlerGetAllDepartments);
clientRouter.get(
  "/munbydep",
  verifyToken,
  handlerGetMunicipalitiesByDepartment
);

//FAVORITES
clientRouter.get("/myfavourites", verifyToken, handlerMyFavourites);
clientRouter.post("/myfavourites", verifyToken, handlerPostFavorites);
clientRouter.put("/myfavourites", verifyToken, handlerDeleteFavorite);

//// EXPORTACION DE RUTAS ////
module.exports = clientRouter;
