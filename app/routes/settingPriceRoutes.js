const express = require("express");

const settingPriceRoutes = express.Router();

const authMiddleware = require("../middlewares/auth");

const settingPriceController = require("../controllers/settingPriceController.js");

settingPriceRoutes.use(authMiddleware);

settingPriceRoutes.get("/settingPrice", settingPriceController.getOne);
settingPriceRoutes.get("/settingPrice_All", settingPriceController.getAll);

module.exports = settingPriceRoutes;
