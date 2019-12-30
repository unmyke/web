import { Module } from '@nestjs/common'

import { UsersModule } from '@backend/users'
import { MailService } from './MailService'

import { CqrsModule } from '@nestjs/cqrs'
import { CommandHandlers } from './commands/handlers'
@Module({
  imports: [CqrsModule, UsersModule],
  providers: [MailService, ...CommandHandlers],
  exports: [...CommandHandlers],
})
export class MailerModule {}

export * from './events'
