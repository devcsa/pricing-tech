const encargoFinanceiroModel = require("../../app/models/encargoFinanceiroModel");

const getAll = async (req, res) => {
   const encargoFinanceiro = await encargoFinanceiroModel.getAll();

   const data = encargoFinanceiro.map((encargoFinanceiro) => ({
      type: encargoFinanceiro.type,
      commodity: encargoFinanceiro.commodity,
      product_group: encargoFinanceiro.product_group,
      segmento: encargoFinanceiro.segmento,
      pct_encargo: encargoFinanceiro.pct_encargo,
      days: encargoFinanceiro.days,
      status: encargoFinanceiro.status,
   }));

   return res.status(200).json(data);
};

const getOne = async (req, res) => {
   const filter = req.query;
   const encargoFinanceiro = await encargoFinanceiroModel.getOne(filter);

   if (encargoFinanceiro == undefined) {
      return res.status(404).json({ error: "Encargo financeiro não encontrado!" });
   } else {
      return res.status(200).json(encargoFinanceiro);
   }
};

module.exports = { getAll, getOne };
