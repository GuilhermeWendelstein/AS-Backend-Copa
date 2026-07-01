const express = require('express');
const authController = require('../controllers/authController');
// Cria o grupo de rotas de autenticação
const routes = express.Router();
// Rota pública para fazer login
routes.post('/login', authController.login);

module.exports = routes;