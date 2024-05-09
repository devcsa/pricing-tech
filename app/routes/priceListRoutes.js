const express = require("express");

const priceListRoutes = express.Router();

const authMiddleware = require("../middlewares/auth");

const priceListController = require("../controllers/priceListController.js");

// Todas rotas abaixo desse middleware precisa estar autenticado
priceListRoutes.use(authMiddleware);

// users
priceListRoutes.get("/price_list/:id", priceListController.getOne);
// priceListRoutes.get("/price_list_All", priceListController.getAll);

module.exports = priceListRoutes;
