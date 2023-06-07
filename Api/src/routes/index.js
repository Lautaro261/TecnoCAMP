const { Router } = require("express");
const login = require("./login");
const signup = require("./signUp");
const userRouter = require("./userRouter");
const adminRouter = require("./adminRouter");
const superAdminRouter = require("./superAdmin");

//// ENRUTADOR PRINCIPAL ////
const routes = Router();

//// RUTAS DEFINIDAS (ENTRYPOINT) ////
routes.use("/signup", signup);
routes.use("/login", login);
routes.use("/user", userRouter);
routes.use("/admin", adminRouter);
routes.use("/superadmin", superAdminRouter);
module.exports = routes;
