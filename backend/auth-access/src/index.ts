import { Module } from '@nestjs/common'

import { Resolvers } from './resolvers'

import { CqrsModule } from '@nestjs/cqrs'
import { CommandHandlers } from './commands/handlers'

import { UsersModule } from '@backend/users'

import { JwtService } from './JwtService'

@Module({
  imports: [UsersModule, CqrsModule],
  providers: [JwtService, ...CommandHandlers, ...Resolvers],
  exports: [JwtService, ...CommandHandlers, ...Resolvers],
})
export class AuthAccessModule {}

export * from './AccessGuard'
export * from './errors'
export * from './AuthMiddleware'
export * from './events'
