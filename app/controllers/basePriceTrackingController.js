const basePriceTrackingModel = require("../models/basePriceTrackingModel");

// const getAll = async (req, res) => {
//    const basePriceTracking = await basePriceTrackingModel.getAll();
//    return res.status(200).json(basePriceTracking);
// };

const getOne = async (req, res) => {
   const category = req.params.categoria;
   const basePriceTracking = await basePriceTrackingModel.getOne(category);
   return res.status(200).json(basePriceTracking);
};

module.exports = { getOne };
