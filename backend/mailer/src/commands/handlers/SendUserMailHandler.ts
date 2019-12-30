import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs'
import { SendUserMailCommand } from '../impl'
import { UserMailSentEvent } from '../../events'

import { MailService } from '../../MailService'

@CommandHandler(SendUserMailCommand)
export class SendUserMailHandler
  implements ICommandHandler<SendUserMailCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly mailService: MailService,
  ) {}

  execute({ user }: SendUserMailCommand): Promise<void> {
    return this.mailService.sendNewRegistredUserMailToUser(user).then(() => {
      this.eventBus.publish(new UserMailSentEvent(user.email))
    })
  }
}
