import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'
import { RolesModule } from '@backend/roles'
import { User as UserModel, Profile as ProfileModel } from './entities'

import { CqrsModule } from '@nestjs/cqrs'
import { CommandHandlers } from './commands/handlers'

import { Resolvers } from './resolvers'

import { UserSerializer, ProfileSerializer } from './serializers'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel, ProfileModel]),
    CqrsModule,
    RolesModule,
  ],
  providers: [
    ...Resolvers,
    ...CommandHandlers,
    UserSerializer,
    ProfileSerializer,
  ],
  exports: [...Resolvers, ...CommandHandlers],
})
export class UsersModule {}

export { UserModel, ProfileModel }
export { UserMigrations } from './migrations'
export * from './errors'
