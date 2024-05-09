const fs = require("fs").promises;

const {
   PT_HAIR,
   PT_PROFESSIONALS_PC,
   PT_SKIN_CARE,
   PT_DRESSINGS,
   PT_MAE_TERRA,
   PT_SAVOURY,
   PT_OTHERS_HC,
   PT_CLEANERS,
   PT_FABRIC_POWDERS,
   PT_PETS,
   PT_PROFESSIONALS_HC,
   PT_DEODORANTS,
   PT_ORAL_CARE,
   PT_PERSONAL_WASH,
   PT_BABY,
   PT_AMACIANTES,
} = require("../config/db_basePriceTracking");

const getOne = async (category) => {
   const databaseFiles = {
      HAIR: PT_HAIR,
      "PROFESSIONALS PC": PT_PROFESSIONALS_PC,
      "SKIN CARE": PT_SKIN_CARE,
      DRESSINGS: PT_DRESSINGS,
      "MAE TERRA": PT_MAE_TERRA,
      SAVOURY: PT_SAVOURY,
      "OTHERS HC": PT_OTHERS_HC,
      CLEANERS: PT_CLEANERS,
      "FABRIC POWDERS": PT_FABRIC_POWDERS,
      PETS: PT_PETS,
      "PROFESSIONALS HC": PT_PROFESSIONALS_HC,
      DEODORANTS: PT_DEODORANTS,
      "ORAL CARE": PT_ORAL_CARE,
      "PERSONAL WASH": PT_PERSONAL_WASH,
      BABY: PT_BABY,
      AMACIANTES: PT_AMACIANTES,
   };

   const baseDB = databaseFiles[category];
   const basePriceTracking = await fs.readFile(baseDB, "utf-8");
   const dadosPriceTracking = JSON.parse(basePriceTracking);
   // const data = dadosPriceTracking.filter((priceTracking) => priceTracking.categoria === category);
   return dadosPriceTracking;
};

module.exports = { getOne };
