const margem_markupModel = require("../../app/models/margem_markupModel");

const getAll = async (req, res) => {
   const margem_markup = await margem_markupModel.getAll();

   const data = margem_markup.map((margem_markup) => ({
      cod_micro_regiao: margem_markup.cod_micro_regiao,
      micro_regiao: margem_markup.micro_regiao,
      cod_segmento: margem_markup.cod_segmento,
      segmento_id: margem_markup.segmento_id,
      segmento: margem_markup.segmento,
      cod_produto: margem_markup.cod_produto,
      produto: margem_markup.produto,
      pct_margem: margem_markup.pct_margem,
      pct_markup: margem_markup.pct_markup,
   }));

   return res.status(200).json(data);
};

const getOne = async (req, res) => {
   const filter = req.query;
   const margem_markup = await margem_markupModel.getOne(filter);

   if (margem_markup == undefined) {
      return res.status(404).json({ error: "Rota não encontrada!" });
   } else {
      return res.status(200).json(margem_markup);
   }
};

module.exports = { getAll, getOne };
