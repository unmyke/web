import { Module } from '@nestjs/common'

import { UsersModule } from '@backend/users'
import { MailService } from './MailService'

import { CqrsModule } from '@nestjs/cqrs'
import { CommandHandlers } from './commands/handlers'
import { Sagas } from './sagas'

@Module({
  imports: [CqrsModule, UsersModule],
  providers: [MailService, ...CommandHandlers, ...Sagas],
  exports: [...CommandHandlers, ...Sagas],
})
export class MailerModule {}

export * from './events'
