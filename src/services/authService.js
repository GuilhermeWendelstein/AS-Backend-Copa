const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const database = require('../database');
// Faz login do usuário e gera o token
async function login(email, senha) {
  // Busca o usuário pelo email
  const usuario = await database('usuarios').where({ email }).first();

  if (!usuario) {
    return null;
  }
// Compara a senha enviada com a senha criptografada
  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

  if (!senhaCorreta) {
    return null;
  }
// Gera token com os dados do usuário
  const token = jwt.sign(
    {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d'
    }
  );

  return {
    token,
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    }
  };
}

module.exports = {
  login
};