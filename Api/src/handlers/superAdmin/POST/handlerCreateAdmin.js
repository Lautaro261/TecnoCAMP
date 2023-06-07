const postCreateAdmin = require("../../../controllers/superAdmin/POST/postCreateAdmin");
const getUser = require("../../../controllers/admin/GET/getUser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { KEY_SECRET } = process.env;

const handlerCreateAdmin = async (req, res) => {
  try {
    const { sub, email, password } = req.body;
    const hashNum = 10;

    const decoToken = await jwt.verify(req.token, KEY_SECRET);
    const user = await getUser(decoToken.sub);

    if(user.rol !== 'superAdmin'){
      res.status(400).json({message: 'No cuenta con permisos para la peticion'})
    }




    const hashPassword = await bcrypt.hash(password, hashNum);
    const newUser = await postCreateAdmin(sub, email, hashPassword);
    
    jwt.sign({sub, email}, KEY_SECRET , (err, token)=>{

        res.status(200).json({
          message: `Administrador creado correctamente`,
          rol: newUser.dataValues.rol,
          token:token
        })

    })  


} 
  
  
  
  catch (error) {
    res.status(400).json({message: "No se pudo crear usuario",
    error : error.message
});
  }
};

module.exports = handlerCreateAdmin;
