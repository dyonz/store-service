const { GraphQLDateTime } = require('graphql-iso-date');
const { GraphQLJSON } = require('graphql-type-json');

const scalarResolvers = {
  DateTime: GraphQLDateTime,
  JSON: GraphQLJSON
};

const resolvers = [scalarResolvers];

module.exports = resolvers;
