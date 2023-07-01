const { Router } = require("express");
// VERIFY TOKEN
const verifyToken = require("../utils/verifyToken.js");

//// ROUTER LOGIN ////
const profile = Router();

/////////// HANDLERS ////////////

const handlerProfileByUser = require("../handlers/client/GET/handlerProfileByUser.js");
const handlerPutUserAndProfile = require("../handlers/client/PUT/handlerPutUserAndProfile");

/////////// ROUTES ////////////

// INGRESAR
profile.get("/", verifyToken, handlerProfileByUser);
profile.put("/edit", verifyToken, handlerPutUserAndProfile);

//// EXPORTACION DE RUTAS ////
module.exports = profile;
