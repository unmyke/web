import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { checkEnvVarsExist } from './checkEnvVarsExist'
import { DEVELOPMENT } from './envs'
export const getTypeOrmConfig = (env: string) => {
  checkEnvVarsExist({
    envVarNames: ['DB_HOST', 'DB_NAME', 'DB_USERNAME', 'DB_PASSWORD'],
    scope: 'database',
  })

  // tslint:disable-next-line: no-object-literal-type-assertion
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: ['../**/src/**/entities/**.ts'],
    migrations: ['../**/migrations/**.ts'],
    migrationsRun: false,
    synchronize: true,
    logging: env === DEVELOPMENT,
  } as TypeOrmModuleOptions
}
