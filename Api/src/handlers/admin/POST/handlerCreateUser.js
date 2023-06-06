const postCreateUser = require('../../../controllers/admin/POST/postCreateUser');
const jwt = require('jsonwebtoken');
const bcrypt =require('bcrypt');
require("dotenv").config();
const { KEY_SECRET } = process.env;

const handlerCreateUser = async(req, res) => {

  try {
    const {
      sub,
      email,
      password
    } = req.body;

    // CONSTANTE NUMERO CODIFICAR PASSWORD
    const hashNum= 10

    // IMPLEMENTAMOS BCRYPT
    const hashPassword = await bcrypt.hash(password, hashNum); 
    const newUser =  await postCreateUser(
      sub,
      email,
      hashPassword
    );

    jwt.sign({sub, email}, KEY_SECRET , (err, token)=>{

        res.status(200).json({
            token:token
        })

    })

    //console.log(user)
  /*   res.status(200).json({ message: "Se creo correctamente",
    user :  newUser,
}); */

  } catch (error) {
    res.status(400).json({message: "No se pudo crear usuario",
    error : error.message
});
  }
};

module.exports = handlerCreateUser;
