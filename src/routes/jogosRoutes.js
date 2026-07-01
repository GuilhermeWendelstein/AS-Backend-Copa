const express = require('express');
const jogosController = require('../controllers/jogosController');
// Cria o grupo de rotas de jogos
const routes = express.Router();
// Rota pública para listar jogos
routes.get('/jogos', jogosController.listar);

module.exports = routes;