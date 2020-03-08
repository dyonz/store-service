const { gql } = require('apollo-server');

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

const typeDefs = [linkTypeDefs];

module.exports = typeDefs;
