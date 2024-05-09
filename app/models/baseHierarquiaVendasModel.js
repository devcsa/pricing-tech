const fs = require("fs").promises;
const baseHierarquiaVendas_DB = require("../config/db_baseHierarquiaVendas");

const getAll = async () => {
   const baseHierarquiaVendas = await fs.readFile(baseHierarquiaVendas_DB, "utf-8");
   const dadosHierarquiaVendas = JSON.parse(baseHierarquiaVendas);

   return dadosHierarquiaVendas;
};

module.exports = { getAll };
