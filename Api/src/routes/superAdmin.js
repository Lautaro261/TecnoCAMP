const { Router } = require("express");
// VERIFY TOKEN
const verifyToken = require("../utils/verifyToken.js");
const handlerCreateAdmin = require("../handlers/superAdmin/POST/handlerCreateAdmin.js")
//// ROUTER ADMIN ////
const superAdminRouter = Router();

/////////// HANDLERS ////////////
superAdminRouter.post("/createadmin", verifyToken , handlerCreateAdmin)

/////////// ROUTES ////////////

//// EXPORTACION DE RUTAS ////
module.exports = superAdminRouter;