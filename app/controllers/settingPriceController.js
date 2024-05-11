const settingPriceModel = require("../../app/models/settingPriceModel");

const getAll = async (req, res) => {
   const settingPrice = await settingPriceModel.getAll();

   const data = settingPrice.map((settingPrice) => ({
      id: settingPrice.id,
      discount_name: settingPrice.discount_name,
      price_name: settingPrice.price_name,
      status: settingPrice.status,
      expiration_date: settingPrice.expiration_date,
   }));

   return res.status(200).json(data);
};

const getOne = async (req, res) => {
   const filter = req.query;
   const settingPrice = await settingPriceModel.getOne(filter);

   if (settingPrice == undefined) {
      return res.status(404).json({ error: "Parametrização de preço não encontrada!" });
   } else {
      return res.status(200).json(settingPrice);
   }
};

module.exports = { getAll, getOne };
