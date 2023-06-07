const { Router } = require("express");
// VERIFY TOKEN
const verifyToken = require("../utils/verifyToken.js");
//// ROUTER ADMIN ////
const handlerCreateUser = require("../handlers/admin/POST/handlerCreateUser.js");

const signup = Router();

/////////// HANDLERS ////////////
signup.post("/", handlerCreateUser);

/////////// ROUTES ////////////

//// EXPORTACION DE RUTAS ////
module.exports = signup;