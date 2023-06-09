const { Department, Municipality } = require("../../../db");

const getAllDepartments = async () => {
  // Obtener todos los departamentos de la base de datos
  const allDepartments = await Department.findAll();

  return allDepartments;
};

const getMunicipalitiesByDepartment = async (departmentId) => {
  // Obtener los municipios del departamento seleccionado
  const municipalitiesByDepartment = await Municipality.findAll({
    where: {
      departmentId,
    },
    include: [
      {
        model: Department,
        attributes: ["name"],
      },
    ],
  });

  if (municipalitiesByDepartment.length === 0) {
    return {
      message: "Departamento no encontrado o datos ingresados incorrectos",
    };
  }

  return municipalitiesByDepartment;
};

module.exports = {
  getAllDepartments,
  getMunicipalitiesByDepartment,
};
