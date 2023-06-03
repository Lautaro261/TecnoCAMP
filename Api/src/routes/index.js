const { Router } = require("express");
const userRouter = require("./userRouter");
const adminRouter = require("./adminRouter");

//// ENRUTADOR PRINCIPAL ////
const routes = Router();

//// RUTAS DEFINIDAS (ENTRYPOINT) ////
routes.use("/user", userRouter);
routes.use("/admin", adminRouter);

module.exports = routes;
