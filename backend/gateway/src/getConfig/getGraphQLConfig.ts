import { GqlModuleOptions } from '@nestjs/graphql'
import { DEVELOPMENT, Env } from './envs'
import { checkEnvVarsExist } from './checkEnvVarsExist'
import { ServerProblemGqlType } from '@backend/common'

export const getGraphQLConfig = (env: Env): GqlModuleOptions => {
  checkEnvVarsExist({
    envVarNames: ['GRAPHQL_URI'],
    scope: 'graphql',
  })

  const isDev = env === DEVELOPMENT

  return {
    path: process.env.GRAPHQL_URI,
    autoSchemaFile: 'schema.gql',
    installSubscriptionHandlers: false,
    context: ({ req }) => {
      const { user = null, accessControl = null } = req
      return { user, accessControl }
    },
    formatError: error => {
      return new ServerProblemGqlType()
    },
    debug: isDev,
    playground: isDev,
  }
}
