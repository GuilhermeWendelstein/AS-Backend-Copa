const jwt = require('jsonwebtoken');
// Verifica se o usuário enviou um token válido
function auth(req, res, next) {
  const authorization = req.headers.authorization;
// Bloqueia se não tiver token
  if (!authorization) {
    return res.status(401).json({ mensagem: 'Token não enviado.' });
  }

  const [tipo, token] = authorization.split(' ');
// Confere o formato Bearer Token
  if (tipo !== 'Bearer' || !token) {
    return res.status(401).json({ mensagem: 'Token inválido.' });
  }
  // Verifica se o token é válido
  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = usuario;
    return next();
  } catch (error) {
    //bloqueia se o token for inválido
    return res.status(401).json({ mensagem: 'Token inválido.' });
  }
}

module.exports = auth;