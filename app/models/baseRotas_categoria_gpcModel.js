const fs = require("fs").promises;
const {
   DB_AG_MASSAS,
   DB_BABY_DOVE,
   DB_BISCOITOS,
   DB_BLEACH,
   DB_CALDOS,
   DB_CLEANERS,
   DB_CONDITIONERS,
   DB_CORN_STARCH,
   DB_DEODORANTS,
   DB_FABRIC_POWDERS,
   DB_FACILITADOR_PASSAR,
   DB_HAIR,
   DB_KETCHUP,
   DB_MACHINE,
   DB_MAIONESES,
   DB_MASSAS,
   DB_MEAL_MAKERS,
   DB_MOSTARDA,
   DB_NATURAIS,
   DB_NEUTRALIZADOR,
   DB_ORAL_CARE,
   DB_OTHERS_FOODS,
   DB_PERSONAL_WASH,
   DB_PETS,
   DB_PROFESSIONALS_HC,
   DB_PROFESSIONALS_PC,
   DB_PSD,
   DB_SKIN_CARE,
   DB_SNACKS,
   DB_SOUPS,
   DB_TEMPEROS,
   DB_TIRA_MANCHAS,
   DB_VEGETAIS,
} = require("../config/db_baseRotas");

// const getAll = async () => {
//    const baseRotas = await fs.readFile(DB_VEGETAIS, "utf-8");
//    const dadosRotas = JSON.parse(baseRotas);

//    return dadosRotas;
// };

const getOne = async (category) => {
   const databaseFiles = {
      "AG MASSAS": DB_AG_MASSAS,
      "BABY DOVE": DB_BABY_DOVE,
      BISCOITOS: DB_BISCOITOS,
      BLEACH: DB_BLEACH,
      CALDOS: DB_CALDOS,
      CLEANERS: DB_CLEANERS,
      CONDITIONERS: DB_CONDITIONERS,
      "CORN STARCH": DB_CORN_STARCH,
      DEODORANTS: DB_DEODORANTS,
      "FABRIC POWDERS": DB_FABRIC_POWDERS,
      "FACILITADOR PASSAR": DB_FACILITADOR_PASSAR,
      HAIR: DB_HAIR,
      KETCHUP: DB_KETCHUP,
      MACHINE: DB_MACHINE,
      MAIONESES: DB_MAIONESES,
      MASSAS: DB_MASSAS,
      "MEAL MAKERS": DB_MEAL_MAKERS,
      MOSTARDA: DB_MOSTARDA,
      NATURAIS: DB_NATURAIS,
      NEUTRALIZADOR: DB_NEUTRALIZADOR,
      "ORAL CARE": DB_ORAL_CARE,
      "OTHERS FOODS": DB_OTHERS_FOODS,
      "PERSONAL WASH": DB_PERSONAL_WASH,
      PETS: DB_PETS,
      "PROFESSIONALS HC": DB_PROFESSIONALS_HC,
      "PROFESSIONALS PC": DB_PROFESSIONALS_PC,
      PSD: DB_PSD,
      "SKIN CARE": DB_SKIN_CARE,
      SNACKS: DB_SNACKS,
      SOUPS: DB_SOUPS,
      TEMPEROS: DB_TEMPEROS,
      "TIRA MANCHAS": DB_TIRA_MANCHAS,
      VEGETAIS: DB_VEGETAIS,
   };

   const baseDB = databaseFiles[category];
   //console.log("Caminho do arquivo base:", baseDB);
   const baseRotas = await fs.readFile(baseDB, "utf-8");
   const dadosRotas = JSON.parse(baseRotas);
   const data = dadosRotas.filter((Rotas) => Rotas.categoria_gpc === category);

   return data;
};

module.exports = { getOne };
