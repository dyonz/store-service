const { ApolloServer } = require('apollo-server');

const schema = require('./schema');

const createServer = () => new ApolloServer({ schema });

module.exports = { createServer };
