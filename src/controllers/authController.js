const authService = require('../services/authService');

async function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({
      mensagem: 'Email e senha são obrigatórios.'
    });
  }

  const resultado = await authService.login(email, senha);

  if (!resultado) {
    return res.status(401).json({
      mensagem: 'Email ou senha inválidos.'
    });
  }

  return res.json(resultado);
}

module.exports = {
  login
};