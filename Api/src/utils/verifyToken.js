const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    jwt.verify(bearerToken, KEY_SECRET, (err, decoded) => {
      if (err) {
        res.status(404).json({ error: "Token inválido" });
      } else {
        next();
      }
    });
  } else {
    res.status(400).json({ error: "Token no proporcionado" });
  }
};

module.exports = verifyToken;
