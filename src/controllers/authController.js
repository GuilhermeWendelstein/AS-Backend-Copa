const authService = require('../services/authService');
// Recebe email e senha e retorna o token
async function login(req, res) {
  const { email, senha } = req.body;
// Valida se os campos foram enviados
  if (!email || !senha) {
    return res.status(400).json({
      mensagem: 'Email e senha são obrigatórios.'
    });
  }

  const resultado = await authService.login(email, senha);
 // Bloqueia login inválido
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