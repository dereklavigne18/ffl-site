import { ApolloServer } from 'apollo-server-express';
import fs from 'fs';

import resolvers from './resolvers';

const typeDefs = fs.readFileSync('schema.graphql');

const graphqlServer = new ApolloServer({ typeDefs, resolvers });

export default graphqlServer;
