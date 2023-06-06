const { Router } = require("express");
const handlerCreateUser = require('../handlers/admin/POST/handlerCreateUser');
// VERIFY TOKEN
const verifyToken = require("../utils/verifyToken.js");

//// ROUTER ADMIN ////
const adminRouter = Router();

/////////// HANDLERS ////////////

/////////// ROUTES ////////////
adminRouter.post('/prueba', handlerCreateUser )
//// EXPORTACION DE RUTAS ////
module.exports = adminRouter;
