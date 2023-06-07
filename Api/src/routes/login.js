const { Router } = require("express");
// VERIFY TOKEN
const verifyToken = require("../utils/verifyToken.js");
//// ROUTER ADMIN ////
const handlerLogin = require("../handlers/admin/POST/handlerLogin.js");
const login = Router();

/////////// HANDLERS ////////////
login.post("/", handlerLogin)

/////////// ROUTES ////////////

//// EXPORTACION DE RUTAS ////
module.exports = login;