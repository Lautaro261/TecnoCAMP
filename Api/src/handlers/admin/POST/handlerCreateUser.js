const postCreateUser = require('../../../controllers/admin/POST/postCreateUser');
const jwt = require('jsonwebtoken');
const bcrypt =require('bcrypt');

const handlerCreateUser = async(req, res) => {

  try {
    const {
      sub,
      email,
      password
    } = req.body;

    // console.log(name)
    const hashNum= 10

    const hashPassword = await bcrypt.hash(password, hashNum); 
   const newUser =  await postCreateUser(
      sub,
      email,
      hashPassword
    );


    jwt.sign({sub, email}, 'hola', (err, token)=>{

        res.status(200).json({
            toke:token
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
