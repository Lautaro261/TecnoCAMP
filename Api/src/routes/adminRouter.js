const { Router } = require("express");
const handlerCreateUser = require("../handlers/admin/POST/handlerCreateUser");
const handlerLogin = require("../handlers/admin/POST/handlerLogin");
const handlerGetAllClients = require('../handlers/admin/GET/handlerGetAllClients');

// VERIFY TOKEN
const verifyToken = require("../utils/verifyToken.js");

//// ROUTER ADMIN ////
const adminRouter = Router();

/////////// HANDLERS ////////////

/////////// ROUTES ////////////
adminRouter.post("/singup", handlerCreateUser);
adminRouter.post("/login", handlerLogin);
adminRouter.get("/allclients", verifyToken ,handlerGetAllClients);
//// EXPORTACION DE RUTAS ////
module.exports = adminRouter;
