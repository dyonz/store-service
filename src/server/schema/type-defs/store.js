const { gql } = require('apollo-server');

const typeDefs = gql`
  extend type Query {
    stores: [Store!]!
    storeByID(id: ID!): Store
  }

  extend type Mutation {
    createStore(input: CreateStoreInput!): CreateStorePayload!
    deleteStore(input: DeleteStoreInput!): DeleteStorePayload!
  }

  type Store {
    id: ID!
    name: String!
    meta: JSON
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input CreateStoreInput {
    name: String!
    meta: JSON
  }

  type CreateStorePayload {
    success: Boolean!
    store: Store!
  }

  input DeleteStoreInput {
    storeID: ID!
  }

  type DeleteStorePayload {
    success: Boolean!
  }
`;

module.exports = typeDefs;
