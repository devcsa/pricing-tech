const baseProdutosModel = require("../models/baseProdutosModel");

const getAll = async (req, res) => {
   const baseProdutos = await baseProdutosModel.getAll();
   return res.status(200).json(baseProdutos);
};

module.exports = { getAll };
