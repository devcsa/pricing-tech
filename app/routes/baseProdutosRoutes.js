const express = require("express");

const baseProdutosRoutes = express.Router();

const baseProdutosController = require("../controllers/baseProdutosController");

baseProdutosRoutes.get("/produtos", baseProdutosController.getAll);

module.exports = baseProdutosRoutes;
