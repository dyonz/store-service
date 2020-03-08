const { gql } = require('apollo-server');

const storeTypeDefs = require('./store');

const linkTypeDefs = gql`
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

  scalar DateTime
  scalar JSON
`;

const typeDefs = [linkTypeDefs, storeTypeDefs];

module.exports = typeDefs;
