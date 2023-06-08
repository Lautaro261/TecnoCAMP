const server = require("./src/app");
const { conn } = require("./src/db");
require("dotenv").config();
const { PORT } = process.env || 3001;
// Hora y fecha de Colombia
const moment = require("moment-timezone");

// Configurar la zona horaria de Colombia (Bogotá)
moment.tz.setDefault("America/Bogota");

conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log("%s listening at", PORT);
  });
});

// TRUE para eliminar BD y FALSE para conservar
