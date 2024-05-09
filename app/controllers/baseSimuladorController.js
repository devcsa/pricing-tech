const baseSimuladorModel = require("../models/baseSimuladorModel");

const getAll = async (req, res) => {
   const baseSimulador = await baseSimuladorModel.getAll();
   return res.status(200).json(baseSimulador);
};

const getOne = async (req, res) => {
   const nomeCategoria = req.params.categoria;
   const baseSimulador = await baseSimuladorModel.getOne(nomeCategoria);
   return res.status(200).json(baseSimulador);
};

module.exports = { getAll, getOne };
