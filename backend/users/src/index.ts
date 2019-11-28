import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User as UserModel, Profile as ProfileModel } from './entities'
import { CqrsModule } from '@nestjs/cqrs'
import { Resolvers } from './resolvers'
import { CommandHandlers } from './commands/handlers'

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, ProfileModel]), CqrsModule],
  providers: [...Resolvers, ...CommandHandlers],
})
export class UsersModule {}

export { UserModel, ProfileModel }
export { UserMigrations } from './migrations'
export * from './errors'
