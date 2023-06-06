const jwt = require('jsonwebtoken')
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getAllClients = require('../../../controllers/admin/GET/getAllClients');
const getUser = require('../../../controllers/admin/GET/getUser');

const  handlerGetAllClients =async(req, res)=>{
    try {
        //1) Decodificar token con jwt
        const decoToken = await jwt.verify(req.token, KEY_SECRET)
        //2) Traer usuario y verificar si tiene rol Admin
        const user = await getUser(decoToken.sub);

        if(!user){
            res.status(404).json({message: `No existe usuario con email ${email}`})
        }

        if(user.rol === 'client'){ // CAMBIAR A 'admin'

            const allClients = await getAllClients();

            res.status(200).json(allClients)
        }else{
            res.status(404).json({message: 'No tiene los permisos'})
        } 
    
        //3) Traer todos los usuarios con rol Client 

        //res.status(200).json({message: ''})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = handlerGetAllClients;