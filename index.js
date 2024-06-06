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

// Middleware para capturar rotas inválidas
app.use((req, res, next) => {
   const error = new Error("Not Found");
   error.status = 404;
   next(error);
});

// Middleware de tratamento de erros
app.use((error, req, res, next) => {
   res.status(error.status || 500);
   res.json({
      error: {
         message: error.message,
      },
   });
});

app.listen(PORT, () => {
   console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
