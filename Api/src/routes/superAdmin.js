const { Router } = require("express");
// VERIFY TOKEN
const verifyToken = require("../utils/verifyToken.js");

//// ROUTER SUPERADMIN ////
const superAdminRouter = Router();

/////////// HANDLERS ////////////

// CREAR ADMIN
const handlerCreateAdmin = require("../handlers/superAdmin/POST/handlerCreateAdmin.js");

// MOSTRAR ADMINS
const handlerGetAllAdmmins = require("../handlers/superAdmin/GET/handlerGetAllAdmins.js");
const handlerGetAdminById = require("../handlers/superAdmin/GET/handlerGetAdminById.js");

// ELIMINAR ADMINS
const handlerDeleteAdmin = require("../handlers/superAdmin/PUT/handlerDeleteAdmin.js");

/////////// ROUTES ////////////

// CREAR ADMIN
superAdminRouter.post("/createadmin", verifyToken, handlerCreateAdmin);

// MOSTRAR ADMINS
superAdminRouter.get("/allAdmins", verifyToken, handlerGetAllAdmmins);
superAdminRouter.get("/idAdmin/:sub", verifyToken, handlerGetAdminById);

// ELIMINAR ADMINS
superAdminRouter.put("/admin/delete", verifyToken, handlerDeleteAdmin);

//// EXPORTACION DE RUTAS ////
module.exports = superAdminRouter;
