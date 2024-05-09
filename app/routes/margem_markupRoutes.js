const express = require("express");

const margem_markupRoutes = express.Router();

const authMiddleware = require("../middlewares/auth");

const margem_markupController = require("../controllers/margem_markupController.js");

// Todas rotas abaixo desse middleware precisa estar autenticado
margem_markupRoutes.use(authMiddleware);

// users
margem_markupRoutes.get("/margem_markup", margem_markupController.getOne);
margem_markupRoutes.get("/margem_markup_All", margem_markupController.getAll);

module.exports = margem_markupRoutes;
