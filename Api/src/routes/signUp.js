const { Router } = require("express");
// VERIFY TOKEN
const verifyToken = require("../utils/verifyToken.js");

//// ROUTER SIGNUP ////
const signup = Router();

/////////// HANDLERS ////////////

// CREAR USUARIO
const handlerCreateUser = require("../handlers/admin/POST/handlerCreateUser.js");

/////////// ROUTES ////////////

// CREAR USUARIO
signup.post("/", handlerCreateUser);

//// EXPORTACION DE RUTAS ////
module.exports = signup;
