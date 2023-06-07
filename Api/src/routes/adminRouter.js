const { Router } = require("express");
// VERIFY TOKEN
const verifyToken = require("../utils/verifyToken.js");

//// ROUTER ADMIN ////
const adminRouter = Router();

/////////// HANDLERS ////////////

// USUARIOS
const handlerGetAllClients = require('../handlers/admin/GET/handlerGetAllClients');
const handlerGetClientById = require('../handlers/admin/GET/handlerGetClientById');
const handlerDeleteUser = require("../handlers/admin/PUT/handlerDeleteUser.js");

/////////// ROUTES ////////////

// USUARIOS
adminRouter.get("/allclients", verifyToken ,handlerGetAllClients);
adminRouter.get("/client/:sub", verifyToken, handlerGetClientById);
adminRouter.put("/client/delete", verifyToken, handlerDeleteUser);

//// EXPORTACION DE RUTAS ////
module.exports = adminRouter;
