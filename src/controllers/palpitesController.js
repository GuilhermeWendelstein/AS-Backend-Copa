const palpitesService = require('../services/palpitesService');

async function criar(req, res) {
  try {
    const usuarioId = req.usuario.id;
    const palpite = await palpitesService.criarPalpite(usuarioId, req.body);

    return res.status(201).json(palpite);
  } catch (error) {
    return res.status(error.status || 500).json({
      mensagem: error.message
    });
  }
}

async function listar(req, res) {
  try {
    const usuarioId = req.usuario.id;
    const palpites = await palpitesService.listarPalpites(usuarioId);

    return res.json(palpites);
  } catch (error) {
    return res.status(500).json({
      mensagem: error.message
    });
  }
}

async function atualizar(req, res) {
  try {
    const usuarioId = req.usuario.id;
    const { id } = req.params;

    const palpite = await palpitesService.atualizarPalpite(id, usuarioId, req.body);

    return res.json(palpite);
  } catch (error) {
    return res.status(error.status || 500).json({
      mensagem: error.message
    });
  }
}

async function deletar(req, res) {
  try {
    const usuarioId = req.usuario.id;
    const { id } = req.params;

    const resultado = await palpitesService.deletarPalpite(id, usuarioId);

    return res.json(resultado);
  } catch (error) {
    return res.status(error.status || 500).json({
      mensagem: error.message
    });
  }
}

module.exports = {
  criar,
  listar,
  atualizar,
  deletar
};