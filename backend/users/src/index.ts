import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'
import { RolesModule } from '@backend/roles'
import { User as UserModel, Profile as ProfileModel } from './entities'

import { CqrsModule } from '@nestjs/cqrs'
import { CommandHandlers } from './commands/handlers'
import { QueryHandlers } from './queries/handlers'

import { Resolvers } from './resolvers'

import { UserService } from './UserService'
import { UserSerializer, ProfileSerializer } from './serializers'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel, ProfileModel]),
    CqrsModule,
    RolesModule,
  ],
  providers: [
    ...Resolvers,
    ...QueryHandlers,
    ...CommandHandlers,
    UserService,
    UserSerializer,
    ProfileSerializer,
  ],
  exports: [...Resolvers, ...QueryHandlers, ...CommandHandlers, UserService],
})
export class UsersModule {}

export { UserModel, ProfileModel }
export { UserService }
export { UserMigrations } from './migrations'
export * from './errors'
export * from './events'
export * from './commands/impl'
export * from './queries/impl'
