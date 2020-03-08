const { GraphQLDateTime } = require('graphql-iso-date');
const { GraphQLJSON } = require('graphql-type-json');

const storeResolvers = require('./store');

const scalarResolvers = {
  DateTime: GraphQLDateTime,
  JSON: GraphQLJSON
};

const resolvers = [scalarResolvers, storeResolvers];

module.exports = resolvers;
