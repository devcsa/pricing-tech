const express = require("express");

const lmcRoutes = express.Router();

const lmcController = require("../controllers/lmcController");

lmcRoutes.get("/lmc", lmcController.getAll);

module.exports = lmcRoutes;
