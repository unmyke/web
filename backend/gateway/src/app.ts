import { NestModule, MiddlewareConsumer, Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from '@backend/users'
import { RolesModule } from '@backend/roles'
import { APP_GUARD } from '@nestjs/core'
import { AccessGuard } from '@backend/auth-access'

import { getConfig } from './getConfig'

const { graphQL: graphQLConfig, typeOrm: typeOrmConfig } = getConfig()

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot(graphQLConfig),
    UsersModule,
    RolesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
  ],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // TODO: connect middleware here
  }
}
