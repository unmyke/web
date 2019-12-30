import { Env } from './envs'
import { getGraphQLConfig } from './getGraphQLConfig'
import { getTypeOrmConfig } from './getTypeOrmConfig'
import { checkEnvVarsExist } from './checkEnvVarsExist'
import { getMailerConfig } from './getMailerConfig'

export const getConfig = () => {
  checkEnvVarsExist({
    envVarNames: ['NODE_ENV', 'HOST'],
    scope: 'application',
  })
  const NODE_ENV: Env = process.env.NODE_ENV as Env

  return {
    graphQL: getGraphQLConfig(NODE_ENV),
    typeOrm: getTypeOrmConfig(NODE_ENV),
    mailer: getMailerConfig(NODE_ENV),
  }
}
