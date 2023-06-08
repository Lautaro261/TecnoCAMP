const { Router } = require("express");
const login = require("./login");
const signup = require("./signUp");
const clientRouter = require("./userRouter");
const adminRouter = require("./adminRouter");
const superAdminRouter = require("./superAdmin");

//// ENRUTADOR PRINCIPAL ////
const routes = Router();

//// RUTAS DEFINIDAS (ENTRYPOINT) ////
routes.use("/signup", signup);
routes.use("/login", login);
routes.use("/client", clientRouter);
routes.use("/admin", adminRouter);
routes.use("/superadmin", superAdminRouter);

// EXPORTAR TODAS LAS RUTAS
module.exports = routes;
