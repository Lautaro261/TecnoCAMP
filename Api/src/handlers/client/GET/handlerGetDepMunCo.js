const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUser = require("../../../controllers/admin/GET/getUser");
const {
  getAllDepartments,
  getMunicipalitiesByDepartment,
} = require("../../../controllers/client/GET/getDepMunCo");

const handlerGetAllDepartments = async (req, res) => {
  //1) Decodificar token con jwt
  const decoToken = await jwt.verify(req.token, KEY_SECRET);

  //2) Traer usuario y verificar si tiene rol Admin
  const user = await getUser(decoToken.sub);

  if (user.rol !== "client") {
    return res
      .status(404)
      .json({ message: "No cuenta con permisos para realizar la peticion" });
  }

  try {
    // Obtener todos los departamentos de la base de datos
    const allDepartments = await getAllDepartments();

    res.status(200).json(allDepartments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handlerGetMunicipalitiesByDepartment = async (req, res) => {
  //1) Decodificar token con jwt
  const decoToken = await jwt.verify(req.token, KEY_SECRET);

  //2) Traer usuario y verificar si tiene rol Admin
  const user = await getUser(decoToken.sub);

  if (user.rol !== "client") {
    return res
      .status(404)
      .json({ message: "No cuenta con permisos para realizar la peticion" });
  }

  // Pedir id del departamento por body
  const { departmentId } = req.query;

  try {
    // Obtener todos los municipios del departamento sleccionado
    const municipalitiesByDepartment = await getMunicipalitiesByDepartment(
      departmentId
    );

    res.status(200).json(municipalitiesByDepartment);

    if (!municipalitiesByDepartment) {
      res
        .status(404)
        .json({ message: "No hay municipios en el departamento seleccionado" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  handlerGetAllDepartments,
  handlerGetMunicipalitiesByDepartment,
};
