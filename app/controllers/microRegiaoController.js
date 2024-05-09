const microRegiaoModel = require("../../app/models/microRegiaoModel");

const getAll = async (req, res) => {
   const regioes = await microRegiaoModel.getAll();

   const regiao = regioes.map((regiao) => ({
      id: regiao.id,
      cod_micro_regiao: regiao.cod_micro_regiao,
      micro_regiao: regiao.micro_regiao,
   }));

   return res.status(200).json(regiao);
};

const getOne = async (req, res) => {
   const { id } = req.params;

   const regioes = await microRegiaoModel.getOne(id);
   const { cod_micro_regiao, micro_regiao } = regioes;
   const data = { cod_micro_regiao, micro_regiao };
   return res.status(200).json(data);
};

module.exports = { getAll, getOne };
