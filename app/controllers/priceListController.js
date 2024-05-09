const priceListModel = require("../../app/models/priceListModel");

// const getAll = async (req, res) => {
//    const price_list = await priceListModel.getAll();

//    const data = price_list.map((price_list) => ({
//       cod_micro_regiao: price_list.cod_micro_regiao,
//       micro_regiao: price_list.micro_regiao,
//       cod_segmento: price_list.cod_segmento,
//       segmento: price_list.segmento,
//       cod_produto: price_list.cod_produto,
//       produto: price_list.produto,
//       pct_margem: price_list.pct_margem,
//       pct_markup: price_list.pct_markup,
//    }));

//    return res.status(200).json(data);
// };

const getOne = async (req, res) => {
   const { id } = req.params;
   const price_list = await priceListModel.getOne(id);

   if (price_list == undefined) return res.status(404).json({ error: "Preço de lista não encontrado!" });

   const { preco_caixa, dun_14, ean_13, ncm, origem_produto, tipo_produto, unidades_caixa } = price_list;

   const options = { minimumFractionDigits: 3, maximumFractionDigits: 3 };
   const format = new Intl.NumberFormat("pt-BR", options);

   const preco_unitario = format.format(preco_caixa / unidades_caixa);
   const priceData = { preco_caixa, dun_14, ean_13, ncm, origem_produto, tipo_produto, unidades_caixa, preco_unitario };

   return res.status(200).json(priceData);
};

module.exports = { getOne };
