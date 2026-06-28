const jogosService = require('../services/jogosService');

async function listar(req, res) {
  try {
    const jogos = await jogosService.listarJogos();

    return res.json(jogos);
  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro ao buscar jogos na API externa.',
      detalhe: error.message
    });
  }
}

module.exports = {
  listar
};