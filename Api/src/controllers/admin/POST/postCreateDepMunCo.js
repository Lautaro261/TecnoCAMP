const axios = require("axios");
const { Department, Municipality } = require("../../../db");
const { TECNOCAMP2 } = process.env;

const loadDepAndMunFromAPI = async () => {
  const url = "https://www.datos.gov.co/resource/xdk5-pm3f.json";

  const response = await axios.get(url, {
    headers: {
      "X-App-Token": TECNOCAMP2,
    },
  });

  const data = response.data;

  // Crear o actualizar departamentos y municipios en la base de datos
  for (const item of data) {
    const departmentData = {
      id: item.c_digo_dane_del_departamento,
      name: item.departamento,
    };
    const municipalityData = {
      id: item.c_digo_dane_del_municipio,
      name: item.municipio,
      departmentId: item.c_digo_dane_del_departamento, // Agrega el departamentoId en los datos del municipio
    };

    await Department.upsert(departmentData);
    await Municipality.upsert(municipalityData);
  }

  // Actualizar las relaciones entre Departamento y Municipio
  const departments = await Department.findAll();
  for (const department of departments) {
    const municipalities = await Municipality.findAll({
      where: {
        departmentId: department.id,
      },
    });
    await department.setMunicipalities(municipalities);
  }

  return { message: "Datos cargados desde la API externa" };
};

module.exports = loadDepAndMunFromAPI;
