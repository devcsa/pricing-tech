const express = require("express");

const baseHierarquiaVendasRoutes = express.Router();

const baseHierarquiaVendasController = require("../controllers/baseHierarquiaVendasController");

baseHierarquiaVendasRoutes.get("/hierarquiaVendas", baseHierarquiaVendasController.getAll);

module.exports = baseHierarquiaVendasRoutes;
