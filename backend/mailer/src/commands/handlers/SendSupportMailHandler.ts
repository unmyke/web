import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs'
import { SendSupportMailCommand } from '../impl'
import { SupportMailSentEvent } from '../../events'

import { MailService } from '../../MailService'

@CommandHandler(SendSupportMailCommand)
export class SendSupportMailHandler
  implements ICommandHandler<SendSupportMailCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly mailService: MailService,
  ) {}

  execute({ user }: SendSupportMailCommand): Promise<void> {
    return this.mailService
      .sendNewRegistredUserMailToSupportUsers(user)
      .then(() => {
        this.eventBus.publish(new SupportMailSentEvent(user.email))
      })
  }
}
