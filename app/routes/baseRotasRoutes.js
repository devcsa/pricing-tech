const express = require("express");

const baseRotasRoutes = express.Router();

const baseRotasController = require("../controllers/baseRotasController");

// baseRotasRoutes.get("/rotas", baseRotasController.getAll);
baseRotasRoutes.get("/rotas/:categoria", baseRotasController.getOne);

module.exports = baseRotasRoutes;
