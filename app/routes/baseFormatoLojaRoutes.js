const express = require("express");

const baseFormatoLojaRoutes = express.Router();

const baseFormatoLojaController = require("../controllers/baseFormatoLojaController");

baseFormatoLojaRoutes.get("/formatoLoja", baseFormatoLojaController.getAll);

module.exports = baseFormatoLojaRoutes;
