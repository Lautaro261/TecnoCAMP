/* const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUser = require("../../../controllers/admin/GET/getUser");
const { options } = require("../../../routes/login");

const handlerLogin = async (req, res) => {
  const { sub, email, password } = req.body;

  try {
    const user = await getUser(sub);

    if (!user) {
      return res
        .status(404)
        .json({ message: `No existe usuario con email ${email}` });
    }

    console.log('SPY PASS',password)
    if(password !== undefined && sub === email){

      const validatePassword = await bcrypt.compare(password, user.password);

      if (sub === user.sub && email === user.email && validatePassword) {
        const rol = user.rol;
        const erased = user.erased;
  
        // Configurar opciones para la firma del token
        const options = {
          expiresIn: "22d", // <<-- Cambiar la duración de expiración aquí (30m-1h-2d)
        };
  
        jwt.sign({ sub, email, rol }, KEY_SECRET, options, (err, token) => {
          res.status(200).json({
            message: "¡Has ingresado correctamente!",
            token,
            rol,
            erased,
          });
        });
      } else {
        res.status(202).json({ message: "¡Credenciales Incorrectas!" });
      }
    }

    if( password=== undefined && sub !=email){
      const {sub, email, rol, erased} = user
      jwt.sign({sub, email, rol}, KEY_SECRET, {expiresIn: "22d"},(err,token)=>{
        res.status(200).json({
          message:"¡Has ingresado correctamente!(Auth)",
          token,
          rol,
          erased
        })
      } )
    } else{
      res.status(202).json({ message: "¡Credenciales Incorrectas!(Auth)" });
    } 
    


  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerLogin; */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUser = require("../../../controllers/admin/GET/getUser");
const { options } = require("../../../routes/login");

const handlerLogin = async (req, res) => {
  const { sub, email, password } = req.body;

  try {
    const user = await getUser(sub);

    if (!user) {
      return res.status(404).json({ message: `No existe usuario con email ${email}` });
    }

    // Caso 1: Credenciales de autenticación con contraseña
    if (password !== undefined && sub === email) {
      const validatePassword = await bcrypt.compare(password, user.password);

      if (validatePassword) {
        const { rol, erased } = user;
        const token = generateToken(sub, email, rol);
  
        return res.status(200).json({
          message: "¡Has ingresado correctamente!",
          token,
          rol,
          erased,
        });
      }
    }

    // Caso 2: Credenciales de autenticación sin contraseña
    if (password === undefined && sub !== email) {
      const { rol, erased } = user;
      const token = generateToken(sub, email, rol);

      return res.status(200).json({
        message: "¡Has ingresado correctamente! (Auth)",
        token,
        rol,
        erased,
      });
    }

    // Credenciales incorrectas en ambos casos
    res.status(202).json({ message: "¡Credenciales Incorrectas!" });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Función para generar el token
const generateToken = (sub, email, rol) => {
  const options = {
    expiresIn: "22d", // Cambiar la duración de expiración aquí (30m-1h-2d)
  };

  return jwt.sign({ sub, email, rol }, KEY_SECRET, options);
};

module.exports = handlerLogin;
