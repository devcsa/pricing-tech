const fs = require("fs").promises;
const {
   DB_HAIR,
   DB_PROFESSIONALS_PC,
   DB_SKIN_CARE,
   DB_DRESSINGS,
   DB_MAE_TERRA,
   DB_SAVOURY,
   DB_OTHERS_HC,
   DB_CLEANERS,
   DB_FABRIC_POWDERS,
   DB_PETS,
   DB_PROFESSIONALS_HC,
   DB_DEODORANTS,
   DB_ORAL_CARE,
   DB_PERSONAL_WASH,
   DB_BABY,
   DB_AMACIANTES,
} = require("../config/db_baseRotas");

// const getAll = async () => {
//    const baseRotas = await fs.readFile(DB_VEGETAIS, "utf-8");
//    const dadosRotas = JSON.parse(baseRotas);

//    return dadosRotas;
// };

const getOne = async (category) => {
   const databaseFiles = {
      HAIR: DB_HAIR,
      "PROFESSIONALS PC": DB_PROFESSIONALS_PC,
      "SKIN CARE": DB_SKIN_CARE,
      DRESSINGS: DB_DRESSINGS,
      "MAE TERRA": DB_MAE_TERRA,
      SAVOURY: DB_SAVOURY,
      "OTHERS HC": DB_OTHERS_HC,
      CLEANERS: DB_CLEANERS,
      "FABRIC POWDERS": DB_FABRIC_POWDERS,
      PETS: DB_PETS,
      "PROFESSIONALS HC": DB_PROFESSIONALS_HC,
      DEODORANTS: DB_DEODORANTS,
      "ORAL CARE": DB_ORAL_CARE,
      "PERSONAL WASH": DB_PERSONAL_WASH,
      BABY: DB_BABY,
      AMACIANTES: DB_AMACIANTES,
   };

   const baseDB = databaseFiles[category];
   //console.log("Caminho do arquivo base:", baseDB);
   const baseRotas = await fs.readFile(baseDB, "utf-8");
   const dadosRotas = JSON.parse(baseRotas);
   //const data = dadosRotas.filter((Rotas) => Rotas.categoria_planning === category);

   return dadosRotas;
};

module.exports = { getOne };
