import { PugAdapter } from '@nest-modules/mailer'
import { Env } from '../envs'
import { checkEnvVarsExist } from '../checkEnvVarsExist'

export const getMailerConfig = (env: Env) => {
  checkEnvVarsExist({
    envVarNames: [
      'MAILER_PROTOCOL',
      'MAILER_HOST',
      'MAILER_PORT',
      'MAILER_USERNAME',
      'MAILER_PASSWORD',
      'MAILER_SENDER_EMAIL',
    ],
    scope: 'mail',
  })
  const MAILER_PROTOCOL = process.env.MAILER_PROTOCOL
  const MAILER_HOST = process.env.MAILER_HOST
  const MAILER_PORT = process.env.MAILER_PORT
  const MAILER_USERNAME = process.env.MAILER_USERNAME
  const MAILER_PASSWORD = process.env.MAILER_PASSWORD
  const MAILER_SENDER_EMAIL = process.env.MAILER_SENDER_EMAIL
  const transport = `${MAILER_PROTOCOL}://${MAILER_USERNAME}:${MAILER_PASSWORD}@${MAILER_HOST}${
    MAILER_PORT ? `:${MAILER_PORT}` : ''
  }`

  return {
    transport,
    defaults: {
      from: MAILER_SENDER_EMAIL,
    },
    template: {
      dir: __dirname.replace(/^(.*)\/dist\/(.*)$/, '$1/src/$2/templates'),
      adapter: new PugAdapter(),
      options: {
        strict: true,
      },
    },
  }
}
