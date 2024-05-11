const express = require("express");
const dotenv = require("dotenv");
const { connectToDatabase } = require("./app/config/connection");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectToDatabase();

app.use(express.json());
app.use(express.static("app/views"));
app.use(express.static("app/public"));
app.use(express.static("app/data"));

app.use("/uploads/users", express.static("app/uploads/users"));

// Array contendo as rotas a serem carregadas
const routes = [
   require("./app/routes/baseSimuladorRoutes"),
   require("./app/routes/baseFormatoLojaRoutes"),
   require("./app/routes/baseHierarquiaVendasRoutes"),
   require("./app/routes/basePriceTrackingRoutes"),
   require("./app/routes/lmcRoutes"),
   require("./app/routes/baseRotasRoutes"),
   require("./app/routes/baseProdutosRoutes"),
   require("./app/routes/userRoutes"),
   require("./app/routes/margem_markupRoutes"),
   require("./app/routes/produtoRoutes"),
   require("./app/routes/segmentoRoutes"),
   require("./app/routes/microRegiaoRoutes"),
   require("./app/routes/priceListRoutes"),
   require("./app/routes/encargoFinanceiroRoutes"),
   require("./app/routes/statusUserRoutes"),
   require("./app/routes/typeUserRoutes"),
   require("./app/routes/rotasRoutes"),
   require("./app/routes/origem_destinoRoutes"),
   require("./app/routes/impostosRoutes"),
   require("./app/routes/uploadUserPhotoRoutes"),
   require("./app/routes/settingPriceRoutes"),
   require("./app/routes/regimesRoutes"),
];

// Loop para registrar as rotas
routes.forEach((route) => {
   app.use(route);
});

app.listen(PORT, () => {
   console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
