const { Router } = require("express");
// VERIFY TOKEN
const verifyToken = require("../utils/verifyToken.js");

//// ROUTER ADMIN ////
const clientRouter = Router();

/////////// HANDLERS ////////////

// DEPARTAMENTOS Y MUNICIPIOS DE COLOMBIA
const {
  handlerGetAllDepartments,
  handlerGetMunicipalitiesByDepartment,
} = require("../handlers/client/GET/handlerGetDepMunCo.js");

/////////// ROUTES ////////////

// DEPARTAMENTOS Y MUNICIPIOS DE COLOMBIA
clientRouter.get("/alldepartments", verifyToken, handlerGetAllDepartments);
clientRouter.get(
  "/munbydep",
  verifyToken,
  handlerGetMunicipalitiesByDepartment
);

//// EXPORTACION DE RUTAS ////
module.exports = clientRouter;
