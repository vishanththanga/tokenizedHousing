const config = require('./config');

module.exports = {
  client: config.knex.client,
  connection: {
    user: config.knex.user,
    password: config.knex.password,
    database: config.knex.database,
  },
};
