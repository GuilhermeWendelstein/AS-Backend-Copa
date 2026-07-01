const knex = require('knex');
const knexfile = require('../../knexfile');

const database = knex(knexfile.development);
// Cria a conexão com o banco SQLite usando o Knex
module.exports = database; 