const express = require('express');
const palpitesController = require('../controllers/palpitesController');
const auth = require('../middlewares/auth');

const routes = express.Router();

routes.post('/palpites', auth, palpitesController.criar);
routes.get('/palpites', auth, palpitesController.listar);
routes.put('/palpites/:id', auth, palpitesController.atualizar);
routes.delete('/palpites/:id', auth, palpitesController.deletar);

module.exports = routes;