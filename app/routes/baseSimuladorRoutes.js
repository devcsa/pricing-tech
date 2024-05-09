const express = require("express");

const baseSimuladorRoutes = express.Router();

const baseSimuladorController = require("../controllers/baseSimuladorController");

baseSimuladorRoutes.get("/simulador", baseSimuladorController.getAll);
baseSimuladorRoutes.get("/simulador/:categoria", baseSimuladorController.getOne);

module.exports = baseSimuladorRoutes;
