const baseProdutosModel = require("../models/baseProdutosModel");

const getAll = async (req, res, next) => {
   try {
      const baseProdutos = await baseProdutosModel.getAll();
      return res.status(200).json(baseProdutos);
   } catch (error) {
      next(error);
   }
};

module.exports = { getAll };
