const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

const resolvers = {};

const createServer = () => new ApolloServer({ typeDefs, resolvers });

module.exports = { createServer };
