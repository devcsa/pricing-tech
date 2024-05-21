const priceListModel = require("../../app/models/priceListModel");

const getAll = async (req, res) => {
   const price_list = await priceListModel.getAll();

   return res.status(200).json(price_list);
};

const getOne = async (req, res) => {
   const { id } = req.params;
   const price_list = await priceListModel.getOne(id);

   if (price_list == undefined) return res.status(404).json({ error: "Preço de lista não encontrado!" });

   const { preco_caixa, dun_14, ean_13, ncm, origem_produto, tipo_produto, unidades_caixa, produto } = price_list;

   const options = { minimumFractionDigits: 3, maximumFractionDigits: 3 };
   const format = new Intl.NumberFormat("pt-BR", options);

   const preco_unitario = format.format(preco_caixa / unidades_caixa);
   const priceData = { preco_caixa, dun_14, ean_13, ncm, origem_produto, tipo_produto, unidades_caixa, preco_unitario, produto };

   return res.status(200).json(priceData);
};

module.exports = { getAll, getOne };
