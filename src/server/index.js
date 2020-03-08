const { ApolloServer } = require('apollo-server');

const schema = require('./schema');
const db = require('./db');

const createServer = () =>
  new ApolloServer({ schema, context: () => ({ db }) });

module.exports = { createServer };
