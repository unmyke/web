import { NestModule, MiddlewareConsumer, Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MailerModule as NestMailerModule } from '@nest-modules/mailer'
import { UsersModule } from '@backend/users'
import { RolesModule } from '@backend/roles'
import { MailerModule } from '@backend/mailer'
import { APP_GUARD } from '@nestjs/core'
import {
  AccessGuard,
  AuthAccessModule,
  AuthMiddleware,
} from '@backend/auth-access'
import {
  ResourceGuard,
  ResourceAccessModule,
  AccessControlMiddleware,
} from '@backend/resource-access'
import { ScalarResolvers } from '@backend/common'

import { getConfig } from './getConfig'

const {
  graphQL: graphQLConfig,
  typeOrm: typeOrmConfig,
  mailer: mailerConfig,
} = getConfig()

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot(graphQLConfig),
    NestMailerModule.forRoot(mailerConfig),
    AuthAccessModule,
    UsersModule,
    RolesModule,
    ResourceAccessModule,
    MailerModule,
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
    ...ScalarResolvers,
  ],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, AccessControlMiddleware)
      .forRoutes(graphQLConfig.path as string)
  }
}
