import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date'

import { DEVELOPMENT, Env } from './envs'

export const getGraphQLConfig = (env: Env) => ({
  path: process.env.GRAPHQL_URI,
  typePaths: ['../**/*.graphql'],
  installSubscriptionHandlers: false,
  resolvers: {
    Date: GraphQLDate,
    Time: GraphQLTime,
    DateTime: GraphQLDateTime,
  },
  rootValue: ({ req }) => req,
  formatError: error => {
    return error
  },
  playground: env === DEVELOPMENT,
})
