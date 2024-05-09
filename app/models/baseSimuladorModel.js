const fs = require("fs").promises;
const baseSimulador_DB = require("../config/db_baseSimulador");
const baseSimuladorMiddleware = require("../middlewares/baseSimuladorMiddleware");

const getAll = async () => {
   const baseSimulador = await fs.readFile(baseSimulador_DB, "utf-8");
   const dadosSimulador = JSON.parse(baseSimulador);

   // Formatar valores numéricos usando o middleware
   dadosSimulador.forEach((simulador) => {
      baseSimuladorMiddleware.formatarValores(simulador);
   });

   return dadosSimulador;
};

const getOne = async (nomeCategoria) => {
   // Validar categoria usando o middleware
   baseSimuladorMiddleware.validarCategoria(nomeCategoria);

   const baseSimulador = await fs.readFile(baseSimulador_DB, "utf-8");
   const dadosSimulador = JSON.parse(baseSimulador);
   const data = dadosSimulador.filter((simulador) => simulador.categoria_planning === nomeCategoria);

   // Formatar valores numéricos usando o middleware
   data.forEach((simulador) => {
      baseSimuladorMiddleware.formatarValores(simulador);
   });

   return data;
};

module.exports = { getAll, getOne };
