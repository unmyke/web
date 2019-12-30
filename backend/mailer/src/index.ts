import { Module } from '@nestjs/common'

import { UsersModule } from '@backend/users'
import { MailService } from './MailService'

@Module({
  imports: [UsersModule],
  providers: [MailService],
})
export class MailerModule {}
