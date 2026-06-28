const path = require('path');

module.exports = {
  development: {
    client: 'sqlite3',
    // Define o caminho onde o arquivo físico do banco será criado
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
    },
    // Configura o caminho para a criação e execução das Migrations
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    // Configura o caminho para a criação e execução dos Seeders
    seeds: {
      directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    // O SQLite não suporta valores default na inserção por padrão no Knex, isso evita avisos no console
    useNullAsDefault: true 
  }
};