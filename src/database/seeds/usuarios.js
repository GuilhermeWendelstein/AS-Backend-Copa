const bcrypt = require('bcryptjs');

exports.seed = async function (knex) {
  await knex('palpites').del();
  await knex('usuarios').del();
// a senha é criptografada com bcrypt para ficar mais seguro
  const senhaCriptografada = await bcrypt.hash('123456', 10);

  await knex('usuarios').insert([
    {
      nome: 'Usuario Teste',
      email: 'teste@email.com',
      senha: senhaCriptografada
    },
    {
      nome: 'Guilherme',
      email: 'guilherme@email.com',
      senha: senhaCriptografada
    }
  ]);
};