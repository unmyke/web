import { TypeOrmModuleOptions } from '@nestjs/typeorm'

import { checkEnvVarsExist } from './checkEnvVarsExist'
import { DEVELOPMENT } from './envs'

import { RoleModel } from '@backend/roles'
import { UserModel, ProfileModel } from '@backend/users'

const Entities = [RoleModel, ProfileModel, UserModel]

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
    entities: Entities,
    migrations: ['../**/migrations/**.ts'],
    migrationsRun: false,
    synchronize: true,
    logging: env === DEVELOPMENT,
  } as TypeOrmModuleOptions
}
