const postgres = require('postgres');

const {
  POSTGRESQL_DATABASE_HOST,
  POSTGRESQL_DATABASE_PORT,
  POSTGRESQL_DATABASE_USER,
  POSTGRESQL_DATABASE_PASSWORD,
  POSTGRESQL_DATABASE_NAME
} = process.env;

const host = POSTGRESQL_DATABASE_HOST;
const port = +POSTGRESQL_DATABASE_PORT;
const user = POSTGRESQL_DATABASE_USER;
const password = POSTGRESQL_DATABASE_PASSWORD;
const database = POSTGRESQL_DATABASE_NAME;

const psql = postgres({
  host,
  port,
  user,
  password,
  database
});

module.exports = { psql };
