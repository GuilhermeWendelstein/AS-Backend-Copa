const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ mensagem: 'Token não enviado.' });
  }

  const [tipo, token] = authorization.split(' ');

  if (tipo !== 'Bearer' || !token) {
    return res.status(401).json({ mensagem: 'Token inválido.' });
  }

  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = usuario;
    return next();
  } catch (error) {
    return res.status(401).json({ mensagem: 'Token inválido.' });
  }
}

module.exports = auth;