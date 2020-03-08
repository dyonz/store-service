const { ApolloServer } = require('apollo-server');

const schema = require('./schema');
const db = require('./db');
const { createLoaders } = require('./loaders');

const createServer = () =>
  new ApolloServer({
    schema,
    context: () => ({ db, loaders: createLoaders(db) })
  });

module.exports = { createServer };
