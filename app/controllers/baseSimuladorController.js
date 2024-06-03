const baseSimuladorModel = require("../models/baseSimuladorModel");

const getAll = async (req, res, next) => {
   try {
      const baseSimulador = await baseSimuladorModel.getAll();
      return res.status(200).json(baseSimulador);
   } catch (error) {
      next(error);
   }
};

const getOne = async (req, res, next) => {
   try {
      const nomeCategoria = req.params.categoria;
      const baseSimulador = await baseSimuladorModel.getOne(nomeCategoria);
      return res.status(200).json(baseSimulador);
   } catch (error) {
      next(error);
   }
};

module.exports = { getAll, getOne };
