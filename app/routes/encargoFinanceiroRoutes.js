const express = require("express");

const encargoFinanceiroRoutes = express.Router();

const authMiddleware = require("../middlewares/auth");

const encargoFinanceiroController = require("../controllers/encargoFinanceiroController.js");

// Todas rotas abaixo desse middleware precisa estar autenticado
encargoFinanceiroRoutes.use(authMiddleware);

encargoFinanceiroRoutes.get("/encargoFinanceiro", encargoFinanceiroController.getOne);
encargoFinanceiroRoutes.get("/encargoFinanceiro_All", encargoFinanceiroController.getAll);

module.exports = encargoFinanceiroRoutes;
