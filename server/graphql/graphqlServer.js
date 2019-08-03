const apolloServer = require('apollo-server-express');
const fs = require('fs');
const path = require('path');

const resolvers = require('./resolvers');

const typeDefs = fs.readFileSync(
  path.resolve(__dirname, 'schema.graphql'),
  'utf-8',
);

const graphqlServer = new apolloServer.ApolloServer({ typeDefs, resolvers });

module.exports = graphqlServer;
