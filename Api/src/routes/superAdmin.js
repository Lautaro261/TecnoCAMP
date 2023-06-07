const { Router } = require("express");
// VERIFY TOKEN
const verifyToken = require("../utils/verifyToken.js");

//// ROUTER SUPERADMIN ////
const superAdminRouter = Router();

/////////// HANDLERS ////////////

// CREAR ADMIN
const handlerCreateAdmin = require("../handlers/superAdmin/POST/handlerCreateAdmin.js");

/////////// ROUTES ////////////

// CREAR ADMIN
superAdminRouter.post("/createadmin", verifyToken, handlerCreateAdmin);

//// EXPORTACION DE RUTAS ////
module.exports = superAdminRouter;
