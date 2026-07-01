const axios = require('axios');
const database = require('../database');
// Cria um palpite para o usuário logado
async function criarPalpite(usuarioId, dados) {
  const { time_a, time_b, gols_a, gols_b, data_jogo } = dados;

  if (!time_a || !time_b || gols_a === undefined || gols_b === undefined || !data_jogo) {
    const error = new Error('Todos os campos são obrigatórios.');
    error.status = 400;
    throw error;
  }
// Impede placar negativo
  if (gols_a < 0 || gols_b < 0) {
    const error = new Error('Os gols não podem ser negativos.');
    error.status = 400;
    throw error;
  }
// Pega o ano da data do jogo
  const ano = new Date(data_jogo).getFullYear();
// se utiliza o promisse.all para puxar as 2 apis externas ao mesmo tempo, ao inves de usar separada
  const [dolarResponse, feriadosResponse] = await Promise.all([
    axios.get('https://economia.awesomeapi.com.br/json/last/USD-BRL'),
    axios.get(`https://brasilapi.com.br/api/feriados/v1/${ano}`)
  ]);

  const dolar = dolarResponse.data.USDBRL.bid;
  const feriados = feriadosResponse.data;

  const feriado = feriados.find((item) => item.date === data_jogo);

  const novoPalpite = {
    usuario_id: usuarioId,
    jogo: `${time_a} x ${time_b}`,
    gols_a,
    gols_b,
    data_jogo,
    dolar_no_dia: dolar,
    dia_de_feriado: feriado ? `Sim - ${feriado.name}` : 'Não'
  };

  const [id] = await database('palpites').insert(novoPalpite);

  return database('palpites').where({ id }).first();
}

async function listarPalpites(usuarioId) {
  return database('palpites')
    .where({ usuario_id: usuarioId })
    .orderBy('criado_em', 'desc');
}

async function atualizarPalpite(id, usuarioId, dados) {
  const palpite = await database('palpites').where({ id }).first();

  if (!palpite) {
    const error = new Error('Palpite não encontrado.');
    error.status = 404;
    throw error;
  }

  if (palpite.usuario_id !== usuarioId) {
    const error = new Error('Você não pode alterar este palpite.');
    error.status = 403;
    throw error;
  }

  const { gols_a, gols_b } = dados;

  if (gols_a < 0 || gols_b < 0) {
    const error = new Error('Os gols não podem ser negativos.');
    error.status = 400;
    throw error;
  }

  await database('palpites').where({ id }).update({
    gols_a,
    gols_b
  });

  return database('palpites').where({ id }).first();
}

async function deletarPalpite(id, usuarioId) {
  const palpite = await database('palpites').where({ id }).first();

  if (!palpite) {
    const error = new Error('Palpite não encontrado.');
    error.status = 404;
    throw error;
  }

  if (palpite.usuario_id !== usuarioId) {
    const error = new Error('Você não pode deletar este palpite.');
    error.status = 403;
    throw error;
  }

  await database('palpites').where({ id }).del();

  return {
    mensagem: 'Palpite deletado com sucesso.'
  };
}

module.exports = {
  criarPalpite,
  listarPalpites,
  atualizarPalpite,
  deletarPalpite
};