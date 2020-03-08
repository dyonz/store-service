const { makeExecutableSchema } = require('apollo-server');

const typeDefs = require('./type-defs');
const resolvers = require('./resolvers');

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
