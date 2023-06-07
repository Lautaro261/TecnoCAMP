const { Router } = require("express");
// VERIFY TOKEN
const verifyToken = require("../utils/verifyToken.js");

//// ROUTER LOGIN ////
const login = Router();

/////////// HANDLERS ////////////

// INGRESAR
const handlerLogin = require("../handlers/admin/POST/handlerLogin.js");

/////////// ROUTES ////////////

// INGRESAR
login.post("/", handlerLogin);

//// EXPORTACION DE RUTAS ////
module.exports = login;
