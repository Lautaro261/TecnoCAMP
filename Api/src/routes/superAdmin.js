const { Router } = require("express");
// VERIFY TOKEN
const verifyToken = require("../utils/verifyToken.js");

//// ROUTER SUPERADMIN ////
const superAdminRouter = Router();

/////////// HANDLERS ////////////

// CREAR ADMIN
const handlerCreateAdmin = require("../handlers/superAdmin/POST/handlerCreateAdmin.js");

//MOSTRAR ADMINS
const handlerGetAllAdmmins = require("../handlers/superAdmin/GET/handlerGetAllAdmins.js");
const handlerGetAdminById = require("../handlers/superAdmin/GET/handlerGetAdminById.js");

/////////// ROUTES ////////////

// CREAR ADMIN
superAdminRouter.post("/createadmin", verifyToken, handlerCreateAdmin);

//MOSTRAR ADMINS
superAdminRouter.get("/allAdmins", verifyToken, handlerGetAllAdmmins);
superAdminRouter.get("/idAdmin/:sub", verifyToken, handlerGetAdminById);

//// EXPORTACION DE RUTAS ////
module.exports = superAdminRouter;
