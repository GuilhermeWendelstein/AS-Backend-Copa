const express = require('express');
const palpitesController = require('../controllers/palpitesController');
const auth = require('../middlewares/auth');
// Cria o grupo de rotas de palpites
const routes = express.Router();
// Rotas protegidas por JWT
routes.post('/palpites', auth, palpitesController.criar);
routes.get('/palpites', auth, palpitesController.listar);
routes.put('/palpites/:id', auth, palpitesController.atualizar);
routes.delete('/palpites/:id', auth, palpitesController.deletar);

module.exports = routes;