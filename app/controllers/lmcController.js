const lmcModel = require("../models/lmcModel");

const getAll = async (req, res, next) => {
   try {
      const lmc = await lmcModel.getAll();
      return res.status(200).json(lmc);
   } catch (error) {
      next(error); // Passa o erro para o middleware de tratamento de erros
   }
};

module.exports = { getAll };
