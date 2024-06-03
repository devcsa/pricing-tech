const baseFormatoLojaModel = require("../models/baseFormatoLojaModel");

const getAll = async (req, res, next) => {
   try {
      const baseFormatoLoja = await baseFormatoLojaModel.getAll();
      return res.status(200).json(baseFormatoLoja);
   } catch (error) {
      next(error);
   }
};

module.exports = { getAll };
