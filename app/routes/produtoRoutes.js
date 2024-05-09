const express = require("express");

const produtoRoutes = express.Router();

const authMiddleware = require("../middlewares/auth");

const produtoController = require("../controllers/produtoController.js");

// Todas rotas abaixo desse middleware precisa estar autenticado
produtoRoutes.use(authMiddleware);

produtoRoutes.get("/produto_filter/:produto", produtoController.filterProduto);
produtoRoutes.get("/produto/:id", produtoController.getOne);
produtoRoutes.get("/produto_All", produtoController.getAll);

module.exports = produtoRoutes;
