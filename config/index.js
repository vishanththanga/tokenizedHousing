require('dotenv').config();

module.exports = {
  issuingAccount: {
    secret: process.env.ISSUING_SECRET
  },

  baseAccount: {
    secret: process.env.BASE_SECRET
  },

  knex: {
    client: 'mysql',
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: parseInt(process.env.MYSQL_PORT, 10),
  },
  server_port: parseInt(process.env.SERVER_PORT, 10),
};
