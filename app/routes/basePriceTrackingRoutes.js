const express = require("express");

const basePriceTrackingRoutes = express.Router();

const basePriceTrackingController = require("../controllers/basePriceTrackingController");

// basePriceTrackingRoutes.get("/priceTracking", basePriceTrackingController.getAll);
basePriceTrackingRoutes.get("/priceTracking/:categoria", basePriceTrackingController.getOne);

module.exports = basePriceTrackingRoutes;
