import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs'
import { DeleteProfileCommand } from '../impl'
import { ProfileDeletedEvent, DeleteProfileFailedEvent } from '../../events'

import { UserService } from '../../UserService'

import { UserWithoutProfile } from '../../types'
import { DeleteProfileErrors } from '../../errors'

@CommandHandler(DeleteProfileCommand)
export class DeleteProfileHandler
  implements ICommandHandler<DeleteProfileCommand> {
  constructor(
    private readonly userService: UserService,
    private readonly eventBus: EventBus,
  ) {}

  execute(command: DeleteProfileCommand): Promise<DeleteProfileCommand> {
    const { userId } = command
    return this.userService
      .deleteProfile(userId)
      .then(
        (deletedUser: UserWithoutProfile): void => {
          this.eventBus.publish(new ProfileDeletedEvent(command, deletedUser))
        },
        (error: DeleteProfileErrors): void => {
          this.eventBus.publish(new DeleteProfileFailedEvent(command, error))
        },
      )
      .then((): DeleteProfileCommand => command)
  }
}
